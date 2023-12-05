import { getChapter } from "@/actions/getChapter";
import Banner from "@/components/Banner";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { VideoPlayer } from "./_components/VideoPlayer";
import { CourseEnrollButton } from "./_components/CourseEnrrollButton";

const ChapterPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) return redirect("/");

  const {
    chapter,
    course,
    nextChapter,
    purchase,
    muxData,
    attachments,
    userProgress,
  } = await getChapter({
    userId,
    courseId: params.courseId,
    chapterId: params.chapterId,
  });

  if (!chapter || !course ) return redirect("/");

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;
  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner
          variant={"success"}
          label="You already completed this chapter."
        />
      )}
      {isLocked && (
        <Banner
          variant={"warning"}
          label="You need purchase this course to watch this chapter"
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={chapter.id}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
            playbackId={muxData?.playbackId!}
          />
        </div>
        <div className="p-4 flex items-center justify-between flex-col md:flex-row">
          <h2 className="text-2xl font-semibold">{chapter.title}</h2>
          {
            purchase ? (
              //TODO: COURSE PROGRESSS BUTTON
              <p>purchased</p>
              ) : (<CourseEnrollButton price={course.price!} courseId={params.courseId} />)
          }
        </div>
      </div>
    </div>
  );
};

export default ChapterPage;
