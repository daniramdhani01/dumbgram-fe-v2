'use client'
import { cn } from '@/lib/utils'
import { Compass, House, LogOut, SquarePen } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function ProfileNavigationMobile() {
    const pathname = usePathname()

  return (
    <div className='md:hidden flex items-center justify-around w-full px-2 py-2'>
      <Link
          href="/"
          className={cn(
            "flex flex-col items-center justify-center gap-1 p-3 rounded-lg transition-colors",
            pathname === "/" ? "text-primary" : "text-primary/60 hover:text-primary/80"
          )}
      >
          <House size={26} strokeWidth={pathname === "/" ? 2.5 : 2} />
      </Link>

      <Link
          href="/explore"
          className={cn(
            "flex flex-col items-center justify-center gap-1 p-3 rounded-lg transition-colors",
            pathname?.startsWith("/explore") ? "text-primary" : "text-primary/60 hover:text-primary/80"
          )}
      >
          <Compass size={26} strokeWidth={pathname?.startsWith("/explore") ? 2.5 : 2} />
      </Link>

      <Link
          href="/create-post"
          className="flex flex-col items-center justify-center gap-1 p-3 rounded-lg transition-colors text-primary/60 hover:text-primary/80"
      >
          <SquarePen size={26} strokeWidth={2} />
      </Link>

      <Link
          href="/edit-profile"
          className={cn(
            "flex flex-col items-center justify-center gap-1 p-3 rounded-lg transition-colors",
            pathname?.startsWith("/edit-profile") ? "text-primary" : "text-primary/60 hover:text-primary/80"
          )}
      >
          <div className={cn(
            'relative w-7 h-7 rounded-full overflow-hidden border-2 transition-colors',
            pathname?.startsWith("/profile") ? "border-primary" : "border-primary/60"
          )}>
              <Image
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
                  alt="Profile"
                  fill
                  className='object-cover'
              />
          </div>
      </Link>
    </div>
  )
}
