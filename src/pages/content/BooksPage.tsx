import { WikiContent } from '@/clients/WikipediaClient'
import { BookPopover } from '@/components/custom/BookPopover'
import { allTimeFaveBookData, BookData, books2024Data } from '@/data/bookData'
import { useEffect, useState } from 'react'

const populateBook = (data: Record<string, WikiContent>, book: BookData) => {
    const wikiContent = data[book.title]
    if (!wikiContent) {
        return {
            ...book,
            wikiContentLoadFailed: true
        }
    }

    return {
        ...book,
        wikipediaContent: wikiContent.extract,
        imageUrl: wikiContent.imageUrl
    }
}

// TODO: Make this page look better, I want to show the cover of every book and maybe a little bit of the wikipedia content without a popover
export const BooksPage = () => {
    const [faveBooksPopulated, setFaveBooksPopulated] = useState<BookData[]>(allTimeFaveBookData)
    const [books2024Populated, setBooks2024Populated] = useState<BookData[]>(books2024Data)

    const loadBooksAsync = async (faveBookData: BookData[], books2024Data: BookData[]) => {
        try {
            const response = await fetch('Data/bookWikiContent.json')
            const json = await response.json()
            const data = json as Record<string, WikiContent>

            console.log('data', data)

            const faveBooksPopulated = faveBookData.map((book) => populateBook(data, book))
            const books2024Populated = books2024Data.map((book) => populateBook(data, book))

            setFaveBooksPopulated(faveBooksPopulated)
            setBooks2024Populated(books2024Populated)
        } catch (error) {
            console.error('Failed to load books:', error)
        }
    }

    useEffect(() => {
        loadBooksAsync(allTimeFaveBookData, books2024Data)
    }, [allTimeFaveBookData, books2024Data])

    console.log('faveBooksPopulated', faveBooksPopulated)
    console.log('books2024Populated', books2024Populated)

    return (
        <div>
            <h1>Books</h1>
            <h4 className='mt-4'>All time favorites</h4>
            <ul className='list-none'>
                {faveBooksPopulated.map((book, index) => (
                    <li key={index}>
                        <BookPopover book={book} />
                    </li>
                ))}
            </ul>

            <h4 className='mt-4'>2024 Reads</h4>
            <ul className='list-none'>
                {books2024Populated.map((book, index) => (
                    <li key={index}>
                        <BookPopover book={book} showRating={true} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
