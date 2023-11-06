"use client"
import { Chapter } from "@prisma/client"

interface ChaptersListProps {
  onEdit: (id: string) => void
  onReorder: (updateData: {id: string, position: number}[]) => void
  items: Chapter[]
}
export default function ChaptersList({
  items, 
  onEdit,
  onReorder
}: ChaptersListProps) {
  return (
    <div>ChaptersList</div>
  )
}
