import sanitizeHtml from 'sanitize-html'

export interface WikiContent {
    title: string
    extract: string
}

export interface IWikipediaClient {
    fetchWikipediaContent(title: string): Promise<WikiContent>
}

export class WikipediaClient {
    fetchWikipediaContent = async (title: string, sanitize: boolean): Promise<WikiContent> => {
        // TODO: Pass this in as a parameter

        const titlePlusBook = title + ' book'

        const encodedTitle = encodeURIComponent(titlePlusBook)

        // First, search for the exact page
        const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodedTitle}&format=json&origin=*`
        const searchResponse = await fetch(searchUrl)
        const searchData = await searchResponse.json()

        if (searchData.query.search.length === 0) {
            throw new Error(`No results found for: ${title}`)
        }

        // Get the page ID of the first result
        const pageId = searchData.query.search[0].pageid

        // Then fetch the actual content
        const contentUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=1&format=json&pageids=${pageId}&origin=*`
        const contentResponse = await fetch(contentUrl)
        const contentData = await contentResponse.json()

        const rawExtract = contentData.query.pages[pageId].extract
        let finalExtract = rawExtract
        if (sanitize) {
            finalExtract = this.cleanWikipediaContent(rawExtract)
        }

        return {
            title,
            extract: finalExtract
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
