import { BookOpen, Newspaper, Palette, PenLine, Store } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const options = [
  {
    id: "seller",
    icon: Store,
    emoji: "🏪",
    title: "Seller",
    description: "Sell products and manage your store",
    tone: "bg-commerce-soft text-commerce",
  },
  {
    id: "news",
    icon: Newspaper,
    emoji: "✍️",
    title: "News",
    description: "Publish and manage news content",
    tone: "bg-editorial-soft text-editorial",
  },
  {
    id: "blog",
    icon: PenLine,
    emoji: "📝",
    title: "Blog",
    description: "Create and publish articles",
    tone: "bg-blog-soft text-blog",
  },
  {
    id: "webtoon",
    icon: BookOpen,
    emoji: "📖",
    title: "Webtoon",
    description: "Create and manage webtoon series",
    tone: "bg-creative-soft text-creative",
  },
  {
    id: "brand",
    icon: Palette,
    emoji: "🎨",
    title: "Brand / Organization",
    description: "Manage a brand or organization",
    tone: "bg-personal-soft text-personal",
  },
];

export function CreateStudioDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selected, setSelected] = useState<string | null>(null);
  const [name, setName] = useState("");

  const close = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep(1);
      setSelected(null);
      setName("");
    }, 200);
  };

  const chosen = options.find((o) => o.id === selected);

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? onOpenChange(true) : close())}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Create a New Studio</DialogTitle>
          <p className="text-sm text-muted-foreground">
            {step === 1
              ? "What would you like to manage? Every Studio stays connected to your single Sholok account."
              : `Name your ${chosen?.title} Studio. You can change this later in Studio settings.`}
          </p>
        </DialogHeader>

        {step === 1 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {options.map((option) => {
              const Icon = option.icon;
              const active = selected === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => setSelected(option.id)}
                  aria-pressed={active}
                  className={cn(
                    "flex items-start gap-3 rounded-xl border p-4 text-left transition-all",
                    active
                      ? "border-primary bg-primary-soft shadow-[var(--shadow-raise)]"
                      : "border-border bg-surface hover:border-primary/40 hover:bg-accent/40",
                  )}
                >
                  <span
                    className={cn("flex h-10 w-10 items-center justify-center rounded-lg", option.tone)}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-foreground">
                      {option.title}
                    </span>
                    <span className="block text-sm text-muted-foreground">{option.description}</span>
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-4">
              <span className="text-xl">{chosen?.emoji}</span>
              <div>
                <p className="text-sm font-semibold text-foreground">{chosen?.title} Studio</p>
                <p className="text-xs text-muted-foreground">{chosen?.description}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="studio-name">Studio name</Label>
              <Input
                id="studio-name"
                placeholder="e.g. ABC Fashion"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                This appears in your Studio switcher and on your public Sholok pages.
              </p>
            </div>
          </div>
        )}

        <div className="mt-2 flex items-center justify-between gap-3">
          <Button variant="ghost" onClick={() => (step === 1 ? close() : setStep(1))}>
            Back
          </Button>
          <Button
            disabled={step === 1 ? !selected : name.trim().length < 2}
            onClick={() => {
              if (step === 1) {
                setStep(2);
                return;
              }
              toast.success(`${name.trim()} is ready`, {
                description: "Prototype only — no Studio was actually created.",
              });
              close();
            }}
          >
            {step === 1 ? "Continue" : "Create Studio"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
