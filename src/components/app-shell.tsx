import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  CircleHelp,
  Command as CommandIcon,
  Globe,
  HelpCircle,
  LayoutGrid,
  LogOut,
  Menu,
  Monitor,
  Moon,
  Plus,
  Search,
  Settings,
  Sun,
  User,
  UserCog,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CommandPalette } from "@/components/command-palette";
import { CreateStudioDialog } from "@/components/create-studio-dialog";
import { NotificationsDrawer } from "@/components/notifications-drawer";
import { StudioSwitcher } from "@/components/studio-switcher";
import { StudioGlyph } from "@/components/studio-kit";
import { StudioUIContext } from "@/components/studio-ui-context";
import { useTheme } from "@/components/theme-provider";
import { currentUser, notifications } from "@/lib/mock-data";
import { getStudio, homeNav, studioNav, type HomePath, type NavItem } from "@/lib/studios";
import { cn } from "@/lib/utils";

function SholokMark() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-[var(--shadow-soft)]">
        S
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-bold tracking-tight text-foreground">SHOLOK</span>
        <span className="block text-[11px] font-medium text-muted-foreground">Creator Studio</span>
      </span>
    </Link>
  );
}

function NavList({
  items,
  studioId,
  activeSection,
  onNavigate,
}: {
  items: (NavItem & { to?: HomePath })[];
  studioId?: string | undefined;
  activeSection: string;
  onNavigate?: (() => void) | undefined;
}) {
  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const active = item.section === activeSection;
        const cls = cn(
          "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          active
            ? "bg-sidebar-accent text-sidebar-primary"
            : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
        );
        const inner = (
          <>
            <item.icon className="h-4 w-4" strokeWidth={1.9} />
            {item.label}
            {active ? <span className="ml-auto h-1.5 w-1.5 rounded-full bg-sidebar-primary" /> : null}
          </>
        );

        if (studioId) {
          return item.section === "overview" ? (
            <Link
              key={item.label}
              to="/studio/$studioId"
              params={{ studioId }}
              onClick={onNavigate}
              className={cls}
            >
              {inner}
            </Link>
          ) : (
            <Link
              key={item.label}
              to="/studio/$studioId/$section"
              params={{ studioId, section: item.section }}
              onClick={onNavigate}
              className={cls}
            >
              {inner}
            </Link>
          );
        }

        return (
          <Link key={item.label} to={item.to ?? "/"} onClick={onNavigate} className={cls}>
            {inner}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [createOpen, setCreateOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const { theme, setTheme } = useTheme();

  const segments = pathname.split("/").filter(Boolean);
  const studio = segments[0] === "studio" ? getStudio(segments[1]) : undefined;
  const activeSection = studio ? (segments[2] ?? "overview") : (segments[0] ?? "");
  const navItems = studio ? studioNav[studio.kind] : homeNav;
  const unread = notifications.filter((n) => n.unread).length;

  const ui = useMemo(
    () => ({
      openCreateStudio: () => setCreateOpen(true),
      openCommandPalette: () => setPaletteOpen(true),
      openNotifications: () => setNotifOpen(true),
      openMobileNav: () => setMobileNav(true),
    }),
    [],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const sidebarBody = (onNavigate?: () => void) => (
    <div className="flex h-full flex-col gap-5 px-4 py-5">
      <SholokMark />
      <StudioSwitcher active={studio} />
      <div className="flex-1 overflow-y-auto">
        <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {studio ? studio.typeLabel : "Sholok Studio Home"}
        </p>
        <NavList
          items={navItems}
          studioId={studio?.id}
          activeSection={activeSection}
          onNavigate={onNavigate}
        />
      </div>
      <div className="space-y-3">
        <Button className="w-full" onClick={() => setCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create Studio
        </Button>
        {studio ? (
          <Link
            to="/"
            onClick={onNavigate}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
          >
            <LayoutGrid className="h-4 w-4" /> Back to All Studios
          </Link>
        ) : null}
      </div>
    </div>
  );

  return (
    <StudioUIContext.Provider value={ui}>
      <TooltipProvider delayDuration={200}>
        <div className="min-h-screen bg-background">
          <aside className="fixed inset-y-0 left-0 z-40 hidden w-[265px] border-r border-sidebar-border bg-sidebar lg:block">
            {sidebarBody()}
          </aside>

          <Sheet open={mobileNav} onOpenChange={setMobileNav}>
            <SheetContent side="left" className="w-[280px] p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              {sidebarBody(() => setMobileNav(false))}
            </SheetContent>
          </Sheet>

          <div className="lg:pl-[265px]">
            <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
              <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open navigation"
                  onClick={() => setMobileNav(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>

                <div className="hidden min-w-0 items-center gap-1.5 text-sm sm:flex">
                  <Link to="/" className="text-muted-foreground hover:text-foreground">
                    Sholok Studio
                  </Link>
                  <span className="text-muted-foreground/60">/</span>
                  <span className="truncate font-medium text-foreground">
                    {studio ? studio.name : "Home"}
                  </span>
                  {studio && activeSection !== "overview" ? (
                    <>
                      <span className="text-muted-foreground/60">/</span>
                      <span className="truncate capitalize text-muted-foreground">
                        {activeSection}
                      </span>
                    </>
                  ) : null}
                </div>

                <button
                  onClick={() => setPaletteOpen(true)}
                  className="ml-auto flex w-full max-w-sm items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:bg-accent/40 sm:ml-auto"
                >
                  <Search className="h-4 w-4" />
                  <span className="truncate">
                    {studio ? `Search ${studio.name}...` : "Search your Studio..."}
                  </span>
                  <kbd className="ml-auto hidden items-center gap-0.5 rounded-md border border-border bg-muted px-1.5 py-0.5 text-[11px] font-medium sm:flex">
                    <CommandIcon className="h-3 w-3" />K
                  </kbd>
                </button>

                <div className="flex items-center gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label="Help">
                        <CircleHelp className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Help center</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="relative"
                        aria-label={`Notifications, ${unread} unread`}
                        onClick={() => setNotifOpen(true)}
                      >
                        <Bell className="h-5 w-5" />
                        {unread > 0 ? (
                          <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
                            {unread}
                          </span>
                        ) : null}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Notifications</TooltipContent>
                  </Tooltip>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary ring-1 ring-border transition-colors hover:bg-accent"
                        aria-label="Account menu"
                      >
                        {currentUser.initials}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-60">
                      <DropdownMenuLabel>
                        <p className="text-sm font-semibold">{currentUser.fullName}</p>
                        <p className="text-xs font-normal text-muted-foreground">
                          {currentUser.email}
                        </p>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" /> Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/settings">
                          <UserCog className="mr-2 h-4 w-4" /> Account Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/studios">
                          <LayoutGrid className="mr-2 h-4 w-4" /> Manage Studios
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          <Globe className="mr-2 h-4 w-4" /> Language
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem>English</DropdownMenuItem>
                          <DropdownMenuItem>বাংলা</DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          <Sun className="mr-2 h-4 w-4" /> Theme
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem onClick={() => setTheme("light")}>
                            <Sun className="mr-2 h-4 w-4" /> Light {theme === "light" ? "·" : ""}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setTheme("dark")}>
                            <Moon className="mr-2 h-4 w-4" /> Dark {theme === "dark" ? "·" : ""}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setTheme("system")}>
                            <Monitor className="mr-2 h-4 w-4" /> System {theme === "system" ? "·" : ""}
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                      <DropdownMenuItem>
                        <HelpCircle className="mr-2 h-4 w-4" /> Help Center
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" /> Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </header>

            <main className="mx-auto w-full max-w-[1400px] px-4 pb-24 pt-6 sm:px-6 lg:pb-10">
              {children}
            </main>
          </div>

          {/* Mobile bottom navigation */}
          <nav className="fixed bottom-0 left-0 right-0 z-30 flex border-t border-border bg-background/95 px-2 py-1.5 backdrop-blur-md lg:hidden">
            <Link
              to="/"
              className="flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 text-[11px] font-medium text-muted-foreground"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: true }}
            >
              <LayoutGrid className="h-5 w-5" />
              Home
            </Link>
            <Link
              to="/studios"
              className="flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 text-[11px] font-medium text-muted-foreground"
              activeProps={{ className: "text-primary" }}
            >
              {studio ? <StudioGlyph studio={studio} size="sm" /> : <Plus className="h-5 w-5" />}
              Studios
            </Link>
            <button
              onClick={() => setPaletteOpen(true)}
              className="flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 text-[11px] font-medium text-muted-foreground"
            >
              <Search className="h-5 w-5" />
              Search
            </button>
            <button
              onClick={() => setNotifOpen(true)}
              className="relative flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 text-[11px] font-medium text-muted-foreground"
            >
              <Bell className="h-5 w-5" />
              {unread > 0 ? (
                <span className="absolute right-[26%] top-0.5 h-2 w-2 rounded-full bg-destructive" />
              ) : null}
              Alerts
            </button>
            <Link
              to="/settings"
              className="flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 text-[11px] font-medium text-muted-foreground"
              activeProps={{ className: "text-primary" }}
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </nav>

          <CreateStudioDialog open={createOpen} onOpenChange={setCreateOpen} />
          <CommandPalette
            open={paletteOpen}
            onOpenChange={setPaletteOpen}
            onCreateStudio={() => setCreateOpen(true)}
            onOpenNotifications={() => setNotifOpen(true)}
          />
          <NotificationsDrawer open={notifOpen} onOpenChange={setNotifOpen} />
        </div>
      </TooltipProvider>
    </StudioUIContext.Provider>
  );
}
