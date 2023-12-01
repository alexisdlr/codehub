import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const CoursePage = async ({params}: {params: {courseId: string}}) => {
  const course = await db.course.findFirst({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: 'asc'
        }
      }
    }
  })
  if(!course) return redirect('/')
  
  return redirect(`/courses/${params.courseId}/chapters/${course.chapters[0].id}`);
}
 
export default CoursePage;