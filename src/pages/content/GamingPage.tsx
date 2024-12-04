import { WikiContent } from '@/clients/WikipediaClient'
import { GamePopover } from '@/components/custom/GamePopover'
import { faveGameData, GameData, nonVideoGameData, otherGameData } from '@/data/gameData'
import { useState, useEffect } from 'react'

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

export const GamingPage = () => {
    const [faveGamesPopulated, setFaveGamesPopulated] = useState<GameData[]>(faveGameData)
    const [otherGamesPopulated, setOtherGamesPopulated] = useState<GameData[]>()
    const [nonVideoGamesPopulated, setNonVideoGamesPopulated] = useState<GameData[]>()

    const loadGamesAsync = async (allTimeFaveGameData: GameData[], otherGameData: GameData[], nonVideoGameData: GameData[]) => {
        try {
            const response = await fetch('Games/gameWikiContent.json')
            const json = await response.json()
            const data = json as Record<string, WikiContent>

            const faveGamesPopulated = allTimeFaveGameData.map((game) => populateGame(data, game))
            const otherGamesPopulated = otherGameData.map((game) => populateGame(data, game))
            const nonVideoGamesPopulated = nonVideoGameData.map((game) => populateGame(data, game))

            setFaveGamesPopulated(faveGamesPopulated)
            setOtherGamesPopulated(otherGamesPopulated)
            setNonVideoGamesPopulated(nonVideoGamesPopulated)
        } catch (error) {
            console.error('Failed to load games:', error)
        }
    }

    useEffect(() => {
        loadGamesAsync(faveGameData, otherGameData, nonVideoGameData)
    }, [faveGameData, otherGameData, nonVideoGameData])

    return (
        <div>
            <h1>Gaming</h1>
            <h4>Achievements</h4>
            <ul className='list-none'>
                {faveGamesPopulated.map((game, index) => (
                    <li key={index}>
                        <GamePopover game={game} />
                    </li>
                ))}
            </ul>

            <h4>All time favorites</h4>
            <ul className='list-none'>
                {faveGamesPopulated.map((game, index) => (
                    <li key={index}>
                        <GamePopover game={game} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
