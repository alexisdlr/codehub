import { auth } from "@clerk/nextjs";
import CoursesList from "./_components/CoursesList";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { columns } from "./_components/Columns";
import { DataTable } from "./_components/DataTable";

const CoursesPage = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }
  const coursesByUser = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  return (
    <div className="p-6">
      <div className="flex items-start">
        <div>
          <h2 className="text-slate-800 text-4xl font-bold">Welcome Teacher</h2>
          <p className="mt-2">Create a course or manage them</p>
        </div>
      </div>
      <CoursesList items={coursesByUser} />
      <div className="my-10">
        <div>
          <h2 className="text-slate-800 text-4xl font-bold mb-3">
            Manage your Courses
          </h2>
        </div>
        <DataTable columns={columns} data={coursesByUser} />
      </div>
    </div>
  );
};

export default CoursesPage;
