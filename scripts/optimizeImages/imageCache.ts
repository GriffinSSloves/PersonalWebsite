import fs from 'fs/promises'
import crypto from 'crypto'

// Cache structure in a JSON file
export interface ImageCache {
    [imagePath: string]: {
        hash: string
        lastProcessed: string
        sizes: number[]
    }
}

const CACHE_FILE = '.image-cache.json'

// Calculate file hash
const getFileHash = async (filePath: string): Promise<string> => {
    const content = await fs.readFile(filePath)
    return crypto.createHash('md5').update(content).digest('hex')
}

// Load cache
const loadCache = async (): Promise<ImageCache> => {
    try {
        const cacheContent = await fs.readFile(CACHE_FILE, 'utf-8')
        return JSON.parse(cacheContent)
    } catch {
        return {}
    }
}

// Save cache
const saveCache = async (cache: ImageCache) => {
    await fs.writeFile(CACHE_FILE, JSON.stringify(cache, null, 2))
}

export default {
    getFileHash,
    loadCache,
    saveCache
}
