import path from 'path'
import { WikiContent, WikiFetchable, WikipediaClient } from '../../src/clients/WikipediaClient'
import { delayMs } from '../../src/utils/delayMs'
import fs from 'fs/promises'

export interface FetchWikiOptions {
    items: WikiFetchable[]
    imageDir: string
    imageDirToStrip: string
    sanitize: boolean
    delayBetweenRequests?: number // Optional delay between requests in ms
}

export const fetchWikiContent = async ({
    items,
    imageDir,
    imageDirToStrip,
    sanitize,
    delayBetweenRequests = 1000
}: FetchWikiOptions): Promise<Record<string, WikiContent>> => {
    console.log('Starting to fetch Wikipedia content...')
    console.log('Items to process:', items)

    const wikiClient = new WikipediaClient()

    const results: WikiContent[] = []
    const unsuccessfulFetches: string[] = []

    for (const item of items) {
        const result = await wikiClient.fetchWikipediaContent({
            wikiFetchable: item,
            imageDir,
            imageDirToStrip,
            sanitize
        })

        if (result) {
            results.push(result)
        } else {
            unsuccessfulFetches.push(item.title)
        }

        if (delayBetweenRequests > 0 && items.indexOf(item) !== items.length - 1) {
            await delayMs(delayBetweenRequests)
        }
    }

    const contentMap = results.reduce(
        (acc, result) => {
            acc[result.title] = result
            return acc
        },
        {} as Record<string, WikiContent>
    )

    console.log('Successfully fetched content for:', Object.keys(contentMap))
    if (unsuccessfulFetches.length > 0) {
        console.log('Failed to fetch content for:', unsuccessfulFetches)
    }

    return contentMap
}

export interface SaveOptions {
    outputPath: string
    createDirectory?: boolean // Whether to create directory if it doesn't exist
}

export const fetchAndSaveWikiContent = async (fetchOptions: FetchWikiOptions, saveOptions: SaveOptions): Promise<void> => {
    const wikiContent = await fetchWikiContent(fetchOptions)
    const fileContent = JSON.stringify(wikiContent, null, 2)

    if (saveOptions.createDirectory) {
        await fs.mkdir(path.dirname(saveOptions.outputPath), { recursive: true })
    }

    await fs.writeFile(saveOptions.outputPath, fileContent, 'utf-8')
    console.log(`\nDone! Content saved to: ${saveOptions.outputPath}`)
}
