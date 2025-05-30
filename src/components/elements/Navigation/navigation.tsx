'use client';
import {
  Menu,
  ChevronDown,
  Home,
  BarChart3,
  Search,
  BookOpen,
  GraduationCap,
  HelpCircle,
  ChevronLeft,
  Instagram,
  Twitter,
  Youtube,
  Facebook,
  Linkedin,
  LogIn,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
  SidebarProvider,
  SidebarInset,
} from '@/components/ui/sidebar';
import ModuleTransition from '../ModulTransition';
import { SidebarLayoutProps } from './interface';
import { useAuthUser } from '@/hooks/use-auth-user';
import LoginModal from '../AuthModal';
import SignOut from '../Buttons/SignOut';

// Navbar untuk user yang sudah login (dengan sidebar context)
function AppNavbarWithSidebar() {
  const { toggleSidebar } = useSidebar();
  const { user } = useAuthUser();

  return (
    <header className="flex h-16 w-full shrink-0 items-center justify-between border-b border-ocean-100 bg-white/90 backdrop-blur-md px-4 md:px-6 sticky top-0 z-50 transition-all duration-300 hover:bg-white/95 hover:shadow-lg">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="md:hidden hover:bg-ocean-50 hover:scale-110 transition-all duration-300"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>

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
              {user?.displayName || user?.email || 'User Name'}
            </span>
            <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 border-ocean-100">
          <DropdownMenuItem className="hover:bg-ocean-50 transition-colors">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-ocean-50 transition-colors">
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-ocean-50 transition-colors">
            Help
          </DropdownMenuItem>
          <SignOut />
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

function AppNavbarWithoutSidebar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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

      {/* Modal rendered at the document body level */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}

// Sidebar Component
export function AppSidebar() {
  const menuItems = [
    {
      title: 'Rumah Sakit Depok',
      url: '/rumah-sakit',
      icon: Home,
      isActive: false,
    },
    {
      title: 'Rangkuman',
      url: '/rangkuman',
      icon: BarChart3,
      isActive: false,
    },
    {
      title: 'NusaCari',
      url: '/nusacari',
      icon: Search,
      isActive: true,
    },
    {
      title: 'NusaSimulasi',
      url: '/nusasimulasi',
      icon: BookOpen,
      isActive: false,
    },
    {
      title: 'NusaLulus',
      url: '/nusalulus',
      icon: GraduationCap,
      isActive: false,
    },
    {
      title: 'Bantuan',
      url: '/bantuan',
      icon: HelpCircle,
      isActive: false,
    },
  ];

  return (
    <Sidebar className="border-r border-ocean-100 bg-gradient-to-b from-ocean-50/50 to-grass-50/30">
      <SidebarHeader className="border-b border-ocean-100 p-4 hover:bg-ocean-50/50 transition-colors duration-300">
        <div className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4 text-slate-500 hover:text-ocean-600 transition-colors" />
          <span className="text-sm font-medium text-slate-700">
            Rumah Sakit Depok
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    className="w-full justify-start hover:scale-105 transition-all duration-300 hover:shadow-md"
                  >
                    <Link
                      href={item.url}
                      className="flex items-center gap-3 px-3 py-2"
                    >
                      <item.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                      <span>{item.title}</span>
                    </Link>
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

// Footer Component
export function AppFooter() {
  return (
    <footer className="border-t border-ocean-100 bg-gradient-to-r from-ocean-50/50 to-grass-50/50">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-ocean-grass-gradient shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
            <span className="text-sm font-bold text-white">P</span>
          </div>
          <span className="text-lg font-semibold bg-gradient-to-r from-ocean-600 to-grass-600 bg-clip-text text-transparent">
            PetaSehat
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-600">
            © 2026 DDOS. All rights reserved.
          </span>

          <div className="flex items-center gap-3">
            {[Instagram, Twitter, Youtube, Facebook, Linkedin].map(
              (Icon, index) => (
                <Link
                  key={index}
                  href="#"
                  className="text-slate-400 hover:text-ocean-600 transition-all duration-300 hover:scale-125 hover:rotate-12"
                  aria-label={Icon.name}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const { user } = useAuthUser();

  if (!user) {
    // When user is null, don't show sidebar - just navbar, content, and footer
    return (
      <div className="flex min-h-screen w-full flex-col">
        <AppNavbarWithoutSidebar />
        <main className="flex-1 w-full">
          <ModuleTransition>{children}</ModuleTransition>
        </main>
        <AppFooter />
      </div>
    );
  }

  // When user exists, show the full sidebar layout
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex flex-1 flex-col">
          <AppNavbarWithSidebar />
          <main className="w-full">
            <ModuleTransition>{children}</ModuleTransition>
          </main>
          <AppFooter />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default SidebarLayout;
