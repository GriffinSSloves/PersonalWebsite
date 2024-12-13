import React, { ReactElement, useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { GriffLink } from '../common/GriffLink'
import { HTMLParser } from '@/clients/HTMLParser'
import { BookData } from '@/data/bookData'
import { GriffImage } from '../common/GriffImage'

// TODO: It could be a potential performance improvement to pre-parse all of the wikipedia content instead of parsing it on hover
// Could avoid having to build the html-sanitize into the package
// Potential downside of generating the html beforehand and finding a place to put it

type BookPopoverProps = {
    book: BookData
    handleHoverChange: (open: boolean, book: BookData) => void
    wikiElement: ReactElement
    showRating?: boolean
}

const BookPopover = ({ book, showRating, handleHoverChange, wikiElement }: BookPopoverProps) => {
    return (
        <HoverCard onOpenChange={(open) => handleHoverChange(open, book)}>
            <HoverCardTrigger asChild>
                <Card className='overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col align-center  gap-2 p-4'>
                    <div className='flex justify-center items-start h-64 p-2'>
                        <GriffImage src={book.imageUrl} alt={`Cover of ${book.title}`} className='object-contain h-full w-auto max-w-full' />
                    </div>
                    <CardContent className='p-0'>
                        <h3 className='font-semibold text-lg line-clamp-2'>{book.title}</h3>
                        <p className='text-sm text-gray-600 [&:not(:first-child)]:mt-1'>{book.author}</p>
                        {book.currentlyReading ? (
                            <p className='text-sm text-amber-600 font-medium [&:not(:first-child)]:mt-1'>Currently reading!</p>
                        ) : (
                            showRating && <p className='text-sm text-amber-600 font-medium [&:not(:first-child)]:mt-1'>Rating: {book.rating}/10</p>
                        )}
                    </CardContent>
                    {book.note && (
                        <CardFooter className='px-4 py-3 bg-gray-50'>
                            <p className='text-sm text-gray-600 italic'>{book.note}</p>
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

type BookGridProps = {
    books: BookData[]
    showRating?: boolean
    title: string
}

const BookGrid = ({ books, showRating = false, title }: BookGridProps) => {
    const [wikiElements, setWikiElements] = useState<Record<string, ReactElement | null>>({})

    const handleHoverChange = async (open: boolean, book: BookData) => {
        if (!open || wikiElements[book.title] || !book.wikipediaContent || book.wikiContentLoadFailed) {
            return
        }

        let parsedElement: ReactElement | null = null
        try {
            const parser = new HTMLParser()
            parsedElement = parser.parseData(book.wikipediaContent)
        } catch (error) {
            console.error('Failed to parse Wikipedia content:', error)
            parsedElement = <p>Failed to parse Wikipedia content</p>
        }

        setWikiElements((prev) => ({
            ...prev,
            [book.title]: parsedElement
        }))
    }

    return (
        <div className='space-y-4'>
            <h2 className='text-2xl font-bold'>{title}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {books.map((book, index) => (
                    <BookPopover
                        key={index}
                        book={book}
                        showRating={showRating}
                        handleHoverChange={handleHoverChange}
                        wikiElement={
                            wikiElements[book.title] ? (
                                <div className='space-y-2'>
                                    <GriffLink external href={book.url} className='h4Style'>
                                        {book.title}
                                    </GriffLink>
                                    <Separator />
                                    <div className='relative'>{wikiElements[book.title]}</div>
                                </div>
                            ) : book.wikiContentLoadFailed ? (
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

export default BookGrid
