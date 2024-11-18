import { BookPopover } from '@/components/custom/BookPopover'
import { allTimeFaveBookData, BookData, books2024Data } from '@/data/bookData'
import { useEffect, useState } from 'react'

// TODO: Improve typing
const populateBook = (data: any, book: BookData) => {
    const wikiContent = data[book.title]
    if (!wikiContent) {
        return {
            ...book,
            wikiContentLoadFailed: true
        }
    }

    return {
        ...book,
        wikipediaContent: wikiContent
    }
}

export const BooksPage = () => {
    const [faveBooks, setFaveBooksPopulated] = useState<BookData[]>(allTimeFaveBookData)
    const [books2024, setBooks2024Populated] = useState<BookData[]>(books2024Data)

    const loadBooksAsync = async () => {
        try {
            const response = await fetch('Books/bookWikiContent.json')
            const data = await response.json()

            const faveBooksPopulated = allTimeFaveBookData.map((book) => populateBook(data, book))
            const books2024Populated = books2024.map((book) => populateBook(data, book))

            setFaveBooksPopulated(faveBooksPopulated)
            setBooks2024Populated(books2024Populated)
        } catch (error) {
            console.error('Failed to load books:', error)
        }
    }

    useEffect(() => {
        loadBooksAsync()
    }, [allTimeFaveBookData, books2024])

    return (
        <div>
            <h1>Books</h1>
            <h4>All time favorites</h4>
            <ul className='list-none'>
                {faveBooks.map((book, index) => (
                    <li key={index}>
                        <BookPopover book={book} showRating={false} />
                    </li>
                ))}
            </ul>

            <h4>2024 Reads</h4>
            <ul className='list-none'>
                {books2024.map((book, index) => (
                    <li key={index}>
                        <BookPopover book={book} showRating={false} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
