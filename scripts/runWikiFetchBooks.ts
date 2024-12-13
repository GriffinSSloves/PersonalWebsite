import { fetchBookDataFromWiki } from './fetchWikiContent/fetchWikiContentForBooks'

fetchBookDataFromWiki().catch((error) => {
    console.error('Failed to fetch and save wiki content:', error)
    process.exit(1)
})
