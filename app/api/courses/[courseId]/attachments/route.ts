import { NextResponse } from "next/server"

export async function POST(
  req: Request,
  params: {params: {courseId: string}}
) {
  try {
    
  } catch (error) {
    console.log('COURSE_ID_ATTACHMENTS',error)
    return new NextResponse('Internal Error', {status: 500})
  }
}