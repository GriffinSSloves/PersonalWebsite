export const getImagePath = (title: string, directory: string) => {
    const titleWithoutSpaces = title.replace(/\s/g, '')
    const titleWithoutSpecialChars = titleWithoutSpaces.replace(/[^a-zA-Z0-9_]/g, '')

    return `/${directory}/${titleWithoutSpecialChars}.jpg`
}

// Usage: stripFromPath('src/images/My Image.jpg', 'src/images/')
export const stripFromPath = (path: string, strip: string) => {
    return path.replace(strip, '')
}
