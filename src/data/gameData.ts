export interface GameData {
    title: string
    url: string
    note?: string
    wikipediaContent?: string
    imageUrl?: string
    wikiContentLoadFailed?: boolean
}

export const faveGameData: GameData[] = [
    {
        title: 'League of Legends',
        url: 'https://en.wikipedia.org/wiki/League_of_Legends',
        note: "I forbid myself from playing this game again - still, it's my favorite game of all time."
    },
    {
        title: 'Teamfight Tactics',
        url: 'https://en.wikipedia.org/wiki/Teamfight_Tactics',
        note: 'Also forbidden'
    },
    {
        title: 'Civilization V',
        url: 'https://en.wikipedia.org/wiki/Civilization_V'
    },
    {
        title: 'Overcooked 2',
        url: 'https://en.wikipedia.org/wiki/Overcooked_2'
    },
    {
        title: 'Call of Duty',
        url: 'https://en.wikipedia.org/wiki/Call_of_Duty'
    }
]

export const nonVideoGameData: GameData[] = [
    {
        title: 'Chess',
        url: 'https://en.wikipedia.org/wiki/Chess'
    },
    {
        title: 'Hearts',
        url: 'https://en.wikipedia.org/wiki/Hearts_(card_game)'
    }
]

export const otherGameData: GameData[] = [
    {
        title: 'Hearthstone',
        url: 'https://en.wikipedia.org/wiki/Hearthstone'
    },
    {
        title: 'Super Auto Pets',
        url: 'https://en.wikipedia.org/wiki/Super_Auto_Pets'
    }
]

export const allGames: GameData[] = [...faveGameData]
