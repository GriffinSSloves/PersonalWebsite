// TODO: Create a script runner that we can pass in the script to

import { generateAllOptimizedImages } from './optimizeImages/generateOptimizedImages'

generateAllOptimizedImages().catch((error) => {
    console.error('Failed to optimize images:', error)
    process.exit(1)
})
