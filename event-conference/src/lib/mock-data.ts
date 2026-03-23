export type Track = "Main Stage" | "Growth" | "Design" | "After Dark";

export type Speaker = {
  id: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  talkTitle: string;
  social: {
    x: string;
    linkedin: string;
  };
  palette: string;
};

export type Talk = {
  id: string;
  day: "Day 1" | "Day 2" | "Day 3";
  time: string;
  title: string;
  speakerId: string;
  track: Track;
  room: string;
};

export type TicketTier = {
  id: string;
  name: string;
  price: number;
  tagline: string;
  features: string[];
  featured?: boolean;
};

export type Attendee = {
  id: string;
  name: string;
  email: string;
  company: string;
  ticketType: string;
  checkedIn: boolean;
};

export const event = {
  name: "Voltage Summit 2026",
  shortName: "Voltage",
  dateLabel: "September 18-20, 2026",
  countdownTarget: "2026-09-18T09:00:00-04:00",
  location: "Toronto, Canada",
  venue: "The Bentway + Stackt Market",
  capacity: 2500,
  highlights: [
    "4,200+ founders, operators, artists, and builders",
    "12 immersive stage moments with reactive visuals",
    "Night sessions, rooftop sets, and founder office hours",
    "Live demos, creative tech installations, and mentor labs",
  ],
  stats: [
    { label: "Attendees", value: "2.5K" },
    { label: "Speakers", value: "40+" },
    { label: "Tracks", value: "4" },
    { label: "Cities Represented", value: "28" },
  ],
};

export const trackStyles: Record<Track, string> = {
  "Main Stage": "bg-[#FF2D78]/18 text-[#FF2D78] border-[#FF2D78]/30",
  Growth: "bg-[#52F4FF]/14 text-[#52F4FF] border-[#52F4FF]/30",
  Design: "bg-[#FFC857]/14 text-[#FFC857] border-[#FFC857]/30",
  "After Dark": "bg-[#7DFF98]/14 text-[#7DFF98] border-[#7DFF98]/30",
};

export const speakers: Speaker[] = [
  {
    id: "nova-chen",
    name: "Nova Chen",
    title: "Creative Technologist",
    company: "Aether Labs",
    bio: "Nova builds live experiences where AI visuals, stagecraft, and product storytelling collide without losing emotional clarity.",
    talkTitle: "Building Hype Systems That Actually Ship",
    social: { x: "https://x.com/novachen", linkedin: "https://linkedin.com/in/novachen" },
    palette: "from-[#FF2D78] via-[#8D1CFF] to-[#050505]",
  },
  {
    id: "isaiah-brooks",
    name: "Isaiah Brooks",
    title: "Head of Growth",
    company: "Northstar Ventures",
    bio: "Isaiah advises launch-stage teams on turning demand spikes into durable revenue loops and repeatable community growth.",
    talkTitle: "The New Launch Week Playbook",
    social: { x: "https://x.com/isaiahbrooks", linkedin: "https://linkedin.com/in/isaiahbrooks" },
    palette: "from-[#52F4FF] via-[#FF2D78] to-[#050505]",
  },
  {
    id: "maya-sato",
    name: "Maya Sato",
    title: "Design Director",
    company: "Prism Studio",
    bio: "Maya leads visual systems that bridge performance branding, motion identity, and interface design for culture-first products.",
    talkTitle: "Interfaces With Stage Presence",
    social: { x: "https://x.com/mayasato", linkedin: "https://linkedin.com/in/mayasato" },
    palette: "from-[#FFC857] via-[#FF2D78] to-[#050505]",
  },
  {
    id: "leon-mercer",
    name: "Leon Mercer",
    title: "Founder",
    company: "Signal Run",
    bio: "Leon helps small teams use automation and event-led distribution to punch far above their actual size.",
    talkTitle: "Community as a Revenue Engine",
    social: { x: "https://x.com/leonmercer", linkedin: "https://linkedin.com/in/leonmercer" },
    palette: "from-[#7DFF98] via-[#52F4FF] to-[#050505]",
  },
  {
    id: "amira-elias",
    name: "Amira Elias",
    title: "VP Product",
    company: "FrameGrid",
    bio: "Amira translates messy signal into product bets, aligning design, engineering, and storytelling around high-conviction experiments.",
    talkTitle: "Shipping Product Narratives, Not Feature Lists",
    social: { x: "https://x.com/amiraelias", linkedin: "https://linkedin.com/in/amiraelias" },
    palette: "from-[#ffffff] via-[#FF2D78] to-[#050505]",
  },
  {
    id: "noah-ibarra",
    name: "Noah Ibarra",
    title: "AI Experience Lead",
    company: "Rare Signal",
    bio: "Noah works on generative interfaces that feel performative, useful, and unmistakably human in motion.",
    talkTitle: "AI Demos That Don’t Feel Like Demos",
    social: { x: "https://x.com/noahibarra", linkedin: "https://linkedin.com/in/noahibarra" },
    palette: "from-[#FF2D78] via-[#52F4FF] to-[#050505]",
  },
  {
    id: "sana-patel",
    name: "Sana Patel",
    title: "Founder & Host",
    company: "K2 Digital Media",
    bio: "Sana curates cultural moments for ambitious brands and knows how to make conference programming feel alive.",
    talkTitle: "Why Premium Events Need Editorial Taste",
    social: { x: "https://x.com/sanapatel", linkedin: "https://linkedin.com/in/sanapatel" },
    palette: "from-[#FF2D78] via-[#FFC857] to-[#050505]",
  },
  {
    id: "julian-cross",
    name: "Julian Cross",
    title: "Revenue Strategy Lead",
    company: "Pilot House",
    bio: "Julian specializes in aligning sponsorships, ticketing, and post-event offers into a single monetization arc.",
    talkTitle: "Monetizing the Moment Without Killing the Vibe",
    social: { x: "https://x.com/juliancross", linkedin: "https://linkedin.com/in/juliancross" },
    palette: "from-[#52F4FF] via-[#7DFF98] to-[#050505]",
  },
  {
    id: "riley-kim",
    name: "Riley Kim",
    title: "Experience Producer",
    company: "Supercurrent",
    bio: "Riley produces launch events, immersive rooms, and late-night programs that extend brand memory far past the close.",
    talkTitle: "Night Programming as Brand Strategy",
    social: { x: "https://x.com/rileykim", linkedin: "https://linkedin.com/in/rileykim" },
    palette: "from-[#8D1CFF] via-[#FF2D78] to-[#050505]",
  },
  {
    id: "darius-ford",
    name: "Darius Ford",
    title: "CTO",
    company: "Pulseform",
    bio: "Darius leads engineering teams building event products with realtime check-in, personalization, and operational resilience.",
    talkTitle: "Scaling Real-Time Event Systems",
    social: { x: "https://x.com/dariusford", linkedin: "https://linkedin.com/in/dariusford" },
    palette: "from-[#ffffff] via-[#52F4FF] to-[#050505]",
  },
  {
    id: "elena-park",
    name: "Elena Park",
    title: "Brand Architect",
    company: "Magnet House",
    bio: "Elena shapes visual identities that can move cleanly across motion, physical installations, social cuts, and product UI.",
    talkTitle: "Creating Brands That Move",
    social: { x: "https://x.com/elenapark", linkedin: "https://linkedin.com/in/elenapark" },
    palette: "from-[#FFC857] via-[#ffffff] to-[#050505]",
  },
  {
    id: "malik-owens",
    name: "Malik Owens",
    title: "Partnerships Director",
    company: "Nightline",
    bio: "Malik structures event partnerships that feel additive to the audience instead of obvious sponsor clutter.",
    talkTitle: "How Sponsors Earn Attention",
    social: { x: "https://x.com/malikowens", linkedin: "https://linkedin.com/in/malikowens" },
    palette: "from-[#7DFF98] via-[#FFC857] to-[#050505]",
  },
];

export const schedule: Talk[] = [
  { id: "t1", day: "Day 1", time: "09:00", title: "Doors, Soundcheck, and First Contact", speakerId: "sana-patel", track: "Main Stage", room: "Hangar A" },
  { id: "t2", day: "Day 1", time: "09:45", title: "Why Premium Events Need Editorial Taste", speakerId: "sana-patel", track: "Main Stage", room: "Hangar A" },
  { id: "t3", day: "Day 1", time: "10:30", title: "The New Launch Week Playbook", speakerId: "isaiah-brooks", track: "Growth", room: "Signal Room" },
  { id: "t4", day: "Day 1", time: "11:15", title: "Interfaces With Stage Presence", speakerId: "maya-sato", track: "Design", room: "Vector Hall" },
  { id: "t5", day: "Day 1", time: "12:15", title: "Community as a Revenue Engine", speakerId: "leon-mercer", track: "Growth", room: "Signal Room" },
  { id: "t6", day: "Day 1", time: "14:00", title: "Building Hype Systems That Actually Ship", speakerId: "nova-chen", track: "Main Stage", room: "Hangar A" },
  { id: "t7", day: "Day 1", time: "16:30", title: "Night Programming as Brand Strategy", speakerId: "riley-kim", track: "After Dark", room: "Warehouse 3" },
  { id: "t8", day: "Day 2", time: "09:30", title: "Shipping Product Narratives, Not Feature Lists", speakerId: "amira-elias", track: "Main Stage", room: "Hangar A" },
  { id: "t9", day: "Day 2", time: "10:15", title: "AI Demos That Don’t Feel Like Demos", speakerId: "noah-ibarra", track: "Design", room: "Vector Hall" },
  { id: "t10", day: "Day 2", time: "11:00", title: "Scaling Real-Time Event Systems", speakerId: "darius-ford", track: "Main Stage", room: "Hangar A" },
  { id: "t11", day: "Day 2", time: "11:45", title: "How Sponsors Earn Attention", speakerId: "malik-owens", track: "Growth", room: "Signal Room" },
  { id: "t12", day: "Day 2", time: "13:00", title: "Creating Brands That Move", speakerId: "elena-park", track: "Design", room: "Vector Hall" },
  { id: "t13", day: "Day 2", time: "14:30", title: "Monetizing the Moment Without Killing the Vibe", speakerId: "julian-cross", track: "Growth", room: "Signal Room" },
  { id: "t14", day: "Day 2", time: "17:00", title: "Warehouse Sessions: Founder Hot Takes", speakerId: "leon-mercer", track: "After Dark", room: "Warehouse 3" },
  { id: "t15", day: "Day 3", time: "09:15", title: "Motion Systems for Live Interfaces", speakerId: "nova-chen", track: "Design", room: "Vector Hall" },
  { id: "t16", day: "Day 3", time: "10:00", title: "Retention Starts Before the Event Ends", speakerId: "isaiah-brooks", track: "Growth", room: "Signal Room" },
  { id: "t17", day: "Day 3", time: "11:00", title: "Operator AMA: Building the Room and the Business", speakerId: "amira-elias", track: "Main Stage", room: "Hangar A" },
  { id: "t18", day: "Day 3", time: "12:00", title: "VIP Studio Critique", speakerId: "maya-sato", track: "Design", room: "Vector Hall" },
  { id: "t19", day: "Day 3", time: "14:00", title: "Closing Keynote: The Future Feels Live", speakerId: "darius-ford", track: "Main Stage", room: "Hangar A" },
  { id: "t20", day: "Day 3", time: "16:00", title: "Sunset Rooftop Set", speakerId: "riley-kim", track: "After Dark", room: "Rooftop" },
];

export const ticketTiers: TicketTier[] = [
  {
    id: "early-bird",
    name: "Early Bird",
    price: 249,
    tagline: "For fast movers who want full conference access.",
    features: ["3-day general admission", "Main stage + track sessions", "Partner lounge access", "Digital replay pass"],
  },
  {
    id: "standard",
    name: "Standard",
    price: 399,
    tagline: "The core Voltage experience with more room to connect.",
    features: ["Everything in Early Bird", "Priority check-in lane", "Speaker AMA access", "Night sessions included"],
    featured: true,
  },
  {
    id: "vip",
    name: "VIP",
    price: 799,
    tagline: "Concierge-level access for founders, partners, and teams.",
    features: ["Everything in Standard", "VIP studio lounge", "Founder dinner", "Front-row seating + gifting"],
  },
];

export const attendees: Attendee[] = [
  { id: "a1", name: "Charlotte Reid", email: "charlotte@northpeak.co", company: "Northpeak", ticketType: "VIP", checkedIn: true },
  { id: "a2", name: "Ethan Wallace", email: "ethan@fieldnotes.io", company: "Field Notes", ticketType: "Standard", checkedIn: false },
  { id: "a3", name: "Priya Desai", email: "priya@signalrun.com", company: "Signal Run", ticketType: "Early Bird", checkedIn: true },
  { id: "a4", name: "Marco Silva", email: "marco@pulseform.ai", company: "Pulseform", ticketType: "Standard", checkedIn: false },
  { id: "a5", name: "Nina Alvarez", email: "nina@aetherlabs.co", company: "Aether Labs", ticketType: "VIP", checkedIn: true },
  { id: "a6", name: "Jordan Price", email: "jordan@magnethouse.co", company: "Magnet House", ticketType: "Early Bird", checkedIn: false },
  { id: "a7", name: "Sofia Bennett", email: "sofia@supercurrent.fm", company: "Supercurrent", ticketType: "Standard", checkedIn: true },
  { id: "a8", name: "Micah Stern", email: "micah@k2dm.ca", company: "K2 Digital Media", ticketType: "VIP", checkedIn: false },
];

export const dashboardMetrics = {
  sold: 1876,
  revenue: 612430,
  registrationsToday: 43,
  breakdown: [
    { name: "Early Bird", value: 542, fill: "#52F4FF" },
    { name: "Standard", value: 924, fill: "#FF2D78" },
    { name: "VIP", value: 410, fill: "#FFC857" },
  ],
};
