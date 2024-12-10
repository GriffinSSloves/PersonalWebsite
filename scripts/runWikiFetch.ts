import { fetchBookDataFromWiki } from './fetchWikiContentForBooks'
import { fetchGameDataFromWiki } from './fetchWikiContentForGaming'

// TODO: Create a script runner that we can pass in the script to

fetchBookDataFromWiki().catch((error) => {
    console.error('Failed to fetch and save wiki content:', error)
    process.exit(1)
})
