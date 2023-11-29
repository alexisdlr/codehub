import { Category, Course } from "@prisma/client";
import { db } from "@/lib/db";
import { getUserProgress } from "./getUserProgress";

type CourseWithCategoryWithProgress = Course & {
  category: Category | null;
  progress: number | null;
  chapters: { id: string }[];
};
type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getCourses = async ({
  userId,
  title,
  categoryId,
}: GetCourses): Promise<CourseWithCategoryWithProgress[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchases: {
          where: {
            userId
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    const coursesWithProgress: CourseWithCategoryWithProgress[] = await Promise.all(courses.map(async course => {
      if(course.purchases.length === 0) {
        return {
          ...course, 
          progress: null
        }
      }
      const progressPercentage = await getUserProgress(userId, course.id)
      return {
        ...course, 
        progress: progressPercentage
      }
    }))

    return coursesWithProgress
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
};
