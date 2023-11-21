import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

export async function DELETE (
  req: Request,
  {params}: {params: {courseId: string}}
) {
  
}

export async function PATCH(
  req: Request,
 { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const {courseId} = params
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if(!courseId) {
      return new NextResponse("Internal Error", {status: 500})
    }

    const course = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        ...values
      }
    });


    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}