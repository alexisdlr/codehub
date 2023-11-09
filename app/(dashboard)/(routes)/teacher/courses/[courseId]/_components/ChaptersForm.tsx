"use client";
import * as z from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PlusCircle, X } from "lucide-react";
import { Chapter, Course } from "@prisma/client";

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
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import ChaptersList from "./ChaptersList";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "This field is required",
  }),
});

interface ChaptersFormProps {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
}

const ChaptersForm = ({ initialData, courseId }: ChaptersFormProps) => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  const toggleCreating = () => setIsCreating((current) => !current);
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      toast.loading("Creating");
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.remove();
      toast.success("Course Created!");
      toggleCreating();
      router.refresh();
    } catch (error) {
      toast.remove();
      toast.error("Something went wrong");
    }
  };
  const onReorder = async (updateData: {id: string, position: number}[]) => {
    try {
      setIsUpdating(true)
      toast.loading("Reording");
      await axios.put(`/api/courses/${courseId}/chapters/reorder`,{
        list: updateData
      })
      toast.remove();
      toast.success("Reordered!");
    } catch (error) {
      toast.error('Something went wrong')
    }
  }
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Chapters
        <Button variant={"ghost"} onClick={toggleCreating}>
          {isCreating ? (
            <>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a Chapter
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="e.g. Introduction to the course..."
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
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.chapters.length && "italic text-slate-500"
          )}
        >
          {!initialData.chapters.length && "No chapters"}
          <ChaptersList onEdit={() => {}} onReorder={onReorder} items={initialData.chapters || []} />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">Drag an drop to reorder</p>
      )}
    </div>
  );
};

export default ChaptersForm;
