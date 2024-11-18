export interface BookData {
    title: string
    author: string
    url: string
    rating: number
    wikipediaContent?: string
    wikiContentLoadFailed?: boolean
}

export const allTimeFaveBookData: BookData[] = [
    {
        title: 'Nineteen Eighty-Four',
        author: 'George Orwell',
        url: 'https://en.wikipedia.org/wiki/Nineteen_Eighty-Four',
        rating: 10
    },
    {
        title: "But What If We're Wrong?",
        author: 'Chuck Klosterman',
        url: 'https://en.wikipedia.org/wiki/But_What_If_We%27re_Wrong%3F',
        rating: 10
    }
]

export const books2024Data: BookData[] = [
    {
        title: 'Exhalation',
        author: 'Ted Chiang',
        url: 'https://en.wikipedia.org/wiki/Exhalation_(short_story_collection)',
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
        url: '',
        rating: 8
    },
    {
        title: 'Tomorrow, And Tomorrow, And Tomorrow',
        author: 'Gabrielle Zevin',
        url: '',
        rating: 9
    },
    {
        title: 'Remarkably Bright Creatures',
        author: '',
        url: '',
        rating: 7
    }
]

export const allBooks: BookData[] = [...allTimeFaveBookData, ...books2024Data]
