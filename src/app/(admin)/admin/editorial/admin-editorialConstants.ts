import type { Article, EditorialStats, StatusFilterOption, CategoryFilterOption, ArticleCategory } from "./admin-editorialTypes"; 

// ─── Stats ────────────────────────────────────────────────────────────────────

export const EDITORIAL_STATS: EditorialStats = {
  totalArticles: 146,
  published: 98,
  drafts: 42,
  totalViews: "45.2K",
};

// ─── Articles ─────────────────────────────────────────────────────────────────

export const ARTICLES: Article[] = [
  {
    id: "1",
    title: "10 Tips for Starting a Successful Food Business in Nigeria",
    excerpt: "Learn the essential steps to launch and grow your food business in today's competitive market...",
    content: "Starting a food business in Nigeria can be both exciting and challenging. With a population of over 200 million people and a growing middle class, the food industry offers tremendous opportunities for entrepreneurs.\n\n1. Start with market research\nUnderstand your target audience, their preferences, and spending habits before investing. Visit local markets, interview potential customers, and analyze competitors.\n\n2. Get the right licences\nRegister with NAFDAC and obtain all necessary food handler certificates. Operating without proper licences can lead to shutdowns and fines.\n\n3. Source quality ingredients\nBuild relationships with reliable local suppliers. Quality ingredients directly impact customer satisfaction and repeat business.\n\n4. Price strategically\nFactor in all costs — ingredients, labour, packaging, transport — before setting prices. Many new vendors undercharge and struggle to stay profitable.\n\n5. Invest in packaging\nFirst impressions matter. Professional packaging signals quality and builds trust, especially for online and delivery orders.",
    category: "Business Tips",
    author: "Admin Team",
    date: "May 28, 2026",
    views: 2456,
    status: "Published",
    featured: true,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
  },
  {
    id: "2",
    title: "The Rise of Organic Foods: What Vendors Need to Know",
    excerpt: "Discover the growing demand for organic products and how to tap into this lucrative market...",
    content: "The organic food market in Nigeria is growing at an estimated 15% annually, driven by health-conscious urban consumers and diaspora returnees accustomed to international standards.\n\nWhat counts as organic?\nOrganic products are grown without synthetic pesticides, fertilisers, or GMO seeds. Certification bodies like OFAN (Organic Farmers Association of Nigeria) can help you get recognised.\n\nWhere to source organic products\nSmallholder farms in Plateau, Kaduna, and Oyo states are increasingly adopting organic practices. Building direct farm partnerships gives you fresher stock and better margins than buying through middlemen.\n\nPricing premium products\nOrganic customers expect to pay more — typically 20–40% above conventional prices. Be transparent about why your products cost more; educated consumers will pay for provenance.",
    category: "Market Trends",
    author: "Sarah Johnson",
    date: "May 25, 2026",
    views: 1823,
    status: "Published",
    featured: false,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
  },
  {
    id: "3",
    title: "Best Practices for Food Safety and Hygiene",
    excerpt: "Essential guidelines every food vendor must follow to ensure customer safety and compliance...",
    content: "Food safety is not optional — it is a legal requirement and a moral obligation. Contaminated food causes illness, destroys reputations, and can result in criminal liability.\n\nPersonal hygiene\nWash hands with soap and water for at least 20 seconds before handling food, after using the bathroom, and after touching raw meat. Wear clean gloves when preparing ready-to-eat foods.\n\nStorage temperatures\nKeep cold foods below 5°C and hot foods above 63°C. The danger zone (5–63°C) is where bacteria multiply most rapidly. Invest in a reliable thermometer and check temperatures regularly.\n\nCross-contamination prevention\nUse separate cutting boards and utensils for raw meat, vegetables, and cooked foods. Colour-coded boards (red for raw meat, green for vegetables) reduce mistakes.\n\nCleaning schedules\nDeep clean all surfaces, equipment, and storage areas at least weekly. Daily cleaning of high-touch surfaces is essential during peak service hours.",
    category: "Safety & Compliance",
    author: "Dr. Michael Obi",
    date: "May 22, 2026",
    views: 0,
    status: "Draft",
    featured: false,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
  },
  {
    id: "4",
    title: "How to Optimize Your Product Listings for Better Sales",
    excerpt: "Master the art of creating compelling product descriptions and images that convert...",
    content: "Your product listing is your digital shop window. A poorly written listing with bad photos loses sales regardless of how good the product actually is.\n\nWrite for the customer, not for yourself\nDescribe benefits, not just features. Instead of 'contains turmeric', write 'anti-inflammatory spice blend that boosts immunity and adds rich colour to your jollof rice'.\n\nPhoto quality matters most\nUse natural light, a clean background, and shoot from multiple angles. A ₦15,000 ring light investment can dramatically improve your conversion rate.\n\nUse relevant keywords\nThink about what customers search for. 'Homemade tomato paste Lagos delivery' will get more relevant traffic than simply 'tomato paste'.\n\nSet competitive prices\nCheck 3–5 competitor listings weekly. Being 10–15% higher than average is fine if your photos and description justify the premium.",
    category: "Marketing",
    author: "Admin Team",
    date: "May 20, 2026",
    views: 3102,
    status: "Published",
    featured: true,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    id: "5",
    title: "Understanding Customer Behavior in Food E-commerce",
    excerpt: "Insights into what drives online food shoppers and how to meet their expectations...",
    content: "Online food shoppers behave very differently from in-store customers. Understanding these differences lets you optimise your offering and reduce cart abandonment.\n\nDecision triggers\nOnline shoppers are most influenced by: reviews and ratings (82%), photos (74%), price (68%), and delivery speed (61%). Prioritise these elements in your listings.\n\nCart abandonment\nThe average cart abandonment rate for food e-commerce is 71%. The top reasons are unexpected delivery fees, slow delivery estimates, and requiring account creation. Offer guest checkout and show delivery costs upfront.\n\nRepeat purchase behaviour\nCustomers who receive their first order within 48 hours are 3x more likely to reorder within 30 days. Invest in reliable logistics before scaling marketing spend.",
    category: "Customer Insights",
    author: "Emily Chen",
    date: "Jun 5, 2026",
    views: 0,
    status: "Scheduled",
    featured: false,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
  },
  {
    id: "6",
    title: "Seasonal Food Trends to Watch in 2026",
    excerpt: "Stay ahead of the curve with these upcoming food trends that will shape the market...",
    content: "Food trends in Nigeria are increasingly influenced by global social media, returning diaspora, and a young urban population willing to experiment.\n\nFermented foods\nKombucha, kefir, and locally fermented grains like ogi and nono are gaining mainstream appeal as consumers learn about gut health. Vendors offering artisan fermented products can command 2–3x premium pricing.\n\nPlant-based proteins\nWhile meat remains dominant, a growing segment — particularly young women aged 18–35 — is actively reducing red meat consumption. Bean-based, mushroom-based, and soy products have headroom for growth.\n\nConvenience meals\nDual-income households have less time to cook. Meal kits, pre-marinated proteins, and frozen home-meal replacements are the fastest-growing category on major food delivery platforms.\n\nLocal superfood spotlight\nTigernut (ofio), moringa, and baobab are attracting global attention. Nigerian vendors who can package and market these to both local health-conscious consumers and export markets have a significant first-mover advantage.",
    category: "Market Trends",
    author: "James Wilson",
    date: "May 15, 2026",
    views: 1567,
    status: "Published",
    featured: false,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
  },
];

// ─── Filter Options ────────────────────────────────────────────────────────────

export const STATUS_FILTER_OPTIONS: StatusFilterOption[] = [
  "All Status",
  "Published",
  "Draft",
  "Scheduled",
];

export const CATEGORY_FILTER_OPTIONS: CategoryFilterOption[] = [
  "All Categories",
  "Business Tips",
  "Market Trends",
  "Safety & Compliance",
  "Marketing",
  "Customer Insights",
];

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  "Business Tips",
  "Market Trends",
  "Safety & Compliance",
  "Marketing",
  "Customer Insights",
];
