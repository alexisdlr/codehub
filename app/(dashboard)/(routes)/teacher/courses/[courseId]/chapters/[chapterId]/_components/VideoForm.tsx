"use client";
import * as z from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ImageIcon, Pencil, PlusCircle, Video, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";
import Image from "next/image";
import FileUpload from "@/components/FileUpload";

interface VideoFormProps {
  initialData: Chapter & {muxData?: MuxData | null};
  courseId: string;
  chapterId: string
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

const VideoForm = ({ initialData, courseId, chapterId}: VideoFormProps) => {
  const router = useRouter();
  const [isEditting, setIsEdittting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: initialData?.videoUrl || "",
    },
  });
  const toggleEdit = () => setIsEdittting((current) => !current);
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      toast.loading("Updating");
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
      toast.remove();
      toast.success("Course Updated!");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.remove()
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter Video
        <Button variant={"ghost"} onClick={toggleEdit}>
          {isEditting && (
            <>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </>
          )}

          {!isEditting && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a Video
            </>
          )}
          {!isEditting && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit video
            </>
          )}
        </Button>
      </div>
      {!isEditting &&
        (!initialData.videoUrl ? (
          <div className="bg-slate-200 flex items-center justify-center h-60 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="aspect-video relative mt-1">
            Video uploaded
          </div>
        ))}

      {isEditting && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-sm text-muted-foreground mt-4">
            Upload this chapter&apos;s video
          </div>
        </div>
      )}
      {
        initialData.videoUrl && !isEditting && (
          <div className="text-xs text-muted-foreground mt-2">
            Videos can take a few minutes to process. 
            Refresh this page if video does not appear.
          </div>
        )
      }
    </div>
  );
};

export default VideoForm;
