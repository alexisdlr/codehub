import { IconBadge } from "@/components/IconBadge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageForm";

const CoursePage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  if (!userId) return redirect("/");

  const existingCourse = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
  });
  if (!existingCourse) return redirect("/teacher/courses");

  const requiredFields = [
    existingCourse.title,
    existingCourse.description,
    existingCourse.categoryId,
    existingCourse.imageUrl,
    existingCourse.price,
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields} / ${totalFields})`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course Setup</h1>
          <span className="text-sm text-slate-700">
            Complete all fields {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your Course</h2>
          </div>
          <TitleForm 
            initialData={existingCourse}
            courseId={existingCourse.id}
          />
           <DescriptionForm
            initialData={existingCourse}
            courseId={existingCourse.id}
          />
           <ImageForm
            initialData={existingCourse}
            courseId={existingCourse.id}
          />
        </div>

      </div>
    </div>
  );
};

export default CoursePage;
