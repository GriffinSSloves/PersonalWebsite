import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { GriffLink } from '../common/GriffLink'

interface FriendCardProps {
    title: string
    description: string
    imgSrc: string
    link: string
}

const FriendCard = ({ title, description, link, imgSrc }: FriendCardProps) => {
    return (
        <GriffLink external href={link} className='no-underline'>
            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <img src={imgSrc} className='w-full max-h-48 object-contain aspect-auto' />
                </CardContent>
            </Card>
        </GriffLink>
    )
}

export default FriendCard
