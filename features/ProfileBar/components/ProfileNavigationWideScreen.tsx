'use client'
import { cn } from '@/lib/utils'
import { Compass, House, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function ProfileNavigationWideScreen() {
    const pathname = usePathname()

  return (
    <div className='hidden md:flex md:mt-10 xl:py-4 my-4 flex-col gap-8 xl:gap-4'>
      <Link
          href="/"
          className={cn(
            "flex items-center gap-3",
            pathname === "/" ? "text-primary font-semibold" : "text-primary/60"
          )}
      >
          <House className="inline"/>
          <span className='hidden xl:inline'>Feed</span>
      </Link>
      <Link
          href="/explore"
          className={cn(
            "flex items-center gap-3",
            pathname?.startsWith("/explore") ? "text-primary font-semibold" : "text-primary/60"
          )}
      >
          <Compass className="inline"/>
          <span className='hidden xl:inline'>Explore</span>
      </Link>

      <hr className='hidden xl:block'/>

    <Link href="/auth" className='text-primary/60 flex items-center gap-3'>
      <LogOut className='inline'/>
      <span className='hidden xl:inline'>Logout</span>
    </Link>
    </div>
  )
}
