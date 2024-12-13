import { GriffImage } from '@/components/common/GriffImage'
import { GriffLink } from '@/components/common/GriffLink'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface FriendProjectData {
    title: string
    description: string
    imgSrc: string
    link: string
}

const friendProjectData: FriendProjectData[] = [
    {
        title: 'Wool at the Gates',
        description: 'A base-building strategy game in which you defend your base from hordes of sheep',
        imgSrc: '/friends/WoolAtTheGates.jpg',
        link: 'https://store.steampowered.com/app/2994990/Wool_at_the_Gates/'
    },
    {
        title: 'The Typed Writer',
        description: "My fiancee's reviews of every book she has read",
        imgSrc: '/friends/TheTypedWriter.jpg',
        link: 'https://www.thetypedwriter.com/'
    },
    {
        title: 'Jackalope',
        description: 'An app that helps gig economy workers find jobs, manage their schedule, and track their finances',
        imgSrc: '/friends/Jackalope.png',
        link: 'https://www.jackalo.pe/'
    },
    {
        title: "Girls' Night",
        description: 'Hilarious comedy sketch video',
        imgSrc: '/friends/GirlsNight.png',
        link: 'https://www.youtube.com/watch?v=OLM8jyNNGMQ'
    },
    {
        title: 'Besthuntr - Rouje The Cat',
        description: 'A song by a cat',
        imgSrc: '/friends/RoujeTheCat.png',
        link: 'https://open.spotify.com/artist/3KomuCo3Yv3LHCMAWOuw4k'
    }
]

const FriendsPage = () => {
    const randomizedFriendData = friendProjectData.sort(() => Math.random() - 0.5)

    return (
        <div>
            <h1>Friends</h1>
            <p>
                Check out my friends' amazing projects!<span className='italic text-sm'></span>
            </p>
            <div className='w-full px-4 mt-4'>
                <div className='grid grid-cols-1 lg:grid-cols-5 gap-6'>
                    {randomizedFriendData.map((project, index) => {
                        // Calculate if this should be a wide card
                        const isWide =
                            index % 4 === 0 || // First in row
                            index % 4 === 3 // Second in alternating row

                        return (
                            <div
                                key={index}
                                className={`transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                                    isWide ? 'lg:col-span-3' : 'lg:col-span-2'
                                }`}>
                                <GriffLink external href={project.link} className='no-underline'>
                                    <Card className='h-80 overflow-hidden bg-white hover:bg-gray-50 transition-colors'>
                                        <div className='overflow-hidden h-2/3'>
                                            <GriffImage
                                                src={project.imgSrc}
                                                alt={project.title}
                                                className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
                                            />
                                        </div>
                                        <CardHeader className='py-3'>
                                            <CardTitle className='text-lg'>{project.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent className=''>
                                            <p className='text-sm text-gray-600 line-clamp-2'>{project.description}</p>
                                        </CardContent>
                                    </Card>
                                </GriffLink>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default FriendsPage
