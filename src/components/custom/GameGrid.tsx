import React, { ReactElement, useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { GriffLink } from '../common/GriffLink'
import { HTMLParser } from '@/clients/HTMLParser'
import { GameData } from '@/data/gameData'

type GamePopoverProps = {
    game: GameData
    handleHoverChange: (open: boolean, game: GameData) => void
    wikiElement: ReactElement
    showRating?: boolean
}

const GamePopover = ({ game, handleHoverChange, wikiElement }: GamePopoverProps) => {
    return (
        <HoverCard onOpenChange={(open) => handleHoverChange(open, game)}>
            <HoverCardTrigger asChild>
                <Card className='overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col align-center  gap-2 p-4'>
                    <div className='flex justify-center items-start h-64 p-2'>
                        <img
                            src={game.imageUrl || '/api/placeholder/300/450'}
                            alt={`Cover of ${game.title}`}
                            className='object-contain h-full w-auto max-w-full'
                        />
                    </div>
                    <CardContent className='p-0'>
                        <h3 className='font-semibold text-lg line-clamp-2'>{game.title}</h3>
                    </CardContent>
                    {game.note && (
                        <CardFooter className='px-4 py-3 bg-gray-50'>
                            <p className='text-sm text-gray-600 italic'>{game.note}</p>
                        </CardFooter>
                    )}
                </Card>
            </HoverCardTrigger>
            <HoverCardContent side='right' align='end' className='w-[480px] border rounded pt-4 pb-0 overflow-y-hidden'>
                <ScrollArea className='h-[320px] w-full px-4'>{wikiElement}</ScrollArea>
            </HoverCardContent>
        </HoverCard>
    )
}

type GameGridProps = {
    games: GameData[]
    title: string
}

const GameGrid = ({ games, title }: GameGridProps) => {
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

    return (
        <div className='space-y-4'>
            <h2 className='text-2xl font-bold'>{title}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {games.map((game, index) => (
                    <GamePopover
                        key={index}
                        game={game}
                        handleHoverChange={handleHoverChange}
                        wikiElement={
                            wikiElements[game.title] ? (
                                <div className='space-y-2'>
                                    <GriffLink external href={game.url} className='h4Style'>
                                        {game.title}
                                    </GriffLink>
                                    <Separator />
                                    <div className='relative'>{wikiElements[game.title]}</div>
                                </div>
                            ) : game.wikiContentLoadFailed ? (
                                <p>Failed to fetch Wikipedia content</p>
                            ) : (
                                <p>Loading Wikipedia content...</p>
                            )
                        }
                    />
                ))}
            </div>
        </div>
    )
}

export default GameGrid
