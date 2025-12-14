import Image from 'next/image'
import { Heart, MessageCircle, Send } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type UserPostProps = {
    image: string;
    ownerImage: string;
    username: string;
    like: number
}

export default function PostCard({image, ownerImage, username, like}: UserPostProps) {
  return (
    <Card className='flex flex-col gap-2 break-inside-avoid pt-0 pb-2 border-2'>
        <Image
            src={image}
            alt="user post"
            width={500}
            height={500}
            className='rounded-t-xl w-full h-auto'
        />

        <div className='flex justify-between px-2'>
            <div className='flex align-middle gap-3'>
                <div>
                    <div className='relative inline-block p-0.5 rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 via-rose-400 to-yellow-300 '>
                        <Image
                            src={ownerImage}
                            alt="owner picture"
                            className='object-cover rounded-full aspect-square'
                            width={26}
                            height={26}
                        />
                    </div>
                </div>
                <span className='block'>{username}</span>
            </div>

            <div className='flex gap-1'>
                <Button variant="outline" size="icon">
                    <Heart className='bg-da'/>
                </Button>
                <Button variant="outline" size="icon">
                    <MessageCircle />
                </Button>
                <Button variant="outline" size="icon">
                    <Send />
                </Button>
            </div>
        </div>
        <span className='block text-end pe-2'>{like} Like</span>
    </Card>
  )
}
