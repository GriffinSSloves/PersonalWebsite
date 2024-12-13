import { WikiContent } from '@/clients/WikipediaClient'
import AchievementPodium from '@/components/custom/AchievementPodium'
import GameGrid from '@/components/custom/GameGrid'
import { faveGames, gameData, GameData, GameTitle, gamingAchievements } from '@/data/gameData'
import { useState, useEffect, useMemo } from 'react'

const populateGame = (data: Record<string, WikiContent>, game: GameData) => {
    const wikiContent = data[game.title]
    if (!wikiContent) {
        return {
            ...game,
            wikiContentLoadFailed: true
        }
    }

    return {
        ...game,
        wikipediaContent: wikiContent.extract,
        imageUrl: wikiContent.imageUrl
    }
}

const GamingPage = () => {
    const [gameDataPopulated, setGameDataPopulated] = useState<Record<GameTitle, GameData>>(gameData)

    const loadGamesAsync = async (gameData: Record<GameTitle, GameData>) => {
        try {
            const response = await fetch('Data/gameWikiContent.json')
            const json = await response.json()
            const data = json as Record<string, WikiContent>

            const gameDataPopulated: Record<GameTitle, GameData> = Object.keys(gameData).reduce(
                (acc, key) => {
                    const gameTitle = key as GameTitle

                    const game = gameData[gameTitle]
                    const populatedGame = populateGame(data, game)
                    acc[gameTitle] = populatedGame
                    return acc
                },
                {} as Record<GameTitle, GameData>
            )

            setGameDataPopulated(gameDataPopulated)
        } catch (error) {
            console.error('Failed to load games:', error)
        }
    }

    useEffect(() => {
        loadGamesAsync(gameData)
    }, [gameData])

    const faveGamesPopulated = useMemo(() => {
        return faveGames.map((gameTitle) => gameDataPopulated[gameTitle])
    }, [faveGames, gameDataPopulated])

    const achievementsPopulated = useMemo(() => {
        return gamingAchievements.map((achievement) => {
            return {
                ...achievement,
                game: gameDataPopulated[achievement.gameTitle]
            }
        })
    }, [gamingAchievements, gameDataPopulated])

    return (
        <div>
            <h1>Gaming</h1>
            <p className='mt-4'>
                I'm a gamer. I always play for fun, but for some games, I push myself to be one of the best to ever play. Please enjoy my proudest achievements.
                <br />
                <span className='italic text-sm'>Note: Hover over an achievement to learn more about it</span>
            </p>

            <h2 className='text-2xl font-bold mt-8'>Achievements</h2>
            <AchievementPodium achievements={achievementsPopulated} gameDataPopulated={gameDataPopulated} />

            <div className='mt-8'></div>
            <GameGrid games={faveGamesPopulated} title='All time favorites' />
        </div>
    )
}

export default GamingPage
