import VitruvianNav, { NavLink } from '@/components/custom/VitruvianNav'

const navigationLinks: NavLink[] = [
    { position: 'heart', label: 'About Me', href: '/about' },
    { position: 'leftArm', label: 'Books', href: '/books' },
    { position: 'rightArm', label: 'Projects', href: '/projects' },
    { position: 'leftLeg', label: 'Gaming', href: '/gaming' },
    { position: 'rightLeg', label: 'Friends', href: '/friends' }
]

const HomePage = () => {
    return (
        <div>
            <VitruvianNav links={navigationLinks} />
        </div>
    )
}

export default HomePage
