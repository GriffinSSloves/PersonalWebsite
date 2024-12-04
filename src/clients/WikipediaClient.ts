import sanitizeHtml from 'sanitize-html'

export interface WikiContent {
    title: string
    extract: string
    url: string
    imageUrl?: string
}

export interface IWikipediaClient {
    fetchWikipediaContent(params: FetchWikipediaContentParams): Promise<WikiContent>
}

type FetchWikipediaContentParams = {
    url: string
    title: string
    sanitize: boolean
    includeImage?: boolean
}

export class WikipediaClient {
    fetchWikipediaContent = async ({ url, title, sanitize, includeImage = true }: FetchWikipediaContentParams): Promise<WikiContent> => {
        const pageTitle = WikipediaClient.#extractTitleFromUrl(url)

        const contentUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(pageTitle)}&prop=extracts|pageimages|images|info&exintro=1&format=json&origin=*&piprop=original|name|thumbnail&pithumbsize=300&inprop=url`

        const contentResponse = await fetch(contentUrl)
        const contentData = await contentResponse.json()

        const pages = contentData.query.pages
        const pageId = Object.keys(pages)[0]

        if (pageId === '-1') {
            throw new Error(`No Wikipedia page found for URL: ${url}`)
        }

        const page = pages[pageId]

        const rawExtract = page.extract
        let finalExtract = rawExtract
        if (sanitize) {
            finalExtract = this.cleanWikipediaContent(rawExtract)
        }

        const result: WikiContent = {
            title: page.title,
            extract: finalExtract,
            url
        }

        // Try to get image - first check pageimages (primary image)
        if (page.original) {
            result.imageUrl = page.original.source
        }
        // If no primary image, look through other images
        else if (page.images) {
            // Look for images that might be cover images
            const potentialImages = page.images
                .filter((img: { title: string }) => {
                    const title = img.title.toLowerCase()
                    return title.includes('cover') || title.includes('front') || title.includes('.jpg') || title.includes('.jpeg') || title.includes('.png')
                })
                .filter((img: { title: string }) => !img.title.toLowerCase().includes('icon'))

            if (potentialImages.length > 0) {
                // Get details for the first potential image
                const imageDetails = await this.#fetchImageDetails(potentialImages[0].title.replace('File:', ''))

                if (imageDetails.url) {
                    result.imageUrl = imageDetails.url
                }
            }
        }

        return result
    }

    static #extractTitleFromUrl(url: string): string {
        try {
            const urlObj = new URL(url)
            const path = urlObj.pathname

            // Extract the title from paths like /wiki/Title_Name
            if (path.startsWith('/wiki/')) {
                const title = path.slice(6) // Remove '/wiki/'
                return decodeURIComponent(title)
            }

            throw new Error('Invalid Wikipedia URL format')
        } catch (error) {
            throw new Error(`Invalid Wikipedia URL: ${url}`)
        }
    }

    async #fetchImageDetails(imageName: string): Promise<{ url?: string; caption?: string }> {
        try {
            const imageUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(imageName)}&prop=imageinfo&iiprop=url|extmetadata&format=json&origin=*`
            const response = await fetch(imageUrl)
            const data = await response.json()

            const pages = data.query.pages
            const imageInfo = pages[Object.keys(pages)[0]]

            if (imageInfo?.imageinfo?.[0]) {
                return {
                    url: imageInfo.imageinfo[0].url,
                    caption: imageInfo.imageinfo[0].extmetadata?.ImageDescription?.value
                        ? sanitizeHtml(imageInfo.imageinfo[0].extmetadata.ImageDescription.value, { allowedTags: [] })
                        : undefined
                }
            }
            return {}
        } catch (error) {
            console.warn('Failed to fetch image details:', error)
            return {}
        }
    }

    cleanWikipediaContent = (html: string): string => {
        const cleanHtml = sanitizeHtml(html, {
            allowedTags: ['p', 'b', 'i', 'em', 'strong'],
            allowedAttributes: {} // No attributes allowed
        })

        const withoutCitations = cleanHtml.replace(/\[\d+\]/g, '')
        const withoutEmptyParens = withoutCitations.replace(/\(\s*\)/g, '')
        const withoutExtraSpaces = withoutEmptyParens.replace(/\s+/g, ' ')
        const withFixedPunctuation = withoutExtraSpaces.replace(/\s+\./g, '.').replace(/\s+,/g, ',').replace(/\s+;/g, ';').replace(/\s+:/g, ':')

        return withFixedPunctuation.trim()
    }
}
