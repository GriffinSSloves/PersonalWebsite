import path from 'path'
import { allBooks } from '../../src/data/bookData'
import { fetchAndSaveWikiContent, FetchWikiOptions, SaveOptions } from './fetchWikiContent'

const outputPath = path.join(process.cwd(), 'public', 'Data', 'bookWikiContent.json')

export const fetchBookDataFromWiki = async () => {
    const fetchOptions: FetchWikiOptions = {
        items: allBooks,
        imageDir: 'src/assets/images/books',
        imageDirToStrip: 'src/assets/images/',
        sanitize: true,
        delayBetweenRequests: 1000
    }

    const saveOptions: SaveOptions = {
        outputPath,
        createDirectory: true
    }

    await fetchAndSaveWikiContent(fetchOptions, saveOptions)

    console.log('Done fetching books!')
}
