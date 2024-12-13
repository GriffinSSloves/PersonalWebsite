import { Link } from 'react-router-dom'
import { GriffImage } from '../common/GriffImage'

type NavLinkPosition = 'heart' | 'leftArm' | 'rightArm' | 'leftLeg' | 'rightLeg'

export type NavLink = {
    position: NavLinkPosition
    label: string
    href: string
}

type VitruvianNavProps = {
    links: NavLink[]
    className?: string
}
export const VitruvianNav = ({ links, className = '' }: VitruvianNavProps) => {
    const getPositionClasses = (position: NavLinkPosition): string => {
        // Base positioning classes that all links will have
        const baseClasses = 'absolute transform -translate-x-1/2 -translate-y-1/2'

        // Positions, desktop uses the ones that start with sm:, mobile uses the ones that don't
        const positions = {
            heart: 'left-[48%] sm:left-[50%] top-[33%] sm:top-[33%]',
            leftArm: 'left-[10%] sm:left-[6%] top-[33%] sm:top-[33%]',
            rightArm: 'left-[87%] sm:left-[93%] top-[33%] sm:top-[33%]',
            leftLeg: 'left-[25%] sm:left-[25%] top-[90%] sm:top-[90%]',
            rightLeg: 'left-[75%] sm:left-[75%] top-[90%] sm:top-[90%]'
        }

        return `${baseClasses} ${positions[position]}`
    }

    return (
        <div className={`relative w-full max-w-3xl mx-auto ${className}`}>
            <div className='relative w-full pb-[100%]'>
                <GriffImage src='/home/VitruvianMan.webp' alt='Vitruvian Man Navigation' className='absolute inset-0 w-full h-full object-contain' />

                {links.map((link) => (
                    <Link
                        key={link.href}
                        to={link.href}
                        className={`
                            ${getPositionClasses(link.position)}
                            bg-white/90 hover:bg-white 
                            dark:bg-slate-800/90 dark:hover:bg-slate-800 
                            rounded-full p-3 md:p-4 shadow-lg backdrop-blur-sm 
                            transition-all duration-300 hover:scale-110 
                            flex flex-col items-center gap-2
                        `}>
                        <span className='text-sm md:text-lg font-medium'>{link.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default VitruvianNav
