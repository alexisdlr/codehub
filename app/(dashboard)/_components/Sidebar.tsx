import Logo from "./Logo";
import SidebarRoutes from "./SidebarRoutes";

const SideBar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-4 w-full flex justify-center">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default SideBar;
