import NavbarRoutes from "@/components/NavbarRoutes";
import { Chapter, Course, UserProgress } from "@prisma/client";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}
const CourseNavbar = ({ course, progressCount }: CourseNavbarProps) => {
  return (
    <div className="p-4 border-b flex items-center shadow-sm">
      <NavbarRoutes />
    </div>
  );
};

export default CourseNavbar;
