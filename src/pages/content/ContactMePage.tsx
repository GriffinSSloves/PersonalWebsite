import { GriffLink } from '@/components/common/GriffLink'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export const ContactMePage = () => {
    const [showEmail, setShowEmail] = useState(false)

    const handleShowEmail = () => {
        setShowEmail(true)
    }

    return (
        <div>
            <h1>Contact me</h1>
            <br />

            <Button onClick={handleShowEmail}>Show my email</Button>

            {showEmail && (
                <p>
                    Email:{' '}
                    <GriffLink external href='mailto:griffinsloves@gmail.com'>
                        griffinsloves@gmail.com
                    </GriffLink>
                </p>
            )}
        </div>
    )
}

export default ContactMePage
