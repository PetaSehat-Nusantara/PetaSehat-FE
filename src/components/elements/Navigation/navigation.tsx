"use client"

import {
  Menu,
  ChevronDown,
  Home,
  BarChart3,
  Search,
  BookOpen,
  GraduationCap,
  LogIn,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarProvider } from "@/components/ui/sidebar"
import ModuleTransition from "../ModulTransition"
import type { SidebarLayoutProps } from "./interface"
import { useAuthUser } from "@/hooks/use-auth-user"
import LoginModal from "../AuthModal"
import SignOut from "../Buttons/SignOut"
import { SidebarCollapseProvider, useSidebarCollapse } from "./sidebarCollapse"

// --- Navbar with Sidebar ---
function AppNavbarWithSidebar() {
  const { user } = useAuthUser()

  return (
    <header className="h-16 flex items-center justify-between border-b border-ocean-100 bg-white/90 backdrop-blur-md px-4 md:px-6 transition-all duration-300 hover:bg-white/95 hover:shadow-lg w-full">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-ocean-grass-gradient shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
            <span className="text-sm font-bold text-white">P</span>
          </div>
          <span className="text-lg font-semibold bg-gradient-to-r from-ocean-600 to-grass-600 bg-clip-text text-transparent group-hover:from-ocean-700 group-hover:to-grass-700 transition-all duration-300">
            PetaSehat
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/featured"
            className="text-sm font-medium text-slate-600 hover:text-ocean-600 transition-all duration-300 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-ocean-500 hover:after:w-full after:transition-all after:duration-300"
          >
            Featured
          </Link>
        </nav>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-2 hover:bg-ocean-50 hover:scale-105 transition-all duration-300"
          >
            <div className="h-8 w-8 rounded-full bg-ocean-grass-gradient hover:shadow-md transition-all duration-300" />
            <span className="hidden md:inline text-sm font-medium">
              {user?.displayName || user?.email || "User Name"}
            </span>
            <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 border-ocean-100">
          <SignOut />
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

// --- Navbar without Sidebar ---
function AppNavbarWithoutSidebar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  return (
    <>
      <header className="flex h-16 w-full shrink-0 items-center justify-between border-b border-ocean-100 bg-white/90 backdrop-blur-md px-4 md:px-6 sticky top-0 z-50 transition-all duration-300 hover:bg-white/95 hover:shadow-lg">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-ocean-grass-gradient shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
              <span className="text-sm font-bold text-white">P</span>
            </div>
            <span className="text-lg font-semibold bg-gradient-to-r from-ocean-600 to-grass-600 bg-clip-text text-transparent group-hover:from-ocean-700 group-hover:to-grass-700 transition-all duration-300">
              PetaSehat
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsLoginModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-blue-400 hover:shadow-lg hover:shadow-blue-200/50 text-white hover:scale-105 transition-all duration-300"
          >
            <LogIn className="h-4 w-4" />
            <span className="hidden md:inline">Login</span>
          </Button>
        </div>
      </header>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  )
}

// --- Sidebar ---
export function AppSidebar() {
  const { collapsed, toggleCollapsed } = useSidebarCollapse()
  const pathname = usePathname()

  const menuItems = [
    {
      title: "Homepage",
      url: "/",
      icon: Home,
      matchPaths: ["/"], // Exact match for homepage
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: BarChart3,
      matchPaths: ["/dashboard"], // Dashboard route
    },
    {
      title: "NusaCari",
      url: "/nusa-cari",
      icon: Search,
      matchPaths: ["/nusa-cari"], // NusaCari routes
    },
    {
      title: "NusaSimulasi",
      url: "/nusa-simulasi",
      icon: BookOpen,
      matchPaths: ["/nusa-simulasi"], // NusaSimulasi routes
    },
    {
      title: "NusaLulus",
      url: "/nusa-lulus",
      icon: GraduationCap,
      matchPaths: ["/nusa-lulus"], // NusaLulus routes
    },
    // {
    //   title: "Bantuan",
    //   url: "/bantuan",
    //   icon: HelpCircle,
    //   matchPaths: ["/bantuan"], // Help routes
    // },
  ]

  // Function to check if a menu item is active
  const isMenuItemActive = (item: (typeof menuItems)[0]) => {
    // Special case: if current path is "/" and this is the Homepage item
    if (pathname === "/" && item.url === "/") {
      return true
    }

    // For other routes, check if pathname starts with any of the match paths
    return item.matchPaths.some((path) => {
      if (path === "/") return false // Don't match "/" for other items
      return pathname.startsWith(path)
    })
  }

  return (
    <div
      className={`fixed top-0 left-0 h-full z-40 border-r border-green-200/50 bg-gradient-to-br from-green-50 via-white to-blue-50 backdrop-blur-lg transition-all duration-300 shadow-xl ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-4 w-16 h-16 bg-green-200/30 rounded-full animate-pulse" />
        <div className="absolute bottom-20 left-4 w-12 h-12 bg-blue-200/30 rounded-full animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-2 w-8 h-8 bg-green-300/20 rounded-full animate-pulse delay-500" />
      </div>

      {/* Header */}
      <div className="relative border-b border-green-200/50 p-4 bg-gradient-to-r from-green-100/50 via-white/80 to-blue-100/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 shadow-md">
            </div>
            {!collapsed && (
              <span className="text-sm font-semibold bg-gradient-to-r from-green-700 to-blue-700 bg-clip-text text-transparent">
                PetaSehat Menu
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapsed}
            className="hover:bg-gradient-to-r hover:from-green-100 hover:to-blue-100 hover:scale-110 transition-all duration-300 rounded-xl group"
          >
            <Menu className="h-5 w-5 text-green-600 group-hover:text-blue-600 transition-colors" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>
      </div>

      {/* Menu Content */}
      <div className="relative bg-gradient-to-b from-transparent via-green-50/30 to-blue-50/30 h-full pt-6 pb-20">
        <div className="px-3 space-y-2">
          {menuItems.map((item) => {
            const isActive = isMenuItemActive(item)

            return (
              <Link
                key={item.title}
                href={item.url}
                className={`group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden ${
                  isActive
                    ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg"
                    : "hover:bg-gradient-to-r hover:from-green-100/80 hover:to-blue-100/80 text-slate-700 hover:text-slate-900"
                }`}
              >
                {/* Background animation for active item */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 opacity-20 animate-pulse" />
                )}

                <div
                  className={`relative z-10 p-1 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-white/20"
                      : "group-hover:bg-gradient-to-r group-hover:from-green-200 group-hover:to-blue-200"
                  }`}
                >
                  <item.icon
                    className={`h-4 w-4 transition-all duration-300 group-hover:scale-110 ${
                      isActive ? "text-white" : "text-green-600 group-hover:text-blue-600"
                    }`}
                  />
                </div>

                {!collapsed && (
                  <span
                    className={`relative z-10 font-medium transition-all duration-300 ${isActive ? "text-white" : ""}`}
                  >
                    {item.title}
                  </span>
                )}

                {/* Hover effect overlay */}
                {!isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-green-200/0 to-blue-200/0 group-hover:from-green-200/20 group-hover:to-blue-200/20 transition-all duration-300 rounded-xl" />
                )}
              </Link>
            )
          })}
        </div>

        {/* Bottom decorative element */}
        {!collapsed && (
          <div className="absolute bottom-6 left-3 right-3">
            <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-4 border border-green-200/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">P</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-green-700">PetaSehat</p>
                  <p className="text-xs text-blue-600">Healthcare Platform</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// --- Layout with Sidebar ---
function SidebarLayoutWithSidebar({ children }: SidebarLayoutProps) {
  const { collapsed } = useSidebarCollapse()
  const sidebarWidth = collapsed ? "4rem" : "16rem"

  return (
    <div className="min-h-screen flex">
      <AppSidebar />
      <div
        className="flex-1 min-h-screen flex flex-col transition-all duration-300"
        style={{
          marginLeft: sidebarWidth,
          width: `calc(100vw - ${sidebarWidth})`,
        }}
      >
        <AppNavbarWithSidebar />
        <main className="flex-1 w-full">
          <ModuleTransition>{children}</ModuleTransition>
        </main>
      </div>
    </div>
  )
}

// --- Main Layout ---
const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const { user } = useAuthUser()

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col">
        <AppNavbarWithoutSidebar />
        <main className="flex-1">
          <ModuleTransition>{children}</ModuleTransition>
        </main>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <SidebarCollapseProvider>
        <SidebarLayoutWithSidebar>{children}</SidebarLayoutWithSidebar>
      </SidebarCollapseProvider>
    </SidebarProvider>
  )
}

export default SidebarLayout
