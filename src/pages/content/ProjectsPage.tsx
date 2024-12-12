import { LinkButton } from '@/components/common/GriffLink'
import ProjectCard from '@/components/custom/ProjectCard'
import { Star } from 'lucide-react'

// TODO: Could create a more generic ProjectType so that the ProjectCard could be more specific and so that we don't have to restate the common leftColumn and rightColumn props
export const ProjectsPage = () => {
    return (
        <div>
            <h1>Projects</h1>
            <ul className='list-none'>
                <li>
                    <ProjectCard
                        title='Foxtail AI'
                        description='An app that cross-lists your items on eBay, Facebook Marketplace, and other online shopping sites'
                        leftColumn={{
                            content: (
                                <img className='w-full max-h-48 object-contain aspect-auto' src='/images/projects/FoxtailAI.webp' alt="Foxtail AI's Logo" />
                            )
                        }}
                        rightColumn={{
                            content: (
                                <>
                                    <h4 className='text-muted-foreground'>My Role & Highlights</h4>
                                    <ul className='list-none'>
                                        <li>
                                            iOS{' '}
                                            <span className='inline-flex items-center gap-0.5'>
                                                (4.4 <Star className='h-4 w-4 fill-current' />)
                                            </span>
                                            , Android, and Web app
                                        </li>
                                        <li>ChatGPT integration for generating listing details</li>
                                        <li>Performant for users with 20k+ listings</li>
                                    </ul>
                                </>
                            )
                        }}
                        footerContent={
                            <LinkButton external href='https://foxtail.ai/'>
                                Check it out
                            </LinkButton>
                        }
                    />
                </li>
                <li>
                    <ProjectCard
                        title='Microsoft Whiteboard'
                        description='Digital Whiteboard within the Microsoft Office Suite'
                        leftColumn={{
                            content: (
                                <img
                                    className='w-full max-h-48 object-contain aspect-auto'
                                    src='/images/projects/MicrosoftWhiteboard.avif'
                                    alt='Microsoft Whiteboard'
                                />
                            )
                        }}
                        rightColumn={{
                            content: (
                                <>
                                    <h4 className='text-muted-foreground'>My Role & Highlights</h4>
                                    <ul className='list-none'>
                                        <li>Created the front-end interface for the web and Teams versions of the app</li>
                                        <li>Millions of users (thanks Microsoft)</li>
                                        <li>Accessible for blind users and translated into 100+ languages </li>
                                    </ul>
                                </>
                            )
                        }}
                        footerContent={
                            <LinkButton external href='https://www.microsoft.com/en-us/microsoft-365/microsoft-whiteboard/digital-whiteboard-app'>
                                Check it out
                            </LinkButton>
                        }
                    />
                </li>
                <li>
                    <ProjectCard
                        title='Quiet of the Leaves'
                        description='Story-based video game about a girl who gets separated from her dad in a forest'
                        leftColumn={{
                            content: (
                                <img
                                    className='w-full max-h-48 object-contain aspect-auto'
                                    src='/images/projects/QuietOfTheLeaves.png'
                                    alt='Quiet of the Leaves'
                                />
                            )
                        }}
                        rightColumn={{
                            content: (
                                <>
                                    <h4 className='text-muted-foreground'>My Role & Highlights</h4>
                                    <ul className='list-none'>
                                        <li>My very first public project at USC!</li>
                                        <li>Lead the engineering team of 5 other students</li>
                                        <li>Narrative branching system</li>
                                    </ul>
                                </>
                            )
                        }}
                        footerContent={
                            <LinkButton external href='https://quietoftheleaves.itch.io/'>
                                Check it out
                            </LinkButton>
                        }
                    />
                </li>
            </ul>
        </div>
    )
}
