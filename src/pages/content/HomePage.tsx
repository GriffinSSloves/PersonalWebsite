import { GriffLink } from '@/components/common/link'

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
