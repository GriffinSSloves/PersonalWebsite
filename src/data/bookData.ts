export interface BookData {
    title: string
    author: string
    url: string
    rating: number
    note?: string
    wikipediaContent?: string
    imageUrl?: string
    wikiContentLoadFailed?: boolean
}

export const allTimeFaveBookData: BookData[] = [
    {
        title: 'Catch-22',
        author: 'Joseph Heller',
        url: 'https://en.wikipedia.org/wiki/Catch-22',
        rating: 10
    },
    {
        title: "But What If We're Wrong?",
        author: 'Chuck Klosterman',
        url: 'https://en.wikipedia.org/wiki/But_What_If_We%27re_Wrong%3F',
        rating: 10
    },
    {
        title: 'The Grapes of Wrath',
        author: 'John Steinbeck',
        url: 'https://en.wikipedia.org/wiki/The_Grapes_of_Wrath',
        rating: 10
    },
    {
        title: 'The Three Body Problem',
        author: 'Liu Cixin',
        url: 'https://en.wikipedia.org/wiki/The_Three-Body_Problem_(novel)',
        rating: 10
    },
    {
        title: 'Snow Crash',
        author: 'Neal Stephenson',
        url: 'https://en.wikipedia.org/wiki/Snow_Crash',
        rating: 10
    },
    {
        title: 'Watchmen',
        author: 'Alan Moore',
        url: 'https://en.wikipedia.org/wiki/Watchmen',
        rating: 10
    },
    {
        title: 'Griffin and Sabine',
        author: 'Nick Bantock',
        url: 'https://en.wikipedia.org/wiki/Griffin_and_Sabine',
        rating: 10,
        note: 'I am named for this book!'
    }
]

export const books2024Data: BookData[] = [
    {
        title: 'Exhalation',
        author: 'Ted Chiang',
        url: 'https://en.wikipedia.org/wiki/Exhalation:_Stories',
        rating: 9
    },
    {
        title: 'The Outsiders',
        author: 'S.E. Hinton',
        url: 'https://en.wikipedia.org/wiki/The_Outsiders_(novel)',
        rating: 8
    },
    {
        title: 'The Moviegoer',
        author: 'Walker Percy',
        url: 'https://en.wikipedia.org/wiki/The_Moviegoer',
        rating: 7
    },
    {
        title: 'Brave New World',
        author: 'Aldous Huxley',
        url: 'https://en.wikipedia.org/wiki/Brave_New_World',
        rating: 8
    },
    {
        title: 'Murder on the Orient Express',
        author: 'Agatha Christie',
        url: 'https://en.wikipedia.org/wiki/Murder_on_the_Orient_Express',
        rating: 8
    },
    {
        title: 'Tomorrow, And Tomorrow, And Tomorrow',
        author: 'Gabrielle Zevin',
        url: 'https://en.wikipedia.org/wiki/Tomorrow,_and_Tomorrow,_and_Tomorrow',
        rating: 9
    },
    {
        title: 'Remarkably Bright Creatures',
        author: 'Shelby Van Pelt',
        url: 'https://en.wikipedia.org/wiki/Remarkably_Bright_Creatures',
        rating: 7
    }
]

export const allBooks: BookData[] = [...allTimeFaveBookData, ...books2024Data]
