import ProfileBar from "@/features/ProfileBar/components";
import TopBar from "@/features/topbar/components";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <ProfileBar/>
      <main className="w-full p-4 md:pl-24 xl:pl-84">
        <TopBar/>
        {children}
      </main>
    </div>
  );
}
