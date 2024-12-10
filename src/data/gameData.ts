export type GameTitle =
    | 'League of Legends'
    | 'Teamfight Tactics'
    | 'Civilization V'
    | 'Overcooked 2'
    | 'Call of Duty'
    | 'Chess'
    | 'Hearts'
    | 'Hearthstone'
    | 'Super Auto Pets'

export interface GameData {
    title: GameTitle
    url: string
    note?: string
    wikipediaContent?: string
    imageUrl?: string
    wikiContentLoadFailed?: boolean
}

type Rarity = 'bronze' | 'silver' | 'gold'

export interface GamingAchievement {
    gameTitle: GameTitle
    achievementTitle: string
    rarity: Rarity
    description: string
    note?: string
}

export const gamingAchievements: GamingAchievement[] = [
    {
        gameTitle: 'Teamfight Tactics',
        achievementTitle: 'Challenger',
        rarity: 'gold',
        description: 'Griffin was one of the best 50 players in the world at this game!'
    },
    {
        gameTitle: 'Overcooked 2',
        achievementTitle: '100% Completion',
        rarity: 'silver',
        description: 'Griffin and Melissa completed every level in Overcooked 2 with 4 stars, awarded for completing each level with a near-perfect score'
    },
    {
        gameTitle: 'Hearthstone',
        achievementTitle: 'Legend',
        rarity: 'silver',
        description: 'Griffin reached the highest rank in Hearthstone'
    },
    {
        gameTitle: 'Super Auto Pets',
        achievementTitle: 'Top 50',
        rarity: 'silver',
        description: 'Griffin was one of the best 50 players in the world at this game'
    },
    {
        gameTitle: 'Civilization V',
        achievementTitle: 'Deity Victory',
        rarity: 'bronze',
        description: 'Griffin won a game of Civilization V on the highest difficulty'
    },
    {
        gameTitle: 'Chess',
        achievementTitle: '2000 Rapid Elo',
        rarity: 'bronze',
        description: 'Griffin has reached a great, but not elite level of play in chess'
    },
    {
        gameTitle: 'League of Legends',
        achievementTitle: 'Diamond',
        rarity: 'bronze',
        description: 'Griffin reached the top 2% of players in League of Legends'
    }
]

export const gameData: Record<GameTitle, GameData> = {
    'League of Legends': {
        title: 'League of Legends',
        url: 'https://en.wikipedia.org/wiki/League_of_Legends',
        note: "I forbid myself from playing this game again - still, it's my favorite game of all time."
    },
    'Teamfight Tactics': {
        title: 'Teamfight Tactics',
        url: 'https://en.wikipedia.org/wiki/Teamfight_Tactics',
        note: "This game is so fun and addicting that it's also forbidden."
    },
    'Civilization V': {
        title: 'Civilization V',
        url: 'https://en.wikipedia.org/wiki/Civilization_V',
        note: 'Amazing strategy game. '
    },
    'Overcooked 2': {
        title: 'Overcooked 2',
        url: 'https://en.wikipedia.org/wiki/Overcooked_2',
        note: 'My favorite game to play with my fiance, Melissa! We have played through every level together and loved every second of it.'
    },
    'Call of Duty': {
        title: 'Call of Duty',
        url: 'https://en.wikipedia.org/wiki/Call_of_Duty',
        note: 'My favorite game as a teenager. I played this game for hours on end with my friends.'
    },
    Chess: {
        title: 'Chess',
        url: 'https://en.wikipedia.org/wiki/Chess',
        note: 'My dad taught me to play chess when I was 4 years old! I love chess and will never back down from a challenge.'
    },
    Hearts: {
        title: 'Hearts',
        url: 'https://en.wikipedia.org/wiki/Hearts_(card_game)',
        note: "My family's favorite game."
    },
    Hearthstone: {
        title: 'Hearthstone',
        url: 'https://en.wikipedia.org/wiki/Hearthstone'
    },
    'Super Auto Pets': {
        title: 'Super Auto Pets',
        url: 'https://en.wikipedia.org/wiki/Super_Auto_Pets',
        note: 'Super quick and fun strategy game to play on your phone.'
    }
}

export const faveGames: GameTitle[] = ['League of Legends', 'Teamfight Tactics', 'Civilization V', 'Overcooked 2', 'Call of Duty', 'Chess', 'Hearts']
