import { fetchGameDataFromWiki } from './fetchWikiContent/fetchWikiContentForGaming'

fetchGameDataFromWiki().catch((error) => {
    console.error('Failed to fetch and save wiki content:', error)
    process.exit(1)
})
