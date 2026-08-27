// Avatar presets and helper utilities for ProblemAtlas

export interface AvatarPreset {
  id: string;
  label: string;
  category: "Architect" | "Scout" | "Founder" | "Researcher" | "Developer" | "General";
  url: string;
}

export const AVATAR_PRESETS: AvatarPreset[] = [
  {
    id: "preset_1",
    label: "Alex - Tech Founder",
    category: "Founder",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80",
  },
  {
    id: "preset_2",
    label: "Marcus - Venture Partner",
    category: "Architect",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&auto=format&fit=crop&q=80",
  },
  {
    id: "preset_3",
    label: "Elena - Clinical Researcher",
    category: "Researcher",
    url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=240&auto=format&fit=crop&q=80",
  },
  {
    id: "preset_4",
    label: "David - Systems Architect",
    category: "Developer",
    url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&auto=format&fit=crop&q=80",
  },
  {
    id: "preset_5",
    label: "Sarah - Product Scout",
    category: "Scout",
    url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=240&auto=format&fit=crop&q=80",
  },
  {
    id: "preset_6",
    label: "Kenji - Hardware Engineer",
    category: "Developer",
    url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=240&auto=format&fit=crop&q=80",
  },
  {
    id: "preset_7",
    label: "Amina - BioTech Innovator",
    category: "Researcher",
    url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=240&auto=format&fit=crop&q=80",
  },
  {
    id: "preset_8",
    label: "Liam - AI Researcher",
    category: "Researcher",
    url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=240&auto=format&fit=crop&q=80",
  },
];

/**
 * Returns a high-reliability SVG or DiceBear/UI-Avatars fallback URL for any user.
 */
export function getDefaultAvatar(name?: string, seed?: string): string {
  const cleanName = (name || "Innovator").trim();
  const avatarSeed = encodeURIComponent(seed || cleanName || "Innovator");
  
  // High availability UI avatar generator with modern gradient aesthetic
  return `https://api.dicebear.com/7.x/notionists/svg?seed=${avatarSeed}&backgroundColor=e2e8f0,fed7aa,fef08a,dcfce7,e0e7ff,f3e8ff`;
}

/**
 * Generates an SVG Data URI as a zero-network-latency fallback avatar
 */
export function generateInitialsSvg(name?: string, size = 120): string {
  const initial = (name?.charAt(0) || "U").toUpperCase();
  const colors = [
    ["#1657FF", "#0039CB"],
    ["#7C3AED", "#5B21B6"],
    ["#059669", "#047857"],
    ["#D97706", "#B45309"],
    ["#DC2626", "#B91C1C"],
    ["#0284C7", "#0369A1"],
  ];
  
  const charCode = (name?.charCodeAt(0) || 65) % colors.length;
  const [c1, c2] = colors[charCode];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" rx="${size / 2}" fill="url(#g)"/>
    <text x="50%" y="54%" font-family="system-ui, -apple-system, sans-serif" font-size="${size * 0.45}" font-weight="700" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${initial}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
