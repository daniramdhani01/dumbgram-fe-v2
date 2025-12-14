import PostGrid from "@/components/shared/PostGrid"
const url = "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/"
const list = [
  "image.jpg",
  "image-1.jpg",
  "image-2.jpg",
  "image-3.jpg",
  "image-4.jpg",
  "image-5.jpg",
  "image-6.jpg",
  "image-7.jpg",
  "image-8.jpg",
  "image-9.jpg",
  "image-10.jpg",
  "image-11.jpg",
]

function getListImage(list: string[], url: string) {
  return list.map(item => url + item)
}

export default function Feed() {
  const postList = getListImage(list, url)
  return (
    <>
      <PostGrid title={"Feed"} list={postList}/>
    </>
  )
}
