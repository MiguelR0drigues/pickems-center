import { Skeleton } from "../../ui/skeleton";

const ItemSkeleton = () => (
  <Skeleton className="country max-h-16 flex justify-between items-center sm:h-24 rounded bg-neutral-700" />
);

const PickemsSkeleton = () => {
  return (
    <div className="flex flex-wrap flex-row gap-8 justify-center items-center w-full overflow-hidden">
      <div className="min-h-14 min-w-[270px] sm:min-w-[400px] flex flex-col gap-[2px]">
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
      </div>
      <div className="min-h-14 min-w-[270px] sm:min-w-[400px] flex flex-col gap-[2px]">
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
      </div>
      <div className="min-h-14 min-w-[270px] sm:min-w-[400px] flex flex-col gap-[2px]">
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
      </div>
      <div className="min-h-14 min-w-[270px] sm:min-w-[400px] flex flex-col gap-[2px]">
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
      </div>
      <div className="min-h-14 min-w-[270px] sm:min-w-[400px] flex flex-col gap-[2px]">
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
      </div>
      <div className="min-h-14 min-w-[270px] sm:min-w-[400px] flex flex-col gap-[2px]">
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
        <ItemSkeleton />
      </div>
    </div>
  );
};

export default PickemsSkeleton;
