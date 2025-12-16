import ProfileBar from "@/features/ProfileBar/components";
import TopBar from "@/features/topbar/components";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center">
      <ProfileBar/>
      <main className="w-full max-w-7xl p-4 md:ml-24 xl:ml-84">
        <TopBar/>
        {children}
      </main>
    </div>
  );
}
