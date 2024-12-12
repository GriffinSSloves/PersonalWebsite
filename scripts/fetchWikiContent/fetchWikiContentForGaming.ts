import path from 'path'
import { fetchAndSaveWikiContent, FetchWikiOptions, SaveOptions } from './fetchWikiContent'
import { WikiFetchable } from '../../src/clients/WikipediaClient'
import { gameData } from '../../src/data/gameData'

const outputPath = path.join(process.cwd(), 'public', 'Data', 'gameWikiContent.json')

export const fetchGameDataFromWiki = async () => {
    const gameDataFetchable: WikiFetchable[] = Object.keys(gameData).map((key) => {
        const game = gameData[key]

        if (!game) {
            console.warn(`No game data found for game: ${key}`)
            throw new Error(`No URL for game: ${key}`)
        }

        return {
            title: gameData[key].title,
            url: gameData[key].url
        }
    })

    const fetchOptions: FetchWikiOptions = {
        items: gameDataFetchable,
        imageDir: 'public/images/games',
        sanitize: true,
        delayBetweenRequests: 1000
    }

    const saveOptions: SaveOptions = {
        outputPath,
        createDirectory: true
    }

    await fetchAndSaveWikiContent(fetchOptions, saveOptions)

    console.log('Done fetching games!')
}
