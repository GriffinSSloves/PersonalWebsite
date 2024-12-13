import sharp from 'sharp'
import path from 'path'
import fs from 'fs/promises'
import imageCache, { ImageCache } from './imageCache'
import { ensureDirectoryExists } from '../utils/ensureDirectoryExists'
import { getAllImages } from './getAllImages'

const SOURCE_DIR = 'src/assets/images'
const OUTPUT_DIR = 'public/images/optimized'

const sizes = [270, 768, 1024, 1310, 1536, 1720, 1890, 2048]

const imageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'svg']

const generateOptimizedImages = async (inputPath: string, cache: ImageCache) => {
    const relativePath = path.relative(SOURCE_DIR, path.dirname(inputPath))
    const outputSubDir = path.join(OUTPUT_DIR, relativePath)
    const filename = path.basename(inputPath, path.extname(inputPath))

    // Check if file needs processing
    const currentHash = await imageCache.getFileHash(inputPath)
    const cacheEntry = cache[inputPath]

    if (cacheEntry && cacheEntry.hash === currentHash) {
        console.log('Image already processed, skipping:', inputPath)
        return false
    }

    console.log('Processing image:', inputPath)
    await ensureDirectoryExists(outputSubDir)

    for (const size of sizes) {
        const resizedImage = sharp(inputPath).resize(size, size, {
            fit: 'inside',
            withoutEnlargement: true
        })

        await resizedImage
            .clone()
            .webp({
                quality: 80,
                effort: 6
            })
            .toFile(path.join(outputSubDir, `${filename}-${size}.webp`))

        await resizedImage
            .clone()
            .avif({
                quality: 65,
                effort: 9
            })
            .toFile(path.join(outputSubDir, `${filename}-${size}.avif`))
    }

    // Update cache
    cache[inputPath] = {
        hash: currentHash,
        lastProcessed: new Date().toISOString(),
        sizes
    }

    return true
}

const copySvgFile = async (inputPath: string) => {
    const relativePath = path.relative(SOURCE_DIR, path.dirname(inputPath))
    const outputSubDir = path.join(OUTPUT_DIR, relativePath)
    const filename = path.basename(inputPath)

    await ensureDirectoryExists(outputSubDir)
    const outputPath = path.join(outputSubDir, filename)

    console.log('Copying SVG file:', inputPath)
    await fs.copyFile(inputPath, outputPath)
    console.log('SVG copied to:', outputPath)
}

export const generateAllOptimizedImages = async () => {
    try {
        const cache = await imageCache.loadCache()
        const images = await getAllImages(SOURCE_DIR, imageExtensions)
        let processedCount = 0

        console.log(`Found ${images.length} images`)

        for (const image of images) {
            const extension = path.extname(image).toLowerCase()

            if (extension === '.svg') {
                await copySvgFile(image)
            } else {
                const wasProcessed = await generateOptimizedImages(image, cache)
                if (wasProcessed) processedCount++
            }
        }

        await imageCache.saveCache(cache)
        console.log(`Successfully processed ${processedCount} new/modified images`)
        console.log(`Skipped ${images.length - processedCount} unchanged images`)
    } catch (error) {
        console.error('Error processing images:', error)
        throw error
    }
}
