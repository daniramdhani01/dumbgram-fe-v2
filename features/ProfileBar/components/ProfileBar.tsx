import { SquarePen } from 'lucide-react'
import Image from 'next/image'
import LogoNavigation from '@/components/shared/LogoNavigation'
import { Button } from '@/components/ui/button'
import ProfileStats from './ProfileStats'
import ProfileNavigationMobile from './ProfileNavigationMobile'
import ProfileNavigationWideScreen from './ProfileNavigationWideScreen'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function ProfileBar() {
  return (
    <>
      {/* Mobile Bottom Navigation - Instagram style */}
      <nav 
        className={cn(
          // visibility
          "md:hidden",

          // position & layer
          "fixed bottom-0 left-0 right-0 z-100",

          // appearance
          "bg-background/95 backdrop-blur-sm border-t",

          // safe area (iOS)
          "safe-area-inset-bottom"
        )}
      >
        <ProfileNavigationMobile />
      </nav>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          // visibility
          "hidden md:flex xl:block",

          // position & layer
          "fixed left-0 top-0 h-screen z-50 md:justify-center",

          // width (responsive)
          "md:w-20 xl:w-80",

          // appearance
          "bg-background border-r",

          // spacing & behavior
          "p-4 xl:pe-8 overflow-y-auto"
        )}

        >
          {/* Logo */}
          <LogoNavigation className='hidden xl:block'/>

          {/* Edit Profile */}
          <div className='hidden xl:flex justify-end'>
            <Link href="/edit-profile">
              <Button variant="outline" size="icon">
                  <SquarePen />
              </Button>
            </Link>
          </div>

          {/* Profile Photo */}
          <div className="hidden xl:block text-center">
              <div className='relative inline-block p-1 rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 via-rose-400 to-yellow-300'>
                  <Image
                      src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
                      alt="my photo profile"
                      className='object-cover rounded-full aspect-square'
                      width={144}
                      height={144}
                  />
              </div>
              <h1 className="text-2xl font-bold">Lisa</h1>
              <span className="text-sm text-primary/60">@lalalisa_m</span>
          </div>

          <ProfileStats followers={51} following={1} post={200} className='hidden xl:flex'/>

          <p className='hidden xl:block text-sm text-center'>Rapper in Black Pink, Brand Ambasador Penshoppe</p>

          <ProfileNavigationWideScreen/>
      </aside>
    </>
  )
}
