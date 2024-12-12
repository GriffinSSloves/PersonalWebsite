import path from 'path'
import sanitizeHtml from 'sanitize-html'
import fs from 'fs/promises'
import { getImagePath, stripPublicFromPath } from '@/utils/getImagePath'

export interface WikiFetchable {
    title: string
    url: string
}

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
    wikiFetchable: WikiFetchable
    sanitize: boolean
    imageDir: string
}

type ImageDetails = {
    url: string
}

export class WikipediaClient implements IWikipediaClient {
    fetchWikipediaContent = async ({ wikiFetchable, sanitize, imageDir }: FetchWikipediaContentParams): Promise<WikiContent> => {
        const { url, title } = wikiFetchable

        const pageTitle = WikipediaClient.#extractTitleFromUrl(url)

        const contentUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(pageTitle)}&prop=extracts|pageprops|pageimages&format=json&origin=*&exintro=1&ppprop=page_image&piprop=original`

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
            title,
            extract: finalExtract,
            url
        }

        const wikiImageUrl = await this.#getImageUrlForPage(page)

        if (wikiImageUrl) {
            // Download and save the image, then store the local path

            const localImagePath = await this.#downloadAndSaveImage(imageDir, wikiImageUrl, title)
            result.imageUrl = stripPublicFromPath(localImagePath)
        } else {
            result.imageUrl = getImagePath(title, imageDir)
        }

        return result
    }

    async #getImageUrlForPage(page: any): Promise<string | undefined> {
        if (page.original) {
            return page.original.source
        }

        if (page.pageprops?.page_image) {
            try {
                const imageDetails = await this.#fetchImageDetails(page.pageprops.page_image)
                if (imageDetails) {
                    return imageDetails.url
                }
            } catch (error) {
                console.warn('Failed to fetch image URL:', error)
            }
        }

        return undefined
    }

    async #fetchImageDetails(imageName: string): Promise<ImageDetails | undefined> {
        try {
            const imageUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(imageName)}&prop=imageinfo&iiprop=url|extmetadata&format=json&origin=*`
            const response = await fetch(imageUrl)
            const data = await response.json()

            const pages = data.query.pages
            const imageInfo = pages[Object.keys(pages)[0]]

            if (imageInfo?.imageinfo?.[0]) {
                return {
                    url: imageInfo.imageinfo[0].url
                }
            }
        } catch (error) {
            console.warn('Failed to fetch image details:', error)
        }

        return undefined
    }

    #downloadAndSaveImage = async (imageDir: string, imageUrl: string, title: string): Promise<string> => {
        if (!imageUrl) return ''

        try {
            const response = await fetch(imageUrl)
            if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`)

            const imageBuffer = await response.arrayBuffer()

            // Create a safe filename from the title
            const safeTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase()
            const extension = path.extname(imageUrl) || '.jpg' // Fallback to .jpg if no extension
            const filename = `${safeTitle}${extension}`
            const relativePath = path.join(imageDir, filename)
            const absolutePath = path.join(process.cwd(), relativePath)

            // Ensure the directory exists
            await fs.mkdir(path.dirname(absolutePath), { recursive: true })

            // Save the image
            await fs.writeFile(absolutePath, Buffer.from(imageBuffer))

            return `/${relativePath}` // Return the relative path for use in the application
        } catch (error) {
            console.error('Error downloading image:', error)
            return ''
        }
    }

    static #extractTitleFromUrl(url: string): string {
        try {
            const urlObj = new URL(url)
            const path = urlObj.pathname

            if (path.startsWith('/wiki/')) {
                const title = path.slice(6)
                return decodeURIComponent(title)
            }

            throw new Error('Invalid Wikipedia URL format')
        } catch (error) {
            throw new Error(`Invalid Wikipedia URL: ${url}`)
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
