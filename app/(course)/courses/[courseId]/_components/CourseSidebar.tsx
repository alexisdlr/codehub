import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import CourseSidebarItem from "./CourseSidebarItem";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progress: number;
}
const CourseSidebar = async ({ course, progress }: CourseSidebarProps) => {
  const { userId } = auth();

  if (!userId) redirect("/");

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });

  return (
    <div className="flex flex-col h-full border-r shadow-sm overflow-y-auto">
      <div className="flex flex-col p-8 border-b">
        <h1 className="font-semibold">{course.title}</h1>
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            label={chapter.title}
            id={chapter.id}
            isComplete={!!chapter.userProgress?.[0]?.isCompleted}
            isLocked={!chapter.isFree && !purchase}
            courseId={course.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;
