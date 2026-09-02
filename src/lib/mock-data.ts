import type { Accent } from "./studios";

export const currentUser = {
  name: "Hasina",
  fullName: "Hasina Rahman",
  email: "hasina@sholok.com",
  initials: "HR",
  role: "Sholok Account Owner",
};

export type ActivityEntry = {
  id: string;
  studio: string;
  studioId: string;
  accent: Accent;
  emoji: string;
  title: string;
  detail: string;
  time: string;
  group: "Today" | "Yesterday" | "Earlier this week";
};

export const activityFeed: ActivityEntry[] = [
  {
    id: "a1",
    studio: "ABC Fashion",
    studioId: "abc-fashion",
    accent: "commerce",
    emoji: "🏪",
    title: "12 new orders received",
    detail: "Total value ৳48,600 · 4 awaiting packaging",
    time: "10 minutes ago",
    group: "Today",
  },
  {
    id: "a2",
    studio: "Sholok News",
    studioId: "sholok-news",
    accent: "editorial",
    emoji: "✍️",
    title: 'Article "Bangladesh Textile Market Outlook 2026" published',
    detail: "Live on the Business desk · 3,140 views so far",
    time: "1 hour ago",
    group: "Today",
  },
  {
    id: "a3",
    studio: "My Blog",
    studioId: "my-blog",
    accent: "blog",
    emoji: "📝",
    title: "New comment received",
    detail: 'Tanvir A. commented on "A Slow Morning in Old Dhaka"',
    time: "3 hours ago",
    group: "Today",
  },
  {
    id: "a4",
    studio: "My Webtoon",
    studioId: "my-webtoon",
    accent: "creative",
    emoji: "📖",
    title: "Episode 12 uploaded",
    detail: '"Riverside Letters" · scheduled for Friday 9:00 AM',
    time: "Yesterday, 8:42 PM",
    group: "Yesterday",
  },
  {
    id: "a5",
    studio: "ABC Fashion",
    studioId: "abc-fashion",
    accent: "commerce",
    emoji: "🏪",
    title: "Winter Collection promotion ended",
    detail: "1,284 uses · ৳2.1L attributed revenue",
    time: "Yesterday, 11:59 PM",
    group: "Yesterday",
  },
  {
    id: "a6",
    studio: "Sholok Customer",
    studioId: "sholok-customer",
    accent: "personal",
    emoji: "🛍",
    title: "Order #SH-91204 delivered",
    detail: "Linen kurta set · rate your purchase",
    time: "Monday, 2:15 PM",
    group: "Earlier this week",
  },
  {
    id: "a7",
    studio: "Sholok News",
    studioId: "sholok-news",
    accent: "editorial",
    emoji: "✍️",
    title: "Rafiq submitted an article for review",
    detail: '"Metro Rail Phase 3: what changes for commuters"',
    time: "Monday, 9:05 AM",
    group: "Earlier this week",
  },
];

export type Task = {
  id: string;
  title: string;
  studio: string;
  studioId: string;
  accent: Accent;
  severity: "high" | "medium" | "low";
  action: string;
};

export const tasks: Task[] = [
  {
    id: "t1",
    title: "3 products are low in stock",
    studio: "ABC Fashion",
    studioId: "abc-fashion",
    accent: "commerce",
    severity: "high",
    action: "Restock",
  },
  {
    id: "t2",
    title: "2 articles are waiting for review",
    studio: "Sholok News",
    studioId: "sholok-news",
    accent: "editorial",
    severity: "high",
    action: "Review",
  },
  {
    id: "t3",
    title: "5 new comments need moderation",
    studio: "My Blog",
    studioId: "my-blog",
    accent: "blog",
    severity: "medium",
    action: "Moderate",
  },
  {
    id: "t4",
    title: "Episode cover image missing",
    studio: "My Webtoon",
    studioId: "my-webtoon",
    accent: "creative",
    severity: "medium",
    action: "Upload",
  },
  {
    id: "t5",
    title: "Verify your business payout details",
    studio: "ABC Fashion",
    studioId: "abc-fashion",
    accent: "commerce",
    severity: "low",
    action: "Verify",
  },
];

export type Notification = {
  id: string;
  category: "Orders" | "Content" | "Comments" | "System";
  title: string;
  body: string;
  studio: string;
  time: string;
  unread: boolean;
};

export const notifications: Notification[] = [
  {
    id: "n1",
    category: "Orders",
    title: "12 new orders received",
    body: "ABC Fashion received 12 orders in the last hour.",
    studio: "ABC Fashion",
    time: "10 min ago",
    unread: true,
  },
  {
    id: "n2",
    category: "Content",
    title: "Your article has been published",
    body: '"Bangladesh Textile Market Outlook 2026" is now live.',
    studio: "Sholok News",
    time: "1 hr ago",
    unread: true,
  },
  {
    id: "n3",
    category: "Comments",
    title: "New comment on My Blog",
    body: 'Tanvir A.: "This captured Old Dhaka perfectly."',
    studio: "My Blog",
    time: "3 hrs ago",
    unread: true,
  },
  {
    id: "n4",
    category: "Content",
    title: "Episode 12 successfully uploaded",
    body: "Riverside Letters · scheduled for Friday 9:00 AM.",
    studio: "My Webtoon",
    time: "Yesterday",
    unread: false,
  },
  {
    id: "n5",
    category: "Orders",
    title: "Payout of ৳86,400 completed",
    body: "Settlement for 14–20 August has been transferred.",
    studio: "ABC Fashion",
    time: "Yesterday",
    unread: false,
  },
  {
    id: "n6",
    category: "System",
    title: "New Studio permissions available",
    body: "You can now invite editors with limited publishing rights.",
    studio: "Sholok Studio",
    time: "2 days ago",
    unread: false,
  },
];

export const ecosystemMetrics = [
  { label: "Total Views", value: "1.24M", delta: "+12.4%", trend: "up" as const },
  { label: "Total Orders", value: "3,482", delta: "+6.1%", trend: "up" as const },
  { label: "Content Published", value: "129", delta: "+9 this month", trend: "up" as const },
  { label: "Revenue", value: "৳18.6L", delta: "+4.8%", trend: "up" as const },
  { label: "Followers", value: "8.4K", delta: "+312", trend: "up" as const },
  { label: "Engagement", value: "6.9%", delta: "-0.4%", trend: "down" as const },
];

export const ecosystemTrend = [
  { month: "Mar", views: 82000, revenue: 118000 },
  { month: "Apr", views: 96000, revenue: 132000 },
  { month: "May", views: 104000, revenue: 141000 },
  { month: "Jun", views: 121000, revenue: 156000 },
  { month: "Jul", views: 133000, revenue: 172000 },
  { month: "Aug", views: 158000, revenue: 194000 },
];

export const studioShare = [
  { name: "ABC Fashion", value: 46, accent: "commerce" as Accent },
  { name: "Sholok News", value: 24, accent: "editorial" as Accent },
  { name: "My Blog", value: 17, accent: "blog" as Accent },
  { name: "My Webtoon", value: 13, accent: "creative" as Accent },
];

export const quickActions: Record<string, { label: string; hint: string }[]> = {
  home: [
    { label: "Add Product", hint: "ABC Fashion" },
    { label: "Write Article", hint: "Sholok News" },
    { label: "Create Blog Post", hint: "My Blog" },
    { label: "Upload Episode", hint: "My Webtoon" },
    { label: "View Analytics", hint: "All Studios" },
  ],
  seller: [
    { label: "Add Product", hint: "Catalog" },
    { label: "Create Promotion", hint: "Marketing" },
    { label: "Print Invoices", hint: "Orders" },
    { label: "View Analytics", hint: "Store" },
  ],
  news: [
    { label: "Write Article", hint: "Newsroom" },
    { label: "Upload Media", hint: "Library" },
    { label: "Review Queue", hint: "2 pending" },
    { label: "View Analytics", hint: "Publisher" },
  ],
  blog: [
    { label: "Create Blog Post", hint: "Editor" },
    { label: "Moderate Comments", hint: "5 pending" },
    { label: "Upload Media", hint: "Library" },
    { label: "View Analytics", hint: "Blog" },
  ],
  webtoon: [
    { label: "Upload Episode", hint: "Riverside Letters" },
    { label: "New Series", hint: "Creative" },
    { label: "Moderate Comments", hint: "18 new" },
    { label: "View Analytics", hint: "Webtoon" },
  ],
  customer: [
    { label: "Track Orders", hint: "2 in transit" },
    { label: "Write a Review", hint: "1 pending" },
    { label: "Manage Addresses", hint: "3 saved" },
  ],
};

export const sellerData = {
  metrics: [
    { label: "Sales (30d)", value: "৳6.4L", delta: "+8.2%" },
    { label: "Orders", value: "32", delta: "+12 today" },
    { label: "Products", value: "248", delta: "6 drafts" },
    { label: "Customers", value: "1,914", delta: "+64" },
  ],
  trend: [
    { label: "Mon", value: 42000 },
    { label: "Tue", value: 51000 },
    { label: "Wed", value: 48000 },
    { label: "Thu", value: 62000 },
    { label: "Fri", value: 71000 },
    { label: "Sat", value: 88000 },
    { label: "Sun", value: 79000 },
  ],
  orders: [
    { id: "#SH-91433", customer: "Nusrat Jahan", items: "2 items", total: "৳4,180", status: "Packaging" },
    { id: "#SH-91429", customer: "Arif Hossain", items: "1 item", total: "৳2,650", status: "Paid" },
    { id: "#SH-91422", customer: "Mitu Akter", items: "4 items", total: "৳9,340", status: "Shipped" },
    { id: "#SH-91417", customer: "Rezaul Karim", items: "1 item", total: "৳1,890", status: "Delivered" },
    { id: "#SH-91410", customer: "Shreya Das", items: "3 items", total: "৳6,720", status: "Delivered" },
  ],
  topProducts: [
    { name: "Handloom Cotton Saree", sold: 184, revenue: "৳2.4L" },
    { name: "Linen Panjabi — Ivory", sold: 142, revenue: "৳1.7L" },
    { name: "Block Print Kurta Set", sold: 118, revenue: "৳1.3L" },
    { name: "Jamdani Dupatta", sold: 96, revenue: "৳96,000" },
  ],
  inventory: [
    { name: "Linen Panjabi — Ivory (L)", left: 4 },
    { name: "Block Print Kurta Set (M)", left: 2 },
    { name: "Jamdani Dupatta — Teal", left: 5 },
  ],
};

export const newsData = {
  metrics: [
    { label: "Published Articles", value: "18", delta: "+4 this week" },
    { label: "Views", value: "125K", delta: "+11.3%" },
    { label: "Subscribers", value: "4,206", delta: "+128" },
    { label: "Engagement", value: "7.4%", delta: "+0.6%" },
  ],
  trend: [
    { label: "Mon", value: 12400 },
    { label: "Tue", value: 15200 },
    { label: "Wed", value: 14100 },
    { label: "Thu", value: 18800 },
    { label: "Fri", value: 21200 },
    { label: "Sat", value: 17600 },
    { label: "Sun", value: 16100 },
  ],
  articles: [
    { title: "Bangladesh Textile Market Outlook 2026", desk: "Business", views: "3.1K", status: "Published" },
    { title: "Metro Rail Phase 3: what changes for commuters", desk: "City", views: "—", status: "In review" },
    { title: "Monsoon farming yields beat forecasts", desk: "Economy", views: "8.9K", status: "Published" },
    { title: "Dhaka's night bus network expands", desk: "City", views: "5.2K", status: "Published" },
  ],
  drafts: [
    { title: "Interview: the women rebuilding Jamdani", updated: "20 min ago" },
    { title: "Explainer: new VAT rules for small sellers", updated: "2 hrs ago" },
    { title: "Photo essay — Buriganga at dawn", updated: "Yesterday" },
  ],
};

export const blogData = {
  metrics: [
    { label: "Published Posts", value: "64", delta: "+3 this month" },
    { label: "Views", value: "48.2K", delta: "+7.9%" },
    { label: "Comments", value: "312", delta: "5 pending" },
    { label: "Followers", value: "2,148", delta: "+41" },
  ],
  trend: [
    { label: "Mon", value: 1400 },
    { label: "Tue", value: 1750 },
    { label: "Wed", value: 1610 },
    { label: "Thu", value: 2080 },
    { label: "Fri", value: 2460 },
    { label: "Sat", value: 2210 },
    { label: "Sun", value: 1980 },
  ],
  posts: [
    { title: "A Slow Morning in Old Dhaka", views: "4.6K", comments: 38, status: "Published" },
    { title: "What I learned running a tiny shop", views: "3.2K", comments: 21, status: "Published" },
    { title: "Seven notebooks, one system", views: "—", comments: 0, status: "Draft" },
    { title: "Rain, tea and unfinished chapters", views: "2.8K", comments: 14, status: "Published" },
  ],
  comments: [
    { author: "Tanvir A.", text: "This captured Old Dhaka perfectly.", post: "A Slow Morning in Old Dhaka" },
    { author: "Rima K.", text: "Please write more about the shop numbers!", post: "What I learned running a tiny shop" },
    { author: "Sadia H.", text: "Saved this for my Sunday reading.", post: "Rain, tea and unfinished chapters" },
  ],
};

export const webtoonData = {
  metrics: [
    { label: "Series", value: "3", delta: "1 ongoing" },
    { label: "Episodes", value: "47", delta: "+2 this week" },
    { label: "Views", value: "302K", delta: "+14.2%" },
    { label: "Subscribers", value: "8.4K", delta: "+312" },
  ],
  trend: [
    { label: "Mon", value: 8400 },
    { label: "Tue", value: 9100 },
    { label: "Wed", value: 8800 },
    { label: "Thu", value: 11200 },
    { label: "Fri", value: 15600 },
    { label: "Sat", value: 14200 },
    { label: "Sun", value: 12800 },
  ],
  episodes: [
    { title: "Riverside Letters — Ep. 12", status: "Scheduled", views: "—" },
    { title: "Riverside Letters — Ep. 11", status: "Published", views: "24.1K" },
    { title: "Tin Roof Kids — Ep. 08", status: "Published", views: "18.6K" },
    { title: "Riverside Letters — Ep. 10", status: "Published", views: "22.4K" },
  ],
  series: [
    { title: "Riverside Letters", episodes: 12, subs: "5.1K" },
    { title: "Tin Roof Kids", episodes: 8, subs: "2.2K" },
    { title: "Night Market Tales", episodes: 27, subs: "1.1K" },
  ],
};

export const customerData = {
  metrics: [
    { label: "Orders", value: "24", delta: "2 in transit" },
    { label: "Wishlist", value: "61", delta: "+4 saved" },
    { label: "Reviews", value: "18", delta: "1 pending" },
    { label: "Sholok Points", value: "2,340", delta: "+120" },
  ],
  trend: [
    { label: "Mar", value: 3 },
    { label: "Apr", value: 5 },
    { label: "May", value: 2 },
    { label: "Jun", value: 6 },
    { label: "Jul", value: 4 },
    { label: "Aug", value: 4 },
  ],
  orders: [
    { id: "#SH-91204", item: "Linen kurta set", total: "৳3,240", status: "Delivered" },
    { id: "#SH-91188", item: "Handloom saree", total: "৳6,900", status: "In transit" },
    { id: "#SH-91150", item: "Ceramic mug set", total: "৳1,480", status: "In transit" },
  ],
};
