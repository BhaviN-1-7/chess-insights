import { 
  LayoutDashboard, 
  BookOpen, 
  Clock, 
  MoveHorizontal, 
  TrendingUp, 
  Zap,
  Sparkles,
  Users
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Overview", url: "/", icon: LayoutDashboard },
  { title: "Predict", url: "/predict", icon: Sparkles },
  { title: "Player Styles", url: "/styles", icon: Users },
  { title: "Openings", url: "/openings", icon: BookOpen },
  { title: "Time Control", url: "/time-control", icon: Clock },
  { title: "Game Length", url: "/game-length", icon: MoveHorizontal },
  { title: "Rating Impact", url: "/rating-impact", icon: TrendingUp },
  { title: "Advanced", url: "/advanced", icon: Zap },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <div className="p-4 flex items-center gap-3">
        <span className="text-2xl">♚</span>
        {!collapsed && (
          <h1 className="font-display text-sm font-bold text-gradient-gold tracking-wider">
            CHESS INSIGHT
          </h1>
        )}
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}