"use client";
import { Category, Course } from "@prisma/client";

type CourseWithCategoryWithProgress = Course & {
  category: Category | null;
  progress: number | null;
  chapters: { id: string }[];
};
interface CourseItemProps {
  item: CourseWithCategoryWithProgress;
}
const CourseItem = ({ item }: CourseItemProps) => {
  return <div>{item.title}</div>;
};

export default CourseItem;
