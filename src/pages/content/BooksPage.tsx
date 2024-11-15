import { BookPopover } from '@/components/custom/BookPopover'

export interface BookData {
    title: string
    author: string
    url: string
    rating: number
    wikipediaContent?: string
}

const sampleBooks: BookData[] = [
    {
        title: '1984',
        author: 'George Orwell',
        url: 'https://en.wikipedia.org/wiki/Nineteen_Eighty-Four',
        rating: 10,
        wikipediaContent:
            '1984 is a dystopian novel by George Orwell published in 1949. The novel is set in Airstrip One (formerly known as Great Britain), a province of the superstate Oceania in a world of perpetual war, omnipresent government surveillance, and public manipulation.'
    },
    {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        url: 'https://en.wikipedia.org/wiki/To_Kill_a_Mockingbird',
        rating: 10,
        wikipediaContent:
            'To Kill a Mockingbird is a novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature.'
    }
    // Add more books as needed
]

export const BooksPage = () => {
    return (
        <div>
            <h1>Books</h1>
            <h4>All time favorites</h4>
            <ul className='list-none'>
                {sampleBooks.map((book, index) => (
                    <li key={index}>
                        <BookPopover book={book} showRating={false} />
                    </li>
                ))}
            </ul>

            <h4>2024 Reads</h4>
            <ul className='list-none'>
                <li></li>
            </ul>
        </div>
    )
}
