
interface Suggestion {
  label: string;
  icon: string;
  value: string;
  platform: string;
}

export const suggestionsDesign: Suggestion[] = [
  {
    label: "Landing Page SaaS",
    icon: "🚀",
    value: `SaaS landing page for an AI productivity tool. Hero section featuring a glowing abstract 3D orb on the right and bold sans-serif headline on the left. Glassmorphism navigation bar at the top. Below the fold, a 'Bento Box' style grid layout showcasing features. Desktop view. Style: Futuristic tech, deep purple and indigo gradients, clean and modern interface. High-tech and trustworthy vibe.`,
    platform: "website",
  },
  {
    label: "Dashboard Admin",
    icon: "📊",
    value: `Complex admin dashboard for data analytics. Dark sidebar navigation with crisp icons. Main content area featuring a large line chart with gradient fill, followed by detailed data tables with status badges. Top right user profile and notification bell. Desktop view. Style: Professional Enterprise UI, clean borders, neutral grays with blue primary actions, high information density but readable. Optimized for productivity.`,
    platform: "website",
  },
  {
    label: "Website Toko Online",
    icon: "🛍️",
    value: `Modern furniture store homepage. Clean layout with ample whitespace. Hero slider showing a cozy living room setup. "New Arrivals" section with card-less product display (just image, title, and price) to emphasize minimalism. Sticky navigation header. Desktop view. Style: Scandinavian minimalism, soft earth tones (beige, cream, sage), elegant serif typography for headings. Warm, organic, and premium atmosphere.`,
    platform: "website",
  },
  {
    label: "Aplikasi Keuangan",
    icon: "💸",
    value: `Finance app statistics screen. Current balance at top with dollar amount, bar chart showing spending over months (Oct-Mar) with month selector pills below, transaction list with app icons, amounts, and categories. Bottom navigation bar. Mobile app, single screen. Style: Dark theme, chunky rounded cards, playful but professional, modern sans-serif typography, Gen Z fintech vibe. Fun and fresh, not corporate.`,
    platform: "mobile",
  },
  {
    label: "Tracking Olahraga",
    icon: "🔥",
    value: `Fitness tracker summary screen. Large central circular progress ring showing steps and calories with neon glow. Line graph showing heart rate over time. Bottom section with grid of health metrics (Sleep, Water, SpO2). Mobile app, single screen. Style: Deep Dark Mode (OLED friendly). Pitch black background with electric neon green and vibrant blue accents. High contrast, data-heavy but organized, sleek and sporty aesthetic.`,
    platform: "mobile",
  },
  {
    label: "Delivery Makanan",
    icon: "🍔",
    value: `Food delivery home feed. Top search bar with location pin. Horizontal scrolling hero carousel of daily deals. Vertical list of restaurants with large delicious food thumbnails, delivery time badges, and rating stars. Floating Action Button (FAB) for cart. Mobile app, single screen. Style: Vibrant and Appetizing. Warm colors (orange, red, yellow), rounded card corners, subtle drop shadows to create depth. Friendly and inviting UI.`,
    platform: "mobile",
  },
];