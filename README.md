# Sholok Admin Studio 1

Build a modern, premium, responsive UI-only web dashboard for Sholok Creator Studio.

Website:
https://studio.sholok.com

IMPORTANT:
This project is ONLY a frontend UI/UX prototype.

DO NOT build:

Database

Backend

API

Authentication backend

Supabase

Firebase

Admin backend

Real payment integration

Real order processing

Real content publishing

Real data fetching

Use realistic mock/sample data only.

The goal is to design the Sholok Creator Studio Dashboard, a unified management workspace similar in concept to how large portal ecosystems such as Naver allow one account to access multiple services.

==================================================

PRODUCT CONCEPT
==================================================

Sholok Creator Studio is a centralized workspace where one user can manage multiple independent Studios / Publishers / Brands / Organizations from a single login.

Example user may have:

🛍 Sholok Customer

🏪 ABC Fashion — Seller

✍️ Sholok News — News Creator

📝 My Blog — Blog Publisher

📖 My Webtoon — Webtoon Creator

The user logs in once at:

https://studio.sholok.com

After login, the user should NOT need separate accounts for each service.

Instead, they can switch between their different Studios from one unified interface.

Think of it as:

ONE SH0LOK ACCOUNT
↓
MULTIPLE STUDIOS
↓
MULTIPLE SERVICES
↓
ONE UNIFIED MANAGEMENT EXPERIENCE

==================================================
2. PRIMARY UX PRINCIPLE

The dashboard must immediately answer:

"What can I manage from here?"

The user should be able to:

See all their Studios

Switch between Studios

Create a new Studio

See recent activity

See notifications

See tasks requiring attention

Access each Studio's management tools

Return to the unified Sholok Studio Home at any time

The interface should feel like a combination of:

Naver ecosystem

Google Workspace

Meta Business Suite

YouTube Studio

Shopify Admin

Modern SaaS workspace

But DO NOT copy any existing website exactly.

Create a unique Sholok design system.

==================================================
3. OVERALL VISUAL STYLE

Design language:

Premium

Modern

Clean

Professional

SaaS-style

High-end technology platform

Spacious

Extremely polished

Easy to scan

Desktop-first but fully responsive

Avoid:

Generic Bootstrap dashboard appearance

Excessively dark UI

Excessive gradients

Huge cards

Clutter

Too many charts

Old-fashioned admin panel design

Use:

White / very light neutral background

Deep charcoal text

Sholok-inspired blue primary accent

Subtle secondary accent colors for different Studio types

Soft borders

Very subtle shadows

12–16px rounded corners

Excellent whitespace

Clean iconography

Typography:

Use Inter or a similar modern UI font.

Headings should be strong but not oversized.

Body text should be highly readable.

==================================================
4. GLOBAL APPLICATION LAYOUT

Create a professional application shell.

Desktop:

LEFT SIDEBAR
+
TOP HEADER
+
MAIN CONTENT

Mobile:

Collapsible sidebar

Bottom navigation or mobile drawer

Sticky mobile header

==================================================
5. LEFT SIDEBAR

The sidebar should be approximately 250–280px wide.

Top:

SHOLOK logo

Below logo:

"Creator Studio"

Then a prominent:

WORKSPACE SWITCHER

Example:

┌──────────────────────────────┐
│ 🏪 ABC Fashion │
│ Seller Studio ▼ │
└──────────────────────────────┘

When clicked, show a beautiful workspace switcher popover.

==================================================
6. WORKSPACE SWITCHER

This is one of the most important components.

Create a polished dropdown / modal containing:

MY STUDIOS

🛍 Sholok
Customer
Personal Account

🏪 ABC Fashion
Seller
Business

✍️ Sholok News
News Publisher

📝 My Blog
Blog Publisher

📖 My Webtoon
Webtoon Creator

Each item should display:

Icon

Studio name

Studio type

Small status indicator

Optional avatar/logo

Selected Studio should be clearly highlighted.

At bottom:

Create New Studio

and:

⚙ Manage Studios

==================================================
7. SIDEBAR NAVIGATION

When "All Studios / Home" is selected:

Overview
My Studios
Recent Activity
Notifications
Tasks
Analytics
Settings

When a specific Studio is selected, the sidebar dynamically changes according to that Studio.

Example for Seller Studio:

Overview
Products
Orders
Inventory
Customers
Promotions
Analytics
Store Settings

Example for News Creator:

Overview
Articles
Drafts
Published
Categories
Media
Analytics
Publisher Settings

Example for Blog:

Overview
Posts
Drafts
Published
Comments
Media
Analytics
Blog Settings

Example for Webtoon:

Overview
Series
Episodes
Drafts
Published
Comments
Analytics
Webtoon Settings

IMPORTANT:

The UI should visually communicate that these are different Studios but belong to the same Sholok account.

==================================================
8. TOP HEADER

Create a clean sticky top navigation.

Left:

Breadcrumb:

Sholok Studio / Home

or:

Sholok Studio / ABC Fashion

Center or right:

Global search field:

"Search your Studio..."

Use keyboard shortcut indicator:

⌘ K

Right side:

Help icon
Notification bell
User avatar

Notification bell should show a small unread badge.

User avatar dropdown:

Profile
Account Settings
Manage Studios
Language
Theme
Help Center
Sign Out

==================================================
9. MAIN HOME DASHBOARD

The default page should be:

"Good morning, Hasina"

Subtitle:

"Manage all your Sholok Studios from one place."

IMPORTANT:

Do not make this feel like a traditional admin dashboard.

It should feel like a personalized command center.

==================================================
10. HERO / WELCOME SECTION

Create a beautiful welcome section:

Good morning, Hasina 👋

Manage your brands, content, store and publishing activities from one unified workspace.

Primary CTA:

Create Studio

Secondary CTA:

Explore Studios

Add a small illustration / abstract Sholok ecosystem visual on the right.

==================================================
11. MY STUDIOS SECTION

Create a prominent section:

"My Studios"

Display Studio cards in a responsive grid.

Example:

┌────────────────────────────────────┐
│ 🏪 │
│ ABC Fashion │
│ Seller Studio │
│ │
│ Products 248 │
│ Orders 32 │
│ │
│ ● Active │
│ │
│ Open Studio → │
└────────────────────────────────────┘

Create cards for:

Sholok Customer

ABC Fashion

Sholok News

My Blog

My Webtoon

Each Studio should have its own subtle visual identity.

Seller:
Blue / commerce accent

News:
Red / editorial accent

Blog:
Purple / editorial accent

Webtoon:
Pink / creative accent

Customer:
Green / personal accent

Keep these accents subtle and professional.

==================================================
12. STUDIO CARD INTERACTION

On hover:

Slight elevation

Border highlight

Arrow animation

Quick actions appear

Quick actions:

Open Studio
View Analytics
Settings

Clicking:

"Open Studio"

should visually transition into that Studio dashboard.

Since this is UI-only, use frontend state / mock navigation.

==================================================
13. CREATE NEW STUDIO

Create a beautiful modal / page for:

"Create a New Studio"

Headline:

What would you like to manage?

Display large selectable cards:

🏪 Seller
Sell products and manage your store

✍️ News
Publish and manage news content

📝 Blog
Create and publish articles

📖 Webtoon
Create and manage webtoon series

🎨 Brand / Organization
Manage a brand or organization

Each option should have:

Icon

Title

Description

Hover state

Selected state

Bottom:

Back
Continue

This is UI only.

==================================================
14. RECENT ACTIVITY

Create:

"Recent Activity"

Example:

Today

🏪 ABC Fashion
12 new orders received
10 minutes ago

✍️ Sholok News
Article "Bangladesh Textile Market..." published
1 hour ago

📝 My Blog
New comment received
3 hours ago

📖 My Webtoon
Episode 12 uploaded
Yesterday

Use timeline/list design.

==================================================
15. ATTENTION / TASKS

Create a section:

"Needs Your Attention"

Example:

⚠ 3 products are low in stock
→ ABC Fashion

✍ 2 articles are waiting for review
→ Sholok News

💬 5 new comments
→ My Blog

📖 Episode cover image missing
→ My Webtoon

Each task should have:

Severity indicator

Studio label

Description

Action button

==================================================
16. QUICK ACTIONS

Create a compact Quick Actions section:

Add Product

Write Article

Create Blog Post

Upload Webtoon Episode

View Analytics

The available actions should change according to selected Studio.

==================================================
17. GLOBAL ANALYTICS

Create a simple high-level analytics section.

Title:

"Your Ecosystem at a Glance"

Cards:

Total Views
Total Orders
Content Published
Revenue
Followers
Engagement

Use beautiful lightweight charts.

Do NOT create an overly complex analytics dashboard.

The purpose is to give a quick overview across all Studios.

Use mock data.

==================================================
18. STUDIO-SPECIFIC DASHBOARD

When the user opens a Studio, create a specialized dashboard.

For Seller Studio:

Header:

ABC Fashion
Seller Studio

Actions:

View Store
Add Product

Metrics:

Sales
Orders
Products
Customers

Sections:

Recent Orders
Top Products
Inventory Alerts
Sales Overview

For News Studio:

Header:

Sholok News
News Creator

Metrics:

Published Articles
Views
Subscribers
Engagement

Sections:

Recent Articles
Drafts
Top Stories
Editorial Tasks

For Blog Studio:

Metrics:

Published Posts
Views
Comments
Followers

Sections:

Recent Posts
Drafts
Comments
Popular Posts

For Webtoon Studio:

Metrics:

Series
Episodes
Views
Subscribers

Sections:

Recent Episodes
Draft Episodes
Popular Series
Reader Engagement

==================================================
19. MULTI-STUDIO EXPERIENCE

This is extremely important.

The dashboard must make it obvious that:

ONE USER
has
MULTIPLE STUDIOS.

Do NOT create separate login pages.

Do NOT make each Studio feel like a completely separate application.

Instead:

Sholok Account
→ Studio Switcher
→ Studio Dashboard

The user should be able to switch:

ABC Fashion
↓
Sholok News
↓
My Blog
↓
My Webtoon

without logging out.

==================================================
20. GLOBAL COMMAND PALETTE

Add a Cmd/Ctrl + K command palette.

Example:

Search everything...

Actions:

Open ABC Fashion
Open Sholok News
Open My Blog
Open My Webtoon

Add Product
Create Article
Create Blog Post
Upload Episode

Open Analytics
Open Settings

Switch Studio

This should feel extremely polished.

==================================================
21. NOTIFICATIONS

Create a notification drawer.

Categories:

All
Orders
Content
Comments
System

Example:

"12 new orders received"

"Your article has been published"

"New comment on My Blog"

"Episode 12 successfully uploaded"

Use realistic timestamps.

==================================================
22. RESPONSIVE DESIGN

Desktop:

Full sidebar
Large content area
Multi-column dashboard

Tablet:

Collapsible sidebar
2-column cards

Mobile:

Compact header
Hamburger menu
Studio switcher easily accessible
Single-column cards
Horizontally scrollable Studio cards
Bottom navigation where appropriate

The experience must remain premium and usable on mobile.

==================================================
23. MICRO INTERACTIONS

Add subtle:

Hover animations

Card elevation

Button transitions

Dropdown animations

Sidebar transitions

Modal transitions

Skeleton loading examples

Toast notification examples

Animations should be fast and subtle.

Do not use excessive animation.

==================================================
24. EMPTY STATES

Design beautiful empty states.

Example:

"No Studios yet"

Create your first Studio to start managing your Sholok presence.

CTA:

Create Your First Studio

Also create empty states for:

No Products
No Articles
No Blog Posts
No Webtoon Series
No Notifications

==================================================
25. DARK MODE

Support:

Light Mode
Dark Mode
System

Dark mode should be carefully designed, not simply inverted.

==================================================
26. ACCESSIBILITY

Use:

Clear contrast

Keyboard navigation

Focus states

Accessible buttons

Tooltips

Semantic structure

==================================================
27. DESIGN SYSTEM

Create reusable components:

Button
Card
Badge
Avatar
Dropdown
Modal
Sidebar
Header
StudioSwitcher
StudioCard
MetricCard
ActivityItem
TaskItem
NotificationItem
ChartCard
EmptyState
CommandPalette
Toast

Maintain consistent:

spacing

typography

border radius

icon sizes

button styles

hover states

==================================================
28. MOCK DATA

Use realistic sample content.

Do not use lorem ipsum.

Example names:

ABC Fashion
Sholok News
My Blog
My Webtoon

Use realistic numbers such as:

248 Products
32 Orders
18 Articles
12 Drafts
125K Views
8.4K Followers

The data must clearly demonstrate how the interface works.

==================================================
29. NAVIGATION BEHAVIOR

Implement frontend-only navigation/state.

No backend.

Use mock routes or client-side state.

The following should work visually:

Dashboard
My Studios
Studio Switcher
Create Studio
Open Studio
Analytics
Notifications
Settings

Clicking Studio Switcher should change the active Studio.

The navigation should feel like a real product even though all data is mock data.

==================================================
30. IMPORTANT PRODUCT PHILOSOPHY

The dashboard is NOT a traditional "Admin Panel".

It is a:

"Creator & Business Command Center"

The user should feel:

"I have one Sholok account, and from here I can control everything I own or publish."

The experience should feel closer to:

Google Workspace
+
Naver ecosystem
+
Meta Business Suite
+
YouTube Studio
+
Shopify

but with a unique Sholok identity.

==================================================
31. FINAL VISUAL DIRECTION

Make the final interface:

Premium
Minimal
Modern
Elegant
Professional
Trustworthy
Fast
Organized
Highly scannable

Avoid generic dashboard templates.

Prioritize the "My Studios" concept and Studio switching experience.

The most visually important components are:

Global Studio Switcher

My Studios

Welcome / Command Center

Recent Activity

Needs Your Attention

Quick Actions

Global Analytics

Studio-specific dashboards

Build the complete frontend UI prototype with realistic mock data.

Again:

NO DATABASE.
NO API.
NO BACKEND.
NO AUTHENTICATION BACKEND.
NO SUPABASE.
NO FIREBASE.
NO ADMIN BACKEND.

ONLY DESIGN + FRONTEND INTERACTION + MOCK DATA.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://sholok-admin-studio-1.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/80542b10-fc9a-4ecb-9040-475ce5820f97).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
