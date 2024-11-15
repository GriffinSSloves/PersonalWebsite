import { GriffLink } from '@/components/common/GriffLink'

export const HomePage = () => {
    return (
        <div>
            <h1>Pages</h1>
            <ul className='list-none'>
                <li>
                    <GriffLink to='/projects'>Projects</GriffLink>
                </li>
                <li>
                    <GriffLink to='/about'>About me</GriffLink>
                </li>
                <li>
                    <GriffLink to='/contact'>Contact</GriffLink>
                </li>
            </ul>
        </div>
    )
}
