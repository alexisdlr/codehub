import { Course } from "@prisma/client"
import CourseItem from "./CourseItem"

interface CoursesListProps {
  items: Course[]
}

export default function CoursesList({items}: CoursesListProps) {
  return (
    <div className="w-full mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {
        items.map((course) => (
         <CourseItem item={course} key={course.id} />
        ))
      }
    </div>
  )
}
