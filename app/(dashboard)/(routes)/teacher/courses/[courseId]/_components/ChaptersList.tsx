import { Chapter } from "@prisma/client"

interface ChaptersListProps {
  onEdit: () => void
  onReorder: () => void
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
