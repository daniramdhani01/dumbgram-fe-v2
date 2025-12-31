import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Search, Send, SquarePlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import LogoNavigation from '@/components/shared/LogoNavigation'
import Link from 'next/link'
import { NotificationItem, NotificationPopover } from './NotificationPopover'

const notifications: NotificationItem[] = [
  {
    id: "1",
    username: "abdul_h",
    avatarUrl: "/path/to/avatar.jpg",
    type: "comment",
    content: "Nice Place",
    createdAt: new Date(),
    isRead: false,
  },
  {
    id: "2", 
    username: "egi_lol",
    type: "comment",
    content: "Good Vibe",
    createdAt: new Date(),
    isRead: true,
  },
]

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
        <div className='flex justify-end w-3/5 gap-1'>
            <NotificationPopover
                notifications={notifications}
                unreadCount={2}
            />
            <Link href="/message">
            <button
                className="relative p-2 rounded-full transition-colors hover:bg-white/10 cursor-pointer"
                aria-label="Notifications"
            >
                <Send className="h-6 w-6 text-white"/>
                
                {/* Badge untuk unread count */}
                {false && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {/* {unreadCount > 99 ? "99+" : unreadCount} */}
                    99+
                </span>
                )}
            </button>
            </Link>
            <Link href="/create-post">
                <Button variant="rainbow" className='hidden md:flex'>
                    <SquarePlus /> Create Post
                </Button>
            </Link>
        </div>
    </div>
  )
}
