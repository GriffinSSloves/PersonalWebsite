import { GriffLink } from '@/components/common/GriffLink'

export const HomePage = () => {
    return (
        <div>
            <h1>Pages</h1>
            <ul className='list-none'>
                <GriffLink to='/projects'>Projects</GriffLink>
            </ul>
        </div>
    )
}
