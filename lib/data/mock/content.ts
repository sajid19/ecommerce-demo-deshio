import type { Announcement, Banner, Collection, Customer, Order, PolicyPage, Store } from "../types";

export const announcements: Announcement[] = [
  { id: 1, text: "Pohela Boishakh collection is live — up to 25% off", href: "/collections/boishakh" },
  { id: 2, text: "Free delivery on orders above ৳5,000 inside Dhaka", href: "/policies/shipping" },
  { id: 3, text: "New Jamdani arrivals every Friday", href: "/new-arrivals" },
  { id: 4, text: "Visit our new Mirpur store", href: "/stores" },
];

export const banners: Banner[] = [
  { id: 1, title: "Heritage Jamdani", subtitle: "Woven by hand, worn for generations", cta: "Shop Jamdani", href: "/category/jamdani-saree", hue: 15, image: "/hero/jamdani.webp", imageMobile: "/hero/jamdani-m.webp" },
  { id: 2, title: "Festive Sarees", subtitle: "Tissue, silk and monipuri for the season", cta: "Shop Sarees", href: "/category/saree", hue: 35, image: "/hero/saree.webp", imageMobile: "/hero/saree-m.webp" },
  { id: 3, title: "Crafted Jewellery", subtitle: "Necklace sets, jhumka and bangles, finished by hand", cta: "Shop Jewellery", href: "/category/jewellery", hue: 85, image: "/hero/jewel.webp", imageMobile: "/hero/jewel-m.webp" },
  { id: 4, title: "For Your Home", subtitle: "Table sets, rugs and bedsheets by local artisans", cta: "Shop Home Decor", href: "/category/home-decor", hue: 55, image: "/hero/decor.webp", imageMobile: "/hero/decor-m.webp" },
  { id: 5, title: "Fresh from Doi Ghor", subtitle: "Sandesh, ghee and butter, delivered fresh", cta: "Shop Food", href: "/category/food", hue: 70, image: "/hero/food.webp", imageMobile: "/hero/food-m.webp" },
];

export const collections: Collection[] = [
  { id: 1, slug: "boishakh", name: "Boishakh Collection", description: "Festive colours for Pohela Boishakh.", hue: 35 },
  { id: 2, slug: "eid", name: "Eid Edit", description: "Dress for Eid with our festive picks.", hue: 160 },
  { id: 3, slug: "wedding", name: "Wedding Season", description: "Sarees, jewellery and gifts for the big day.", hue: 340 },
];

export const trustBadges = [
  { icon: "truck", en: "Fastest Shipping Nationwide", bn: "সারাদেশে দ্রুত ডেলিভারি" },
  { icon: "landmark", en: "Authentic Heritage Collection", bn: "ঐতিহ্যবাহী ও অরিজিনাল কালেকশন" },
  { icon: "award", en: "Premium Quality Products", bn: "প্রিমিয়াম মানের পণ্য" },
  { icon: "headset", en: "Dedicated Customer Support", bn: "গ্রাহকদের জন্য নিবেদিত কাস্টমার সাপোর্ট" },
] as const;

export const stores: Store[] = [
  { id: 1, slug: "bashundhara-city", name: "Bashundhara City", address: "Level 5, Bashundhara City Shopping Complex, Panthapath, Dhaka 1215", phone: "+8801700000001", hours: "Sat–Thu 10:00–21:00 · Fri 14:00–21:00", lat: 23.7513, lng: 90.3908, image: "/brand/Bashundhara_shopping_mall.png" },
  { id: 2, slug: "jamuna-future-park", name: "Jamuna Future Park", address: "Level 4, Jamuna Future Park, Kuril, Dhaka 1229", phone: "+8801700000002", hours: "Sat–Thu 10:00–21:30 · Fri 14:00–21:30", lat: 23.8138, lng: 90.4244, image: "/brand/Jamuna_Future_Park.png" },
  { id: 3, slug: "mirpur", name: "Mirpur", address: "Mirpur 10 Circle, Dhaka 1216", phone: "+8801700000003", hours: "Sat–Thu 10:00–21:00 · Fri 14:00–21:00", lat: 23.8069, lng: 90.3687, image: "/brand/Mirpure_store.png" },
];

export const siteInfo = {
  name: "Deshio",
  nameBn: "দেশীয়",
  tagline: "Heritage of Bangladesh, delivered",
  hotline: "+8801700000000",
  hotlineLabel: "+880 1700-000000",
  email: "care@deshio.example",
  managementEmail: "management@deshio.example",
  hours: "Every day 9:00–22:00",
  headOffice: "House 00, Road 00, Dhanmondi, Dhaka 1209",
  social: [
    { name: "Facebook", href: "https://facebook.com" },
    { name: "Instagram", href: "https://instagram.com" },
    { name: "YouTube", href: "https://youtube.com" },
  ],
  nodalOfficer: { name: "Grievance Officer (name to be confirmed)", phone: "+8801700000009", email: "grievance@deshio.example" },
};

export const customer: Customer = {
  name: "Nusrat Jahan",
  phone: "01711000000",
  email: "nusrat@example.com",
  addresses: [
    { id: 1, label: "Home", line: "House 12, Road 5, Dhanmondi", district: "Dhaka", is_default: true },
    { id: 2, label: "Office", line: "Level 7, Gulshan Avenue", district: "Dhaka", is_default: false },
  ],
};

const t = (iso: string | null) => iso;
export const orders: Order[] = [
  {
    order_number: "DS-100234", invoice_number: "INV-100234", phone: "01711000000", status: "shipped", placed_at: "2026-10-18T10:20:00Z",
    lines: [{ product_slug: "60-count-jamdani-mint-green", name: "60 Count Jamdani — Mint Green", quantity: 1, unit_price: 3900 }],
    subtotal: 3900, delivery_charge: 0, total: 3900, payment: "bKash", address: "House 12, Road 5, Dhanmondi, Dhaka",
    timeline: [
      { status: "placed", at: t("2026-10-18T10:20:00Z") }, { status: "confirmed", at: t("2026-10-18T11:05:00Z") },
      { status: "packed", at: t("2026-10-19T09:30:00Z") }, { status: "shipped", at: t("2026-10-20T14:00:00Z") },
      { status: "delivered", at: null },
    ],
  },
  {
    order_number: "DS-100198", invoice_number: "INV-100198", phone: "01711000000", status: "delivered", placed_at: "2026-10-05T16:40:00Z",
    lines: [
      { product_slug: "tote-bag-tan", name: "Tote Bag — Tan", quantity: 2, unit_price: 1350 },
      { product_slug: "pearl-jhumka-earrings", name: "Pearl Jhumka Earrings", quantity: 1, unit_price: 550 },
    ],
    subtotal: 3250, delivery_charge: 80, total: 3330, payment: "Cash on Delivery", address: "House 12, Road 5, Dhanmondi, Dhaka",
    timeline: [
      { status: "placed", at: t("2026-10-05T16:40:00Z") }, { status: "confirmed", at: t("2026-10-05T17:10:00Z") },
      { status: "packed", at: t("2026-10-06T10:00:00Z") }, { status: "shipped", at: t("2026-10-06T15:00:00Z") },
      { status: "delivered", at: t("2026-10-08T12:30:00Z") },
    ],
  },
];

export const policies: PolicyPage[] = [
  { slug: "privacy", title: "Privacy Policy", summary: "How Deshio collects, uses and protects your information.", sections: [
    { heading: "What we collect", body: "Name, phone number, delivery address and order history that you give us when you shop or create an account." },
    { heading: "How we use it", body: "To process and deliver orders, provide support and send updates you have asked for. We never sell personal data." },
    { heading: "Your choices", body: "You can ask us to correct or delete your account data at any time by contacting customer care." },
  ] },
  { slug: "shipping", title: "Shipping Policy", summary: "Delivery areas, charges and timelines.", sections: [
    { heading: "Inside Dhaka", body: "1–2 working days. Flat ৳80 delivery charge; free above ৳5,000." },
    { heading: "Outside Dhaka", body: "3–5 working days. Flat ৳130 delivery charge." },
    { heading: "Tracking", body: "Use the Track Order page with your mobile or invoice number to see live status." },
  ] },
  { slug: "return-exchange", title: "Return & Exchange Policy", summary: "Simple returns and exchanges within 7 days.", sections: [
    { heading: "Eligibility", body: "Unused items in original packaging can be returned or exchanged within 7 days of delivery." },
    { heading: "Non-returnable", body: "Perishable Doi Ghor items and custom-tailored pieces." },
    { heading: "How to start", body: "Contact customer care with your invoice number; we arrange pickup." },
  ] },
  { slug: "payment-refund", title: "Payment & Refund Policy", summary: "Accepted payment methods and refund timelines.", sections: [
    { heading: "Payment methods", body: "Cash on Delivery, bKash, Nagad, Rocket and major cards." },
    { heading: "Refunds", body: "Approved refunds return to the original payment method within 5–7 working days." },
  ] },
];
