import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ChapterPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if(!userId) return redirect('/')

  
  return <div>chapter</div>;
};

export default ChapterPage;
