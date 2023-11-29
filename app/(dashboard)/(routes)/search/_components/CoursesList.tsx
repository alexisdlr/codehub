import { Category, Course } from "@prisma/client";
import CourseCard from "./CourseCard";

type CourseWithCategoryWithProgress = Course & {
  category: Category | null;
  progress: number | null;
  chapters: { id: string }[];
};
interface CoursesListProps {
  items: CourseWithCategoryWithProgress[];
}

export default function CoursesList({ items }: CoursesListProps) {
  return (
    <div>
      <div className="w-full mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((course) => (
          <CourseCard item={course} key={course.id} />
        ))}
      </div>
      {items.length === 0 && (
        <div className="flex justify-center text-muted-foreground">
          No courses found.{" "}
        </div>
      )}
    </div>
  );
}
