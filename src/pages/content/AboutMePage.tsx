import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@radix-ui/react-separator'
import { ReactNode } from 'react'

// TODO: Improve pictures of me

interface TimelineItem {
    title: string
    date: string
    description: ReactNode
    imageUrl: string
    imageAlt: string
}

const timelineItems: TimelineItem[] = [
    {
        title: 'Growing up',
        date: '1996-2013',
        description: (
            <p>
                I grew up in Fremont, CA, raised by my wonderful parents, Jonathan and Dianna, with my sister Jackie. I loved games from an early age - my dad
                and sister taught me to play chess when I was 4 years old. I haven’t backed down from a challenge since. (And I still won’t, message me if you
                want to play chess with me.) I was a fortunate kid in a great community. Some of my oldest friends from home are still some of my closest
                friends.
            </p>
        ),
        imageUrl: '/images/aboutMe/PixarChessShort.jpg',
        imageAlt: 'Me playing chess'
    },
    {
        title: 'College',
        date: '2013-2017',
        description: (
            <p>
                At 17, I left home to go to college at USC, where I studied computer science and game programming. Here, my desire and confidence in myself to
                become a programmer crystallized. After a tough first semester away from home, I remember being in my Data Structures class thinking “Wow, I’m
                really good at this. This is fun!” I also joined a fraternity, Sigma Alpha Mu, where I was secretary and recruitment chair. Finally and most
                importantly, I achieved the rank of Legend in Hearthstone and beat Civ V on Deity difficulty.
            </p>
        ),
        imageUrl: '/images/aboutMe/FriendlyRobot.webp',
        imageAlt: 'USC Trojan logo'
    },
    {
        title: 'Seattle',
        date: '2017-2020',
        description: (
            <p>
                After college, I moved up to Seattle and worked for Microsoft. Programming in real life was so different than college, and so much more
                rewarding. I gained as much practical skill as a programmer in the first 6 months at work as I did all throughout college. I also began writing.
                The friends I made in Seattle were creative, and they encouraged me to write with them. Now, I see creating, whether through programming or
                writing, as a key part of myself.
            </p>
        ),
        imageUrl: '/images/aboutMe/Seattle.webp',
        imageAlt: 'Current role illustration'
    },
    {
        title: 'Covid',
        date: '2020-2021',
        description: (
            <p>
                Covid was horrible and I was miserable. But going through that tough experience forced me to grow and create a positive vision for a good life.
                That is: To be good to my friends and family. To enjoy life the whole way through. To be healthy and active. To use our big brains to create. To
                invite everyone to join in and be a part of my tribe of good and friendly people.
            </p>
        ),
        imageUrl: '/images/aboutMe/Sadface.jpg',
        imageAlt: 'Covid illustration'
    },
    {
        title: 'San Diego',
        date: '2021-Present',
        description: (
            <p>
                More importantly than any words or philosophy, I moved down to Orange County, where I met my fiancee, Melissa. She is an incredible writer,
                teacher, gamer, boba enjoyer, bad pun lover, hard rock concert goer, the list goes on. We now live in San Diego together and are very happy. My
                journey is now our journey…
            </p>
        ),
        imageUrl: '/images/aboutMe/GriffinMelissaEngagementPic.jpeg',
        imageAlt: "Griffin and Melissa's engagement picture"
    },
    {
        title: 'Future',
        date: 'Present-Forever',
        description: (
            <p>
                And it will continue. We will have a great wedding. We will write good books. We will create cool games. We will make great friends. We will go
                on fun trips. We will drink good boba tea. We will root on our favorite teams (go Niners!). Most importantly, we’ll enjoy each and every day.
            </p>
        ),
        imageUrl: '/images/aboutMe/GriffinMelissaWeddingPic.jpeg',
        imageAlt: 'Future illustration'
    }
]

export const AboutMePage = () => {
    return (
        <div>
            <h1>About Me</h1>
            <p>I'm Griffin Sloves, software engineer and good guy™</p>
            <br />

            <h4>My Story</h4>

            <div className='w-full max-w-6xl mx-auto py-8'>
                {timelineItems.map((item, index) => (
                    <div key={index}>
                        <div className={`flex flex-col md:flex-row gap-8 h-96 items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                            {/* Text Content */}
                            <Card className='flex-1 w-full h-full md:w-1/2'>
                                <CardContent className='pt-6'>
                                    <h3>{item.title}</h3>
                                    <p className='text-muted-foreground'>{item.date}</p>
                                    <div className='mt-4'>{item.description}</div>
                                </CardContent>
                            </Card>

                            {/* Image Content */}
                            <div className='flex-1 h-full w-full md:w-1/2'>
                                <img src={item.imageUrl} alt={item.imageAlt} className='w-full h-full object-contain rounded-lg shadow-lg bg-secondary' />
                            </div>
                        </div>

                        {index < timelineItems.length - 1 && (
                            <div className='my-8'>
                                <Separator className='w-1/2 mx-auto' />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
