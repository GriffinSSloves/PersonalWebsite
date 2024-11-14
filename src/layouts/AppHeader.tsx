import { FlexGrow } from '@/components/ui/flexGrow'
import { Separator } from '@radix-ui/react-separator'

export const AppHeader = () => {
    return (
        <>
            <header className=' w-full border-b bg-background'>
                <div className='flex container mx-auto max-w-6xl px-2 py-2 align-center'>
                    <img src='/GriffinLogo.svg' alt='Griffin Logo' className='h-16 w-16 scale-x-[-1]' />
                    <FlexGrow />
                    <h2 className='text-4xl font-bold text-slate-900 leading-[4rem]'>Griffin Sloves</h2>
                    <FlexGrow />
                    <img src='/GriffinLogo.svg' alt='Griffin Logo' className='h-16 w-16' />
                </div>
            </header>
            <Separator orientation='horizontal' className='bg-slate-200 h-[1px]' />
        </>
    )
}
