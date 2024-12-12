export const getImagePath = (title: string, directory: string) => {
    const titleWithoutSpaces = title.replace(/\s/g, '')
    const titleWithoutSpecialChars = titleWithoutSpaces.replace(/[^a-zA-Z0-9_]/g, '')

    return `/${directory}/${titleWithoutSpecialChars}.jpg`
}

export const stripPublicFromPath = (path: string) => {
    return path.replace('public/', '')
}
