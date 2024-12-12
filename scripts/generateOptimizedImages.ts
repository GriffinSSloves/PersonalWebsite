import sharp from 'sharp'
import path from 'path'
import fs from 'fs/promises'

const sizes = [270, 768, 1024, 1310, 1536, 1720, 1890, 2048]

const SOURCE_DIR = './src/assets/images'
const OUTPUT_DIR = './public/images/optimized'

const ensureDirectoryExists = async (dir: string) => {
    await fs.mkdir(dir, { recursive: true })
}

const generateOptimizedImages = async (inputPath: string) => {
    // Get relative path from source directory to maintain structure
    const relativePath = path.relative(SOURCE_DIR, path.dirname(inputPath))
    const outputSubDir = path.join(OUTPUT_DIR, relativePath)
    const filename = path.basename(inputPath, path.extname(inputPath))

    console.log('Generating optimized images for:', inputPath)
    console.log('Output directory:', outputSubDir)

    await ensureDirectoryExists(outputSubDir)

    for (const size of sizes) {
        const resizedImage = sharp(inputPath).resize(size, size, {
            fit: 'contain',
            withoutEnlargement: true
        })

        // Generate WebP
        await resizedImage
            .clone()
            .webp({
                quality: 80,
                effort: 6
            })
            .toFile(path.join(outputSubDir, `${filename}-${size}.webp`))

        // Generate AVIF
        await resizedImage
            .clone()
            .avif({
                quality: 65,
                effort: 9
            })
            .toFile(path.join(outputSubDir, `${filename}-${size}.avif`))
    }

    console.log('Done generating optimized images for:', inputPath)
    console.log('Placed in directory:', outputSubDir)
}

const imageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'avif']

const getAllImages = async (dir: string): Promise<string[]> => {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    const files = await Promise.all(
        entries.map(async (entry) => {
            const fullPath = path.join(dir, entry.name)
            if (entry.isDirectory()) {
                return getAllImages(fullPath)
            }

            const extension = entry.name.split('.').pop()?.toLowerCase()
            if (extension && imageExtensions.includes(extension)) {
                return [fullPath]
            }
            return []
        })
    )

    return files.flat()
}

export const generateAllOptimizedImages = async () => {
    try {
        const images = await getAllImages(SOURCE_DIR)

        console.log(`Found ${images.length} images:`)
        console.log(images)

        for (const image of images) {
            await generateOptimizedImages(image)
        }

        console.log('Successfully processed all images')
    } catch (error) {
        console.error('Error processing images:', error)
        throw error
    }
}
