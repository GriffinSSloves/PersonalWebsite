import { LinkButton } from '@/components/common/GriffLink'
import ProjectCard from '@/components/custom/ProjectCard'
import { Star } from 'lucide-react'

// TODO: Re-host picture of Foxtail AI's logo from my site
// Improve styling of the project card for mobile
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
                                <img
                                    className='w-full max-h-48 object-contain aspect-auto'
                                    src='https://foxtail.ai/wp-content/uploads/2022/10/home-hero-image@2x-1024x809.png'
                                    alt="Foxtail AI's Logo"
                                />
                            )
                        }}
                        rightColumn={{
                            content: (
                                <>
                                    <h4 className='text-muted-foreground'>Highlights</h4>
                                    <ul className='list-none'>
                                        <li>
                                            iOS{' '}
                                            <span className='inline-flex items-center gap-0.5'>
                                                (4.4 <Star className='h-4 w-4 fill-current' />)
                                            </span>
                                            , Android, and Web app
                                        </li>
                                        <li>ChatGPT Integration for Generating Listing Details</li>
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
            </ul>
        </div>
    )
}
