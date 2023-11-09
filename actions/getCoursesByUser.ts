import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
const getCoursesByUser = async () => {
  const {userId} = auth()

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const courses = await db.course.findMany({
    where: {
      userId
    }
  })

  return {courses}

}

export default getCoursesByUser