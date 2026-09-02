import { useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  Bell,
  FileText,
  Images,
  PenLine,
  Plus,
  Repeat,
  Settings,
  ShoppingBag,
} from "lucide-react";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { StudioGlyph } from "@/components/studio-kit";
import { studios } from "@/lib/studios";

export function CommandPalette({
  open,
  onOpenChange,
  onCreateStudio,
  onOpenNotifications,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateStudio: () => void;
  onOpenNotifications: () => void;
}) {
  const navigate = useNavigate();

  const run = (fn: () => void) => {
    onOpenChange(false);
    fn();
  };

  const actions = [
    { label: "Add Product", hint: "ABC Fashion", icon: ShoppingBag, studioId: "abc-fashion", section: "products" },
    { label: "Create Article", hint: "Sholok News", icon: FileText, studioId: "sholok-news", section: "articles" },
    { label: "Create Blog Post", hint: "My Blog", icon: PenLine, studioId: "my-blog", section: "posts" },
    { label: "Upload Episode", hint: "My Webtoon", icon: Images, studioId: "my-webtoon", section: "episodes" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl overflow-hidden p-0">
        <DialogTitle className="sr-only">Command palette</DialogTitle>
        <Command className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground">
          <CommandInput placeholder="Search everything..." />
          <CommandList className="max-h-[24rem]">
            <CommandEmpty>No matches found.</CommandEmpty>

            <CommandGroup heading="Switch Studio">
              {studios.map((studio) => (
                <CommandItem
                  key={studio.id}
                  value={`open ${studio.name} ${studio.typeLabel}`}
                  onSelect={() =>
                    run(() => navigate({ to: "/studio/$studioId", params: { studioId: studio.id } }))
                  }
                >
                  <StudioGlyph studio={studio} size="sm" />
                  <span className="ml-2 flex-1">Open {studio.name}</span>
                  <span className="text-xs text-muted-foreground">{studio.typeLabel}</span>
                </CommandItem>
              ))}
              <CommandItem value="all studios home" onSelect={() => run(() => navigate({ to: "/" }))}>
                <Repeat className="mr-2 h-4 w-4" />
                Back to All Studios home
              </CommandItem>
            </CommandGroup>

            <CommandGroup heading="Actions">
              {actions.map((a) => (
                <CommandItem
                  key={a.label}
                  value={a.label}
                  onSelect={() =>
                    run(() => {
                      navigate({
                        to: "/studio/$studioId/$section",
                        params: { studioId: a.studioId, section: a.section },
                      });
                      toast.info(`${a.label} — prototype view`);
                    })
                  }
                >
                  <a.icon className="mr-2 h-4 w-4" />
                  <span className="flex-1">{a.label}</span>
                  <span className="text-xs text-muted-foreground">{a.hint}</span>
                </CommandItem>
              ))}
              <CommandItem value="create new studio" onSelect={() => run(onCreateStudio)}>
                <Plus className="mr-2 h-4 w-4" /> Create New Studio
              </CommandItem>
            </CommandGroup>

            <CommandGroup heading="Go to">
              <CommandItem value="analytics" onSelect={() => run(() => navigate({ to: "/analytics" }))}>
                <BarChart3 className="mr-2 h-4 w-4" /> Open Analytics
              </CommandItem>
              <CommandItem value="notifications" onSelect={() => run(onOpenNotifications)}>
                <Bell className="mr-2 h-4 w-4" /> Open Notifications
              </CommandItem>
              <CommandItem value="settings" onSelect={() => run(() => navigate({ to: "/settings" }))}>
                <Settings className="mr-2 h-4 w-4" /> Open Settings
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
