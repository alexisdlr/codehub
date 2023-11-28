import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();

    if(!userId) {
      return new NextResponse('Unauthorized', {status: 500})
    }
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId
      },
      include: {
        chapters: {
          include: {
            muxData: true
          }
        }
      }
    })
    if(!course) {
      return new NextResponse('Course not found', {status: 500})
    }
   
    const hasPublishedChapters = course.chapters.some(chapter => chapter.isPublished)
    if(!hasPublishedChapters || !course.title || !course.description || !course.imageUrl || !course.price || !course.categoryId) {
      return new NextResponse('Missing fields required', {status: 500})
    }
   
    const coursePublished = await db.course.update({
      where: {
        id: params.courseId,
        userId
      },
      data: {
        isPublished: true
      }
    })
    return NextResponse.json(coursePublished)
  } catch (error) {
    console.log('CHAPTER_ID_PUBLISH', error)
    return new NextResponse('Internal Error', {status: 500})
  }
}
