import { Link, useLocation } from "react-router-dom";
import { GlobalContext } from "../../context/globalStore";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import avatarImg from "../../assets/avatar.png";
import { IoLogOut } from "react-icons/io5";
import navigationMenuItems from "../../utils/navigationMenu";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Separator } from "../ui/separator";
import { useContext } from "react";

export function SideBar() {
  const { logout } = useContext(GlobalContext);
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <Sidebar variant="floating" collapsible="icon">
      {/* Header */}
      <SidebarHeader className="flex flex-row items-center ">
        <Avatar>
          <AvatarImage src={avatarImg} />
        </Avatar>
        <span className="font-bold">Hello User</span>
      </SidebarHeader>
      <Separator orientation="horizontal" />
      {/* Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationMenuItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.url}
                        className={`flex items-center ${
                          isActive ? "text-red-300" : "text-black"
                        }`}
                      >
                        {item.icon && <item.icon className="mr-2" />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Separator orientation="horizontal" />
      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="#" className="flex items-center">
                <IoLogOut />
                <button  onClick={handleLogout}>Sign Out</button>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
