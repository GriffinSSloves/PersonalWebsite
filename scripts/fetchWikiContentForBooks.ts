import path from 'path'
import fs from 'fs/promises'
import { WikiContent, WikipediaClient } from '../src/clients/WikipediaClient'
import { delayMs } from '../src/utils/delayMs'

const fetchWikiContentForBooks = async (bookTitles: string[], sanitize: boolean): Promise<Record<string, string>> => {
    console.log('Starting to fetch Wikipedia content...')

    const wikiClient = new WikipediaClient()
    const results: WikiContent[] = []
    const unsuccessfulFetches: string[] = []

    for (const title of bookTitles) {
        try {
            console.log(`Fetching content for: ${title}`)
            const result = await wikiClient.fetchWikipediaContent(title, sanitize)
            results.push(result)
        } catch (error) {
            console.error(`Failed to fetch content for: ${title}`, error)
            unsuccessfulFetches.push(title)
        }

        await delayMs(1000)
    }

    // Convert to a more usable format
    const contentMap = results.reduce(
        (acc, { title, extract }) => {
            acc[title] = extract
            return acc
        },
        {} as Record<string, string>
    )

    const successfulBookTitles = Object.keys(contentMap)

    console.log('books that successfully fetched content', successfulBookTitles)
    console.log('books that failed to fetch content', unsuccessfulFetches)

    return contentMap
}

export const fetchAndDownloadWikiContentForBooks = async (bookTitles: string[], sanitize: boolean, outputPath: string) => {
    const wikiContent = await fetchWikiContentForBooks(bookTitles, sanitize)

    const fileContent = JSON.stringify(wikiContent, null, 2)

    await fs.mkdir(path.dirname(outputPath), { recursive: true })
    await fs.writeFile(outputPath, fileContent, 'utf-8')

    console.log(`\nDone! Content saved to: ${outputPath}`)
}
