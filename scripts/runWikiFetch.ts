import { fetchBookDataFromWiki } from './fetchWikiContent/fetchWikiContentForBooks'
import { fetchGameDataFromWiki } from './fetchWikiContent/fetchWikiContentForGaming'

// TODO: Create a script runner that we can pass in the script to

fetchGameDataFromWiki().catch((error) => {
    console.error('Failed to fetch and save wiki content:', error)
    process.exit(1)
})
