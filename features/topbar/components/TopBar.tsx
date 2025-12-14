import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Bell, Search, Send, SquarePlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import LogoNavigation from '@/components/shared/LogoNavigation'

export default function TopBar() {
  return (
    <div className='flex justify-between'>
        <div className='w-2/5'>
            <LogoNavigation className='md:hidden'/>
            <InputGroup className='hidden md:flex'>
                <InputGroupInput placeholder="Search" />
                <InputGroupAddon><Search /></InputGroupAddon>
            </InputGroup>
        </div>
        <div className='flex justify-end w-3/5 gap-2'>
            <Button variant="outline" size="icon">
                <Bell />
            </Button>
            <Button variant="outline" size="icon">
                <Send />
            </Button>
            <Button variant="rainbow" className='hidden md:flex'>
                <SquarePlus /> Create Post
            </Button>
        </div>
    </div>
  )
}
