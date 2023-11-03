"use client";
import * as z from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, X } from "lucide-react";
import { Course } from "@prisma/client";

import {
  Form,
  FormControl,
  FormItem,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  description: z.string().min(1, {
    message: "This field is required",
  }),
});

interface ChaptersFormProps {
  initialData: Course
  courseId: string;
}

const ChaptersForm = ({ initialData, courseId }: ChaptersFormProps) => {
  const router = useRouter();
  const [isEditting, setIsEdittting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData.description || ""
    },
  });
  const toggleEdit = () => setIsEdittting((current) => !current);
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      toast.loading('Updating')
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.remove()
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
        Course Description
        <Button variant={"ghost"} onClick={toggleEdit}>
          {isEditting ? (
            <>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Description
            </>
          )}
        </Button>
      </div>
      {!isEditting && <p className={cn("text-sm mt-2", !initialData.description && "text-slate-500 italic")}>{initialData.description || "No description"}</p>}
      {isEditting && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. This course is about..."
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ChaptersForm;
