import { WikiContent } from '@/clients/WikipediaClient'
import BookGrid from '@/components/custom/BookGrid'
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

const BooksPage = () => {
    const [faveBooksPopulated, setFaveBooksPopulated] = useState<BookData[]>(allTimeFaveBookData)
    const [books2024Populated, setBooks2024Populated] = useState<BookData[]>(books2024Data)

    const loadBooksAsync = async (faveBookData: BookData[], books2024Data: BookData[]) => {
        try {
            const response = await fetch('Data/bookWikiContent.json')
            const json = await response.json()
            const data = json as Record<string, WikiContent>

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
    }, [])

    return (
        <div className='container mx-auto px-4 py-8 space-y-12'>
            <h1 className='text-3xl font-bold'>Books</h1>
            <BookGrid title='All Time Favorites' books={faveBooksPopulated} />
            <BookGrid title='2024 Reads' books={books2024Populated} showRating={true} />
        </div>
    )
}

export default BooksPage
