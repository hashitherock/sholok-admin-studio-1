import {
  BarChart3,
  Bell,
  BookOpen,
  Boxes,
  Building2,
  ClipboardList,
  FileEdit,
  FileText,
  FolderTree,
  Home,
  Images,
  LayoutGrid,
  ListChecks,
  MessageSquare,
  Newspaper,
  Package,
  PenLine,
  Send,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Store,
  Tags,
  Users,
  type LucideIcon,
} from "lucide-react";

export type StudioKind = "customer" | "seller" | "news" | "blog" | "webtoon";
export type Accent = "commerce" | "editorial" | "blog" | "creative" | "personal";

export type Studio = {
  id: string;
  name: string;
  typeLabel: string;
  kind: StudioKind;
  accent: Accent;
  icon: LucideIcon;
  emoji: string;
  scope: string;
  status: "Active" | "In review" | "Paused";
  initials: string;
  stats: { label: string; value: string }[];
};

export const studios: Studio[] = [
  {
    id: "sholok-customer",
    name: "Sholok Customer",
    typeLabel: "Customer",
    kind: "customer",
    accent: "personal",
    icon: ShoppingBag,
    emoji: "🛍",
    scope: "Personal account",
    status: "Active",
    initials: "SC",
    stats: [
      { label: "Orders", value: "24" },
      { label: "Wishlist", value: "61" },
    ],
  },
  {
    id: "abc-fashion",
    name: "ABC Fashion",
    typeLabel: "Seller Studio",
    kind: "seller",
    accent: "commerce",
    icon: Store,
    emoji: "🏪",
    scope: "Business",
    status: "Active",
    initials: "AF",
    stats: [
      { label: "Products", value: "248" },
      { label: "Orders", value: "32" },
    ],
  },
  {
    id: "sholok-news",
    name: "Sholok News",
    typeLabel: "News Publisher",
    kind: "news",
    accent: "editorial",
    icon: Newspaper,
    emoji: "✍️",
    scope: "Newsroom",
    status: "Active",
    initials: "SN",
    stats: [
      { label: "Articles", value: "18" },
      { label: "Drafts", value: "12" },
    ],
  },
  {
    id: "my-blog",
    name: "My Blog",
    typeLabel: "Blog Publisher",
    kind: "blog",
    accent: "blog",
    icon: PenLine,
    emoji: "📝",
    scope: "Personal publishing",
    status: "Active",
    initials: "MB",
    stats: [
      { label: "Posts", value: "64" },
      { label: "Comments", value: "312" },
    ],
  },
  {
    id: "my-webtoon",
    name: "My Webtoon",
    typeLabel: "Webtoon Creator",
    kind: "webtoon",
    accent: "creative",
    icon: BookOpen,
    emoji: "📖",
    scope: "Creative studio",
    status: "In review",
    initials: "MW",
    stats: [
      { label: "Series", value: "3" },
      { label: "Episodes", value: "47" },
    ],
  },
];

export const getStudio = (id?: string) => studios.find((s) => s.id === id);

export const accentClasses: Record<
  Accent,
  { text: string; softBg: string; dot: string; border: string; bar: string; chart: string }
> = {
  commerce: {
    text: "text-commerce",
    softBg: "bg-commerce-soft",
    dot: "bg-commerce",
    border: "hover:border-commerce/40",
    bar: "bg-commerce",
    chart: "var(--commerce)",
  },
  editorial: {
    text: "text-editorial",
    softBg: "bg-editorial-soft",
    dot: "bg-editorial",
    border: "hover:border-editorial/40",
    bar: "bg-editorial",
    chart: "var(--editorial)",
  },
  blog: {
    text: "text-blog",
    softBg: "bg-blog-soft",
    dot: "bg-blog",
    border: "hover:border-blog/40",
    bar: "bg-blog",
    chart: "var(--blog)",
  },
  creative: {
    text: "text-creative",
    softBg: "bg-creative-soft",
    dot: "bg-creative",
    border: "hover:border-creative/40",
    bar: "bg-creative",
    chart: "var(--creative)",
  },
  personal: {
    text: "text-personal",
    softBg: "bg-personal-soft",
    dot: "bg-personal",
    border: "hover:border-personal/40",
    bar: "bg-personal",
    chart: "var(--personal)",
  },
};

export type NavItem = { label: string; section: string; icon: LucideIcon };

export type HomePath =
  | "/"
  | "/studios"
  | "/activity"
  | "/notifications"
  | "/tasks"
  | "/analytics"
  | "/settings";

export type HomeNavItem = NavItem & { to: HomePath };

export const homeNav: HomeNavItem[] = [
  { label: "Overview", section: "", to: "/", icon: Home },
  { label: "My Studios", section: "studios", to: "/studios", icon: LayoutGrid },
  { label: "Recent Activity", section: "activity", to: "/activity", icon: ListChecks },
  { label: "Notifications", section: "notifications", to: "/notifications", icon: Bell },
  { label: "Tasks", section: "tasks", to: "/tasks", icon: ClipboardList },
  { label: "Analytics", section: "analytics", to: "/analytics", icon: BarChart3 },
  { label: "Settings", section: "settings", to: "/settings", icon: Settings },
];

export const studioNav: Record<StudioKind, NavItem[]> = {
  customer: [
    { label: "Overview", section: "overview", icon: Home },
    { label: "Orders", section: "orders", icon: ShoppingCart },
    { label: "Wishlist", section: "wishlist", icon: Sparkles },
    { label: "Reviews", section: "reviews", icon: MessageSquare },
    { label: "Addresses", section: "addresses", icon: Building2 },
    { label: "Account Settings", section: "settings", icon: Settings },
  ],
  seller: [
    { label: "Overview", section: "overview", icon: Home },
    { label: "Products", section: "products", icon: Package },
    { label: "Orders", section: "orders", icon: ShoppingCart },
    { label: "Inventory", section: "inventory", icon: Boxes },
    { label: "Customers", section: "customers", icon: Users },
    { label: "Promotions", section: "promotions", icon: Tags },
    { label: "Analytics", section: "analytics", icon: BarChart3 },
    { label: "Store Settings", section: "settings", icon: Settings },
  ],
  news: [
    { label: "Overview", section: "overview", icon: Home },
    { label: "Articles", section: "articles", icon: FileText },
    { label: "Drafts", section: "drafts", icon: FileEdit },
    { label: "Published", section: "published", icon: Send },
    { label: "Categories", section: "categories", icon: FolderTree },
    { label: "Media", section: "media", icon: Images },
    { label: "Analytics", section: "analytics", icon: BarChart3 },
    { label: "Publisher Settings", section: "settings", icon: Settings },
  ],
  blog: [
    { label: "Overview", section: "overview", icon: Home },
    { label: "Posts", section: "posts", icon: FileText },
    { label: "Drafts", section: "drafts", icon: FileEdit },
    { label: "Published", section: "published", icon: Send },
    { label: "Comments", section: "comments", icon: MessageSquare },
    { label: "Media", section: "media", icon: Images },
    { label: "Analytics", section: "analytics", icon: BarChart3 },
    { label: "Blog Settings", section: "settings", icon: Settings },
  ],
  webtoon: [
    { label: "Overview", section: "overview", icon: Home },
    { label: "Series", section: "series", icon: BookOpen },
    { label: "Episodes", section: "episodes", icon: Images },
    { label: "Drafts", section: "drafts", icon: FileEdit },
    { label: "Published", section: "published", icon: Send },
    { label: "Comments", section: "comments", icon: MessageSquare },
    { label: "Analytics", section: "analytics", icon: BarChart3 },
    { label: "Webtoon Settings", section: "settings", icon: Settings },
  ],
};
