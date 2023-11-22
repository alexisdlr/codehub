import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface ChapterActionsProps {
  disabled: boolean;
  isPublished: boolean;
  courseId: string;
  chapterId: string;
}
const ChapterActions = ({
  isPublished,
  disabled,
  courseId,
  chapterId,
}: ChapterActionsProps) => {
  return (
    <div className="flex items-center gap-x-2">
      <Button disabled={disabled} variant={"outline"} size={"sm"}>
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <Button variant={"destructive"} size={"sm"}>
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ChapterActions;
