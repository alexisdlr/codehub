"use client";
import * as z from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { File, Loader2, PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
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
  const [deletingId, setDeletingId] = useState<string | null>(null)
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

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id)
      toast.loading("Updating");
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`)
      toast.remove();
      toast.success('Attachment deleted')
      router.refresh()
    } catch (error) {
      toast.remove();
      toast.error('Something went wrong')
    } finally {
      setDeletingId(null)
    }
  }
  
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
          {
            initialData.attachments.length > 0 && (
              <div className="space-y-2">
                {
                  initialData.attachments.map(attachment => (
                    <div 
                      key={attachment.id}
                      className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                    >
                      <File className="w-4 h-4 mr-2 flex-shrink-0" />
                      <p className="text-xs line-clamp-1">
                        {attachment.name}
                      </p>
                      {
                        deletingId === attachment.id && (
                          <div className="ml-auto">
                            <Loader2 className="h-4 w-4 animate-spin" />
                          </div>
                        )
                      }
                       {
                        deletingId !== attachment.id && (
                          <button onClick={() => onDelete(attachment.id)} className='ml-auto hover:opacity-75 transition'>
                            <X className="h-4 w-4 " />
                          </button>
                        )
                      }
                    </div>
                  ))
                }
              </div>
            )
          }
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
