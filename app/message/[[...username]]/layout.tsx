import LogoNavigation from "@/components/shared/LogoNavigation";
import PreviewMessageList from "@/features/message/components/PreviewMessageList";
import TopBar from "@/features/topbar/components";
import { cn } from "@/lib/utils";

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    username?: string[]  // Array karena catch-all
  }>
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { username } = await params
  return (
    <div className="flex justify-center">
      <aside className={cn(
            // visibility
            "hidden md:flex xl:block",
    
            // position & layer
            "fixed left-0 top-0 h-screen z-50 md:justify-center",
    
            // width (responsive)
            "md:w-20 xl:w-80",
    
            // appearance
            "bg-background border-r",
    
            // behavior
            "overflow-y-auto"
            )}>
              <LogoNavigation className='hidden xl:block xl:px-2 xl:mb-2 xl:pt-4'/>
              <PreviewMessageList
                username={username?.[0]}
                className={cn(
                  "md:h-[calc(100%)] xl:h-[calc(100%-41px)]",
                  "overflow-scroll"
                )}/>
        </aside>
      <main className="w-full max-w-7xl p-4 md:ml-24 xl:ml-84">
        <TopBar/>
        {children}
      </main>
    </div>
  );
}
