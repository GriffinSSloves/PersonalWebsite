import { fetchAndDownloadWikiContentForBooks } from './fetchWikiContentForBooks'
import path from 'path'
import { allBooks } from '../src/data/bookData'

const bookTitles: string[] = allBooks.map((book) => book.title)

// TODO: Create a script runner that we can pass in the script to

const outputPath = path.join(process.cwd(), 'public', 'Books', 'bookWikiContent.json')

fetchAndDownloadWikiContentForBooks(bookTitles, true, outputPath).catch((error) => {
    console.error('Failed to fetch and save wiki content:', error)
    process.exit(1)
})
