import { BookData } from '@/pages/content/BooksPage'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import { ReactElement, useState } from 'react'
import { delayMs } from '@/utils/delayMs'

type BookPopoverProps = {
    book: BookData
    showRating: boolean
}

export const BookPopover = ({ book }: BookPopoverProps) => {
    const [wikiContent, setWikiContent] = useState<ReactElement | null>(null)
    const [isFetching, setIsFetching] = useState(false)
    const [hasError, setHasError] = useState(false)

    const fetchWikipediaContent = async () => {
        await delayMs(1000)

        return <div>This is a great novel</div>
    }

    const onHoverChange = async (open: boolean) => {
        console.log('hover change', open, isFetching, wikiContent)
        if (!open || isFetching || wikiContent) {
            return
        }

        try {
            setIsFetching(true)
            console.log('starting to fetch')
            const wikiContent = await fetchWikipediaContent()
            setWikiContent(wikiContent)
        } catch (error) {
            console.error('Failed to fetch Wikipedia content', error)
            setHasError(true)
        } finally {
            console.log('finished fetching')
            setIsFetching(false)
        }
    }

    return (
        <div>
            <HoverCard onOpenChange={onHoverChange}>
                <HoverCardTrigger asChild>
                    <div className='flex w-fit min-w-[600px] items-center space-x-2 p-1 bg-white hover:bg-gray-50 rounded-lg cursor-pointer'>
                        <p>
                            <span className='font-semibold'>{book.title}</span> • {book.author}
                        </p>
                    </div>
                </HoverCardTrigger>
                <HoverCardContent align='center' className='w-[480px] border rounded px-4 pt-4 pb-0 overflow-y-hidden'>
                    <ScrollArea className='h-[200px] w-full '>
                        {wikiContent ? (
                            <div className='space-y-2'>
                                <h4>{book.title}</h4>
                                <Separator />
                                {wikiContent}
                            </div>
                        ) : isFetching ? (
                            <p>Loading Wikipedia content...</p>
                        ) : hasError ? (
                            <p>Failed to fetch Wikipedia content</p>
                        ) : (
                            <p>Hover over the book to see more information</p>
                        )}
                    </ScrollArea>
                </HoverCardContent>
            </HoverCard>
        </div>
    )
}
