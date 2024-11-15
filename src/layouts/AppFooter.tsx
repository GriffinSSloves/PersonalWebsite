import { GriffLink } from '@/components/common/GriffLink'
import { Github, Linkedin } from 'lucide-react'

export const AppFooter = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className='w-full border-t bg-background'>
            <div className='container mx-auto max-w-6xl px-4 py-6'>
                <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                    {/* Copyright Section */}
                    <div className='text-sm text-muted-foreground'>
                        © {currentYear} Griffin Sloves • Good guy having a great time •{' '}
                        <GriffLink external href='https://github.com/GriffinSSloves/PersonalWebsite' aria-label='Source Code'>
                            Want to learn how I built this?
                        </GriffLink>
                    </div>

                    {/* Social Links */}
                    <div className='flex items-center space-x-4'>
                        <GriffLink external href='https://github.com/GriffinSSloves' aria-label='GitHub Profile'>
                            <Github size={20} />
                        </GriffLink>
                        <GriffLink external href='https://www.linkedin.com/in/griffin-sloves/' aria-label='LinkedIn Profile'>
                            <Linkedin size={20} />
                        </GriffLink>
                    </div>
                </div>
            </div>
        </footer>
    )
}
