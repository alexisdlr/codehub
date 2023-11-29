"use client";
import { IconBadge } from "@/components/IconBadge";
import { formatPrice } from "@/lib/formatPrice";
import { Category, Course } from "@prisma/client";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type CourseWithCategoryWithProgress = Course & {
  category: Category | null;
  progress: number | null;
  chapters: { id: string }[];
};
interface CourseCardProps {
  item: CourseWithCategoryWithProgress;
}
const CourseCard = ({ item }: CourseCardProps) => {
  return (
    <Link href={`/courses/${item.id}`}>
      <div className="group h-full border hover:shadow-md transition overflow-hidden rounded-lg p-3">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image src={item.imageUrl || ""} alt="Image course" className="object-cover" fill />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {item.title}
          </div>
          <p className="text-muted-foreground text-sm">
            {item.category?.name}
          </p>
          <div className="my-3 text-sm md:text-xs flex items-center gap-x-1 text-slate-500">
            <IconBadge size={'sm'} icon={BookOpen} />
            {
              `${item.chapters.length} Chapters`
            }
          </div>
          {
            item.progress !== null ? (
              <div>
                TODO: PROGRESS COMPONENT
              </div>
            ): (
              <p className="text-md md:text-sm text-slate-700">{formatPrice(item.price!)}</p>
            )
          }
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
