import sharp from 'sharp'
import path from 'path'
import fs from 'fs/promises'
import imageCache, { ImageCache } from './imageCache'
import { ensureDirectoryExists } from '../utils/ensureDirectoryExists'
import { getAllImages } from './getAllImages'
import { IMAGE_SIZES } from '../../src/constants/imageSizes'

const SOURCE_DIR = 'src/assets/images'
const OUTPUT_DIR = 'public/images/optimized'

const imageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'svg']

const generateOptimizedImages = async (inputPath: string, cache: ImageCache) => {
    const relativePath = path.relative(SOURCE_DIR, path.dirname(inputPath))
    const outputSubDir = path.join(OUTPUT_DIR, relativePath)
    const filename = path.basename(inputPath, path.extname(inputPath))

    // Get original image dimensions
    const originalDimensions = await verifyImageDimensions(inputPath)
    console.log('Original image dimensions:', {
        file: filename,
        ...originalDimensions
    })

    // Check if file needs processing
    const currentHash = await imageCache.getFileHash(inputPath)
    const cacheEntry = cache[inputPath]

    if (cacheEntry && cacheEntry.hash === currentHash) {
        console.log('Image already processed, skipping:', inputPath)
        return false
    }

    console.log('Processing image:', inputPath)
    await ensureDirectoryExists(outputSubDir)

    for (const size of IMAGE_SIZES) {
        // For sizes larger than original, use the original size instead
        const targetSize = size > originalDimensions.width ? originalDimensions.width : size

        const resizedImage = sharp(inputPath).resize(targetSize, null, {
            width: targetSize,
            withoutEnlargement: true
        })

        // Generate WebP
        const webpPath = path.join(outputSubDir, `${filename}-${size}.webp`)
        await resizedImage
            .clone()
            .webp({
                quality: 80,
                effort: 6
            })
            .toFile(webpPath)

        // Generate AVIF
        const avifPath = path.join(outputSubDir, `${filename}-${size}.avif`)
        await resizedImage
            .clone()
            .avif({
                quality: 65,
                effort: 9
            })
            .toFile(avifPath)

        console.log(`Generated ${size}px version (actual width: ${targetSize}px):`, {
            file: filename,
            format: `webp, avif`
        })
    }

    // Update cache with all sizes (even though some might be the same file)
    cache[inputPath] = {
        hash: currentHash,
        lastProcessed: new Date().toISOString(),
        sizes: IMAGE_SIZES
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

const verifyImageDimensions = async (filePath: string) => {
    try {
        const metadata = await sharp(filePath).metadata()
        return {
            width: metadata.width ?? 0,
            height: metadata.height ?? 0,
            format: metadata.format
        }
    } catch (error) {
        console.error(`Error getting metadata for ${filePath}:`, error)
        throw error
    }
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
