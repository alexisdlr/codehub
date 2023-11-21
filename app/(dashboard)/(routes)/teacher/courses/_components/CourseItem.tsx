"use client"
import IconButton from "@/components/IconButton"
import { cn } from "@/lib/utils"
import { Chapter, Course } from "@prisma/client"
import { Pencil, X } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import axios from 'axios'
import toast from "react-hot-toast"

interface CourseItemProps {
  item: Course & {chapters: Chapter[]}
}
export default function CourseItem({item}: CourseItemProps ) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/teacher/courses/${item.id}`);
  };
  const handleDelete = async () => {
    try {
      toast.loading('Deleting')
      await axios.delete(`/api/courses/${item.id}`)
      toast.remove()
      toast.success('Course deleted')
    } catch (error) {
      toast.error('Something went wrong')
    }

  }
  return (
    <div className="bg-white border group cursor-pointer rounded-xl p-3 space-y-4">
          <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={item.imageUrl || ''}
          fill
          alt="course"
          className="aspect-square object-contain rounded-md "
        />
        <div className="opacity-0 group-hover:opacity-100 w-full px-6 absolute bottom-5 transition">
          <div className="flex gap-x-6 justify-center">
          <IconButton
              icon={
                <Pencil
                  size={20}
                  className="text-gray-600"
                />
              }
              onClick={handleClick}
            />
            <IconButton
              icon={<X size={20} className="text-red-600" />}
              onClick={handleDelete}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <p className="font-semibold text-md">{item.title}</p>
        <p className={cn('mt-2 text-sm text-gray-500 truncate', !item.description && 'italic')}>{item.description || 'No description'}</p>
        <p className={cn('mt-2 text-sm justify-self-end text-gray-500 truncate', !item.chapters && 'italic')}>{item.chapters.length ? `${item.chapters.length} Chapters` : 'No Chapters'}</p>
      </div>
    </div>
  )
}
