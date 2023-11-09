import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import CoursesList from "./_components/CoursesList";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const CoursesPage = async () => {
  const { userId } = auth();
  if(!userId) {
    redirect('/')
  }
  const coursesByUser = await db.course.findMany({
    where: {
    userId,
    },
  });
  return (
    <div className="p-6">
      <div className="flex items-start">
        <div>
          <h2 className="text-slate-800 text-4xl font-bold">Welcome Teacher</h2>
          <p className="mt-2">Create a course or manage them</p>
        </div>
        <Link href="/teacher/create" className="ml-auto">
          <Button>New course</Button>
        </Link>
      </div>
      <CoursesList items={coursesByUser} />
    </div>
  );
};

export default CoursesPage;
