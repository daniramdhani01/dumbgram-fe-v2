import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import PostCard from "./PostCard"

type PostGridProps = {
    title: string;
    list: string[];
    isMobile: boolean;
}

const isLoading = false

// Distribute items into 3 columns horizontally (1,2,3 then 4,5,6 etc)
function distributeToColumns<T>(items: T[], columnCount: number = 3): T[][] {
  const columns: T[][] = Array.from({ length: columnCount }, () => []);

  items.forEach((item, index) => {
    const columnIndex = index % columnCount;
    columns[columnIndex].push(item);
  });

  return columns;
}

// Skeleton loading component
function SkeletonCard({ index }: { index: number }) {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className={cn(
        (index + 1) % 2 === 1 ? "h-[125px]" : "h-[300px]",
        "w-full rounded-xl"
      )}/>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
  );
}

// Post card component wrapper
function Post({ item }: { item: string }) {
  return (
    <PostCard
      image={item}
      ownerImage={item}
      username="zayn"
      like={200}
    />
  );
}

export default function PostGrid({list, title, isMobile}: PostGridProps) {
  const columns = distributeToColumns(list, 3);

  return (
    <div className="mt-8">
      <h1 className="hidden md:flex text-4xl mb-4">{title}</h1>

      {isMobile ? (
        // Mobile: single column
        <div className="flex flex-col gap-2">
          {list.map((item, idx) =>
            isLoading ? (
              <SkeletonCard key={item} index={idx} />
            ) : (
              <Post key={item} item={item} />
            )
          )}
        </div>
      ) : (
        // Desktop: 3 column masonry - items flow horizontally
        <div className="grid grid-cols-3 gap-2">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-2">
              {column.map((item, idx) =>
                isLoading ? (
                  <SkeletonCard key={item} index={columnIndex + idx} />
                ) : (
                  <Post key={item} item={item} />
                )
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
