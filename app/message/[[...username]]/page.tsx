import RoomMessage from "@/features/message/components/RoomMessage"

interface PageProps {
  params: Promise<{
    username?: string[]  // Array karena catch-all
  }>
}

export default async function page({ params }: PageProps) {
  const { username } = await params

  return (
    <RoomMessage username={username?.[0]}/>
  )
}