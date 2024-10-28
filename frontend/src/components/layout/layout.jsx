import { Outlet } from "react-router-dom";
import { SideBar } from "../sidebar/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const Layout = () => {
  return (
    <div className="w-screen h-screen flex">
      <SidebarProvider className="w-100">
        <SideBar />
        {/* <SidebarTrigger className="block md:hidden" /> */}
      </SidebarProvider>
      <main className="w-screen p-2.5">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
