import path from 'path'
import fs from 'fs/promises'

export const getAllImages = async (dir: string, imageExtensions: string[]): Promise<string[]> => {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    const files = await Promise.all(
        entries.map(async (entry) => {
            const fullPath = path.join(dir, entry.name)
            if (entry.isDirectory()) {
                console.log('recursing into:', fullPath)
                return getAllImages(fullPath, imageExtensions)
            }

            console.log('found file: ', fullPath)

            const extension = entry.name.split('.').pop()?.toLowerCase()
            console.log('extension:', extension)
            console.log('imageExtensions:', imageExtensions)
            if (extension && imageExtensions.includes(extension)) {
                console.log('found image:', fullPath)
                return [fullPath]
            }
            console.log('not an image:', fullPath)
            return []
        })
    )

    return files.flat()
}
