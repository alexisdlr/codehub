"use client";
import * as z from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ImageIcon, Pencil, PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import Image from "next/image";
import FileUpload from "@/components/FileUpload";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
  const router = useRouter();
  const [isEditting, setIsEdittting] = useState(false);
  const toggleEdit = () => setIsEdittting((current) => !current);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      toast.loading("Updating");
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.remove();
      toast.success("Course Updated!");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.remove();
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Attachments
        <Button variant={"ghost"} onClick={toggleEdit}>
          {isEditting && (
            <>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </>
          )}

          {!isEditting && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a File
            </>
          )}
        </Button>
      </div>
      {!isEditting && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachments yes
            </p>
          )}
        </>
      )}

      {isEditting && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-sm text-muted-foreground mt-4">
            Add anything your students might need to complete your course
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
