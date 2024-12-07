import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import { ReactElement, useState } from 'react'
import { HTMLParser } from '@/clients/HTMLParser'
import { GriffLink } from '../common/GriffLink'
import { BookData } from '@/data/bookData'

type BookPopoverProps = {
    book: BookData
    showRating?: boolean
}

export const BookPopover = ({ book, showRating }: BookPopoverProps) => {
    const { wikipediaContent, wikiContentLoadFailed } = book

    const [wikiElement, setWikiElement] = useState<ReactElement | null>(null)

    const onHoverChange = async (open: boolean) => {
        if (!open || !!wikiElement || !wikipediaContent || !!wikiContentLoadFailed) {
            return
        }

        let parsedElement: ReactElement | null = null
        try {
            const parser = new HTMLParser()
            parsedElement = parser.parseData(wikipediaContent)
        } catch (error) {
            console.error('Failed to parse Wikipedia content:', error)
            parsedElement = <p>Failed to parse Wikipedia content</p>
        }

        setWikiElement(parsedElement)
    }

    return (
        <div>
            <HoverCard onOpenChange={onHoverChange}>
                <HoverCardTrigger asChild>
                    <div className='flex w-fit min-w-[600px] items-center space-x-2 p-1 bg-white hover:bg-gray-50 rounded-lg cursor-pointer'>
                        <p>
                            <span className='font-semibold'>{book.title}</span> • {book.author} {showRating && `• ${book.rating}/10`}
                            {book.note && <span className='italic'>• {book.note}</span>}
                        </p>
                    </div>
                </HoverCardTrigger>
                <HoverCardContent align='center' className='w-[480px] border rounded pt-4 pb-0 overflow-y-hidden'>
                    <ScrollArea className='h-[320px] w-full px-4'>
                        {wikiElement ? (
                            <div className='space-y-2 relative'>
                                <GriffLink external href={book.url} className='h4Style'>
                                    {book.title}
                                </GriffLink>
                                <Separator />
                                <div className='relative'>
                                    {book.imageUrl && (
                                        <div className='float-right ml-4 mb-2'>
                                            <img src={book.imageUrl} alt={book.title} className='w-32 rounded-md' />
                                        </div>
                                    )}
                                    {wikiElement}
                                </div>
                            </div>
                        ) : wikiContentLoadFailed ? (
                            <p>Failed to fetch Wikipedia content</p>
                        ) : (
                            <p>Loading Wikipedia content...</p>
                        )}
                    </ScrollArea>
                </HoverCardContent>
            </HoverCard>
        </div>
    )
}
