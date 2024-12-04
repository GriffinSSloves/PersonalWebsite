import path from 'path'
import fs from 'fs/promises'
import { WikiContent, WikipediaClient } from '../src/clients/WikipediaClient'
import { delayMs } from '../src/utils/delayMs'
import { BookData } from '../src/data/bookData'

const fetchWikiContentForBooks = async (bookData: BookData[], sanitize: boolean): Promise<Record<string, WikiContent>> => {
    console.log('Starting to fetch Wikipedia content...')
    console.log('bookData', bookData)

    const wikiClient = new WikipediaClient()
    const results: WikiContent[] = []
    const unsuccessfulFetches: string[] = []

    for (const book of bookData) {
        try {
            console.log(`Fetching content for: ${book.title}`)
            const result = await wikiClient.fetchWikipediaContent({
                url: book.url,
                title: book.title,
                sanitize
            })
            results.push(result)
        } catch (error) {
            console.error(`Failed to fetch content for: ${book.title}`, error)
            unsuccessfulFetches.push(book.title)
        }

        await delayMs(1000)
    }

    // Convert to a more usable format
    const contentMap = results.reduce(
        (acc, result) => {
            acc[result.title] = result
            return acc
        },
        {} as Record<string, WikiContent>
    )

    const successfulBookTitles = Object.keys(contentMap)

    console.log('books that successfully fetched content', successfulBookTitles)
    console.log('books that failed to fetch content', unsuccessfulFetches)

    return contentMap
}

export const fetchAndDownloadWikiContentForBooks = async (bookData: BookData[], sanitize: boolean, outputPath: string) => {
    const wikiContent = await fetchWikiContentForBooks(bookData, sanitize)

    const fileContent = JSON.stringify(wikiContent, null, 2)

    await fs.mkdir(path.dirname(outputPath), { recursive: true })
    await fs.writeFile(outputPath, fileContent, 'utf-8')

    console.log(`\nDone! Content saved to: ${outputPath}`)
}
