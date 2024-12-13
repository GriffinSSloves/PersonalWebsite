import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy } from 'lucide-react'
import { gameData, GameData, GamingAchievement } from '@/data/gameData'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { ScrollArea } from '../ui/scroll-area'
import { HTMLParser } from '@/clients/HTMLParser'
import { useState, ReactElement } from 'react'
import { GriffLink } from '../common/GriffLink'
import { Separator } from '../ui/separator'
import { GriffImage } from '../common/GriffImage'

const getPodiumColor = (rarity: GamingAchievement['rarity']) => {
    const colors = {
        gold: 'bg-gradient-to-br from-yellow-500 to-yellow-300',
        silver: 'bg-gradient-to-br from-gray-400 to-gray-200',
        bronze: 'bg-gradient-to-br from-amber-700 to-amber-500'
    }
    return colors[rarity]
}

const getPodiumTextSize = (rarity: GamingAchievement['rarity']) => {
    const sizes = {
        gold: 'text-base sm:text-lg',
        silver: 'text-sm sm:text-base',
        bronze: 'text-sm sm:text-base'
    }
    return sizes[rarity]
}

type AchievementCardProps = {
    achievement: GamingAchievement
    gameData: GameData
    textSize: string
    handleHoverChange: (open: boolean, game: GameData) => void
    wikiElement: ReactElement
}

const AchievementCard = ({ achievement, gameData, textSize, handleHoverChange, wikiElement }: AchievementCardProps) => {
    return (
        <HoverCard onOpenChange={(open) => handleHoverChange(open, gameData)}>
            <HoverCardTrigger asChild>
                <Card className='w-full bg-white/5 backdrop-blur-sm'>
                    <CardHeader className='pb-2 p-2'>
                        <CardTitle className={`${textSize} flex justify-between items-center gap-4`}>
                            <div className='flex items-center gap-3'>
                                <div className='w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 flex justify-center items-center'>
                                    <GriffImage src={gameData.imageUrl} alt={gameData.title} className='object-cover' />
                                </div>
                                <span className='flex-grow'>
                                    {achievement.gameTitle}
                                    <br />
                                    {achievement.achievementTitle}
                                </span>
                            </div>
                            <Trophy className='w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0' />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='text-xs sm:text-sm p-2'>{achievement.description}</CardContent>
                </Card>
            </HoverCardTrigger>
            <HoverCardContent side='right' align='end' className='w-[480px] border rounded pt-4 pb-0 overflow-y-hidden'>
                <ScrollArea className='h-[320px] w-full px-4'>{wikiElement}</ScrollArea>
            </HoverCardContent>
        </HoverCard>
    )
}

type AchievementPodiumProps = {
    achievements: GamingAchievement[]
    gameDataPopulated: Record<string, GameData>
}

export const AchievementPodium = ({ achievements, gameDataPopulated }: AchievementPodiumProps) => {
    const goldAchievements = achievements.filter((a) => a.rarity === 'gold')
    const silverAchievements = achievements.filter((a) => a.rarity === 'silver')
    const bronzeAchievements = achievements.filter((a) => a.rarity === 'bronze')

    const [wikiElements, setWikiElements] = useState<Record<string, ReactElement | null>>({})

    const handleHoverChange = async (open: boolean, game: GameData) => {
        if (!open || wikiElements[game.title] || !game.wikipediaContent || game.wikiContentLoadFailed) {
            return
        }

        let parsedElement: ReactElement | null = null
        try {
            const parser = new HTMLParser()
            parsedElement = parser.parseData(game.wikipediaContent)
        } catch (error) {
            console.error('Failed to parse Wikipedia content:', error)
            parsedElement = <p>Failed to parse Wikipedia content</p>
        }

        setWikiElements((prev) => ({
            ...prev,
            [game.title]: parsedElement
        }))
    }

    const AchievementCardFactory = ({ achievement }: { achievement: GamingAchievement }) => {
        const gameData = gameDataPopulated[achievement.gameTitle]

        return (
            <AchievementCard
                key={achievement.gameTitle}
                achievement={achievement}
                gameData={gameData}
                textSize={getPodiumTextSize(achievement.rarity)}
                handleHoverChange={handleHoverChange}
                wikiElement={
                    wikiElements[achievement.gameTitle] ? (
                        <div className='space-y-2'>
                            <GriffLink external href={gameData.url} className='h4Style'>
                                {gameData.title}
                            </GriffLink>
                            <Separator />
                            <div className='relative'>{wikiElements[gameData.title]}</div>
                        </div>
                    ) : gameData.wikiContentLoadFailed ? (
                        <p>Failed to fetch Wikipedia content</p>
                    ) : (
                        <p>Loading Wikipedia content...</p>
                    )
                }
            />
        )
    }

    return (
        <div className='w-full p-4'>
            {/* Desktop Layout */}
            <div className='hidden md:flex gap-4 justify-center items-end h-[600px]'>
                {/* Silver - Left */}
                <div className={`${getPodiumColor('silver')} w-1/3 rounded-t-lg p-4 pb-8 space-y-4 min-h-400`}>
                    {silverAchievements.map((achievement) => (
                        <AchievementCardFactory key={`${achievement.gameTitle}${achievement.gameTitle}`} achievement={achievement} />
                    ))}
                </div>

                {/* Platinum/Gold - Center (Taller) */}
                <div className={`${getPodiumColor('gold')} w-1/3 rounded-t-lg p-4 pb-8 space-y-4 h-full`}>
                    {goldAchievements.map((achievement) => (
                        <AchievementCardFactory key={`${achievement.gameTitle}${achievement.gameTitle}`} achievement={achievement} />
                    ))}
                </div>

                {/* Bronze - Right */}
                <div className={`${getPodiumColor('bronze')} w-1/3 rounded-t-lg p-4 pb-8 space-y-4 min-h-300`}>
                    {bronzeAchievements.map((achievement) => (
                        <AchievementCardFactory key={`${achievement.gameTitle}${achievement.gameTitle}`} achievement={achievement} />
                    ))}
                </div>
            </div>

            {/* Mobile Layout */}
            <div className='md:hidden space-y-6'>
                {/* Platinum & Gold Section */}
                <div className={`${getPodiumColor('gold')} rounded-lg p-4 space-y-4`}>
                    {goldAchievements.map((achievement) => (
                        <AchievementCardFactory key={`${achievement.gameTitle}${achievement.gameTitle}`} achievement={achievement} />
                    ))}
                </div>

                {/* Silver Section */}
                <div className={`${getPodiumColor('silver')} rounded-lg p-4 space-y-4`}>
                    {silverAchievements.map((achievement) => (
                        <AchievementCardFactory key={`${achievement.gameTitle}${achievement.gameTitle}`} achievement={achievement} />
                    ))}
                </div>

                {/* Bronze Section */}
                <div className={`${getPodiumColor('bronze')} rounded-lg p-4 space-y-4`}>
                    {bronzeAchievements.map((achievement) => (
                        <AchievementCardFactory key={`${achievement.gameTitle}${achievement.gameTitle}`} achievement={achievement} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AchievementPodium
