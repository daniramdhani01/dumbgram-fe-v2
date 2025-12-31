import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const messageList = [
    {
        username: 'alicefreeman',
        message: 'You are the best! 🎉',
        time: '10:30 AM',
        avatar: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg',
        unreadCount: 2,
    },
    {
        username: 'josefina',
        message: 'Thanks for helping me yesterday!',
        time: '09:45 AM',
        avatar: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg',
        unreadCount: 0,
    },
    {
        username: 'velazquez',
        message: 'See you at the coffee shop ☕',
        time: 'Yesterday',
        avatar: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg',
        unreadCount: 1,
    },
    {
        username: 'barrera',
        message: 'Can we reschedule our meeting?',
        time: 'Monday',
        avatar: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg',
        unreadCount: 0,
    },
    {
        username: 'mikejohnson',
        message: 'Check out this new design 🎨',
        time: 'Monday',
        avatar: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg',
        unreadCount: 3,
    },
    {
        username: 'sarahwilliams',
        message: 'Happy birthday! 🎂',
        time: 'Sunday',
        avatar: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg',
        unreadCount: 0,
    },
    {
        username: 'davidchen',
        message: 'The project is almost done 💪',
        time: 'Saturday',
        avatar: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg',
        unreadCount: 0,
    },
    {
        username: 'emilybrown',
        message: 'LOL that was hilarious 😂',
        time: 'Dec 28',
        avatar: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg',
        unreadCount: 0,
    },
    {
        username: 'jameslee',
        message: 'Got the tickets! See you there 🎟️',
        time: 'Dec 27',
        avatar: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg',
        unreadCount: 5,
    },
    {
        username: 'oliviamartin',
        message: 'Sent you the documents via email',
        time: 'Dec 25',
        avatar: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg',
        unreadCount: 0,
    },

]

interface PreviewMessageListProps {
    username?: string;
    className?: string;
}


export default function PreviewMessageList({ username: activeChat, className }: PreviewMessageListProps) {
  return (
    <div className={className}>
      <div className='flex flex-col'>
        {messageList.map(({username, message, avatar}) => (
        <Link
            key={username}
            href={`/message/${username}`}
            className={cn(
                "hidden md:flex",
                "items-center gap-2 p-2 hover:bg-primary/20",
                username === activeChat && "bg-primary/10"
            )}
        >
            <div className="relative inline-block p-0.5 rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 via-rose-400 to-yellow-300">
                <Image
                    src={avatar}
                    alt={username}
                    className='object-cover rounded-full aspect-square'
                    width={50}
                    height={50}
                />
            </div>
            <div className="hidden xl:block flex-1 min-w-0">
                <h1 className="text-lg font-bold">{username}</h1>
                <span className="text-sm text-primary/60 line-clamp-1">{message}</span>
            </div>
        </Link>
        ))}
    </div>
    </div>
  )
}
