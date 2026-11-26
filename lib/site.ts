
export const site = {
  name: "PixelCraft Web Studio",
  instagram: "https://instagram.com/pixelcraft.web.in",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pixelcraft.vercel.app",
  nav: [
    { href: "/", label: "Home" },
    { href: "/contact", label: "Contact" },
  ],
};

export const services = [
  { title: "Business websites", text: "Clear, fast sites that explain what you do and bring in enquiries." },
  { title: "Salon and beauty", text: "Booking-friendly sites with galleries and service menus." },
  { title: "Clinic and healthcare", text: "Trustworthy, accessible sites with appointment enquiry flows." },
  { title: "Travel and tourism", text: "Image-led sites for packages, itineraries and enquiries." },
  { title: "E-commerce", text: "Online stores built around a simple checkout." },
  { title: "Custom web apps", text: "Dashboards and tools built for how your business works." },
];

export const workflow = [
  { title: "Discover", text: "We learn your business, audience and goals." },
  { title: "Design", text: "You review layouts before any code is written." },
  { title: "Build", text: "We develop the site in Next.js and test on real devices." },
  { title: "Launch", text: "We deploy, connect your domain and hand over." },
];
