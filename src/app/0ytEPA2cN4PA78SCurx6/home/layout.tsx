
import { NavBar } from "@/components/Navbar";
import SidebarMenu from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex">
      <SidebarMenu />
      <div className="flex flex-col w-full">
        <NavBar />
        <main className="flex-1 p-4 bg-gray-200">{children}</main>
      </div>
    </div>
  )
}