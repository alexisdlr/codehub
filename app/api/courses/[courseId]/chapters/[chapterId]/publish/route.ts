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
    const ownerCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId
      }
    })
    if(!ownerCourse) {
      return new NextResponse('Course not found', {status: 500})
    }
    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId
      }
    })
    const muxData = await db.muxData.findUnique({
      where: {
        chapterId: params.chapterId
      }
    })

    if(!chapter || !muxData || !chapter.title || !chapter.description || !chapter.videoUrl) {
      return new NextResponse('Missing required fields', {status: 400})
    }
    const chapterUpdated = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId
      },
      data: {
        isPublished: true
      }
    })
    return NextResponse.json(chapterUpdated)
  } catch (error) {
    console.log('CHAPTER_ID_PUBLISH', error)
    return new NextResponse('Internal Error', {status: 500})
  }
}
