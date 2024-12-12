export interface BookData {
    title: string
    author: string
    url: string
    rating: number
    note?: string
    wikipediaContent?: string
    imageUrl?: string
    wikiContentLoadFailed?: boolean
    currentlyReading?: boolean
}

export const allTimeFaveBookData: BookData[] = [
    {
        title: 'Catch-22',
        author: 'Joseph Heller',
        url: 'https://en.wikipedia.org/wiki/Catch-22',
        rating: 10,
        note: 'A man can’t escape World War II due to an impossible requirement to leave the service (the Catch-22). It’s hilarious though, and made me a funnier person.'
    },
    {
        title: "But What If We're Wrong?",
        author: 'Chuck Klosterman',
        url: 'https://en.wikipedia.org/wiki/But_What_If_We%27re_Wrong%3F',
        rating: 10,
        note: 'A non-fiction book about questioning beliefs we take for granted (e.g. gravity)!'
    },
    {
        title: 'The Grapes of Wrath',
        author: 'John Steinbeck',
        url: 'https://en.wikipedia.org/wiki/The_Grapes_of_Wrath',
        rating: 10,
        note: 'A family struggles in their journey from Oklahoma to California during the Great Depression. Incredibly sad.'
    },
    {
        title: 'The Three Body Problem',
        author: 'Liu Cixin',
        url: 'https://en.wikipedia.org/wiki/The_Three-Body_Problem_(novel)',
        rating: 10,
        note: 'Bad-ass hard sci-fi novel. The first book is partly a mystery, so go into it blind.'
    },
    {
        title: 'Snow Crash',
        author: 'Neal Stephenson',
        url: 'https://en.wikipedia.org/wiki/Snow_Crash',
        rating: 10,
        note: 'Bad-ass high-octane sci-fi novel that came up with the idea of virtual reality.'
    },
    {
        title: 'Watchmen',
        author: 'Alan Moore',
        url: 'https://en.wikipedia.org/wiki/Watchmen',
        rating: 10,
        note: 'Comic book that starts with a superhero getting murdered. Dark, but awesome.'
    },
    {
        title: 'Thinking, Fast and Slow',
        author: 'Daniel Kahneman',
        url: 'https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow',
        rating: 10,
        note: 'Non-fiction book about how our brains work, what makes people happy, and how we can think irrationally.'
    },
    {
        title: 'Griffin and Sabine',
        author: 'Nick Bantock',
        url: 'https://en.wikipedia.org/wiki/Griffin_and_Sabine',
        rating: 10,
        note: "I am named for this book! It's a strange story about people in different dimensions writing love-letters to each other."
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
    },
    {
        title: 'Stories of your life and others',
        author: 'Ted Chiang',
        url: 'https://en.wikipedia.org/wiki/Stories_of_Your_Life_and_Others',
        rating: 0,
        currentlyReading: true
    }
]

export const allBooks: BookData[] = [...allTimeFaveBookData, ...books2024Data]
