"use client";
import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface CourseSidebarItemProps {
  label: string;
  courseId: string;
  id: string;
  isComplete: boolean;
  isLocked: boolean;
}

const CourseSidebarItem = ({
  label,
  id,
  courseId,
  isComplete,
  isLocked,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname.includes(id);
  const Icon = isLocked ? Lock : isComplete ? CheckCircle : PlayCircle;

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-x-2 text-slate-500 pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20 text-sm font-[500]",
        isActive &&
          "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
        isComplete && "text-emerald-700 hover:text-emerald-700",
        isComplete && isActive && "bg-emerald-200/200"
      )}
    >
      <div className="flex items-center py-4 gap-x-2">
        <Icon
          size={22}
          className={cn("text-slate-500", isActive && "text-slate-700")}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
          isActive && 'opacity-100',
          isComplete && 'border-emerald-700'
        )}
      />
    </button>
  );
};

export default CourseSidebarItem;
