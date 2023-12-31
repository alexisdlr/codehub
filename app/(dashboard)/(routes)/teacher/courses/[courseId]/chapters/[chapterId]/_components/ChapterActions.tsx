"use client";

import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

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
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

  const onPublish = async () => {
    try {
      setIsLoading(true);
      toast.loading("Publishing");
      if(isPublished) {
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`);
        toast.remove();
        toast.success("Chapter Unpublished!");
      } else {
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`);
        toast.remove();
        toast.success("Chapter Published!");
      }
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong')
    } finally{
      setIsLoading(false)
    }
  }
  const onDelete = async () => {
    try {
      setIsLoading(true);
      toast.loading("deleting");
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
      toast.remove();
      toast.success("Chapter Deleted!");
      router.push(`/teacher/courses/${courseId}`)
    } catch (error) {
      toast.remove();
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center gap-x-2">
      <Button disabled={disabled} variant={"outline"} size={"sm"} onClick={onPublish}>
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button variant={"destructive"} size={"sm"} disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default ChapterActions;
