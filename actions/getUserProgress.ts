import { db } from "@/lib/db";

export const getUserProgress = async (
  userId: string,
  courseId: string
): Promise<number> => {
  try {
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });

    const publishedChaptersId = publishedChapters.map((chapter) => chapter.id);
    const validCompleteChapters = await db.userProgress.count({
      where: {
        userId,
        chapterId: {
          in: publishedChaptersId,
        },
        isCompleted: true,
      },
    });
    const progressPercentage =
      (validCompleteChapters / publishedChaptersId.length) * 100;
    return progressPercentage;
  } catch (error) {
    console.log("[USER_PROGRESS_GET]", error);
    return 0;
  }
};
