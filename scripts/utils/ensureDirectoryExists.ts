import fs from 'fs/promises'

export const ensureDirectoryExists = async (dir: string) => {
    await fs.mkdir(dir, { recursive: true })
}
