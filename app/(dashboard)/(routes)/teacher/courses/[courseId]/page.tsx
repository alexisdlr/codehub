import { IconBadge } from "@/components/IconBadge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageForm";
import CategoryForm from "./_components/CategoryForm";
import PriceForm from "./_components/PriceForm";
import AttachmentForm from "./_components/AttachmentForm";
import ChaptersForm from "./_components/ChaptersForm";

const CoursePage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  if (!userId) return redirect("/");

  const existingCourse = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!existingCourse) return redirect("/teacher/courses");

  const requiredFields = [
    existingCourse.title,
    existingCourse.description,
    existingCourse.categoryId,
    existingCourse.imageUrl,
    existingCourse.price,
    existingCourse.chapters.some(chapter => chapter.isPublished)
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
          <CategoryForm
            initialData={existingCourse}
            courseId={existingCourse.id}
            options={categories.map((cat) => ({
              label: cat.name,
              value: cat.id,
            }))}
          />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2 className="text-xl">Course Chapters</h2>
            </div>
            <ChaptersForm
              initialData={existingCourse}
              courseId={existingCourse.id}
            />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={CircleDollarSign} />
              <h2 className="text-xl">Sell your course</h2>
            </div>
            <PriceForm
              initialData={existingCourse}
              courseId={existingCourse.id}
            />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={File} />
              <h2 className="text-xl">Resources & Attachments</h2>
            </div>
            <AttachmentForm
              initialData={existingCourse}
              courseId={existingCourse.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
