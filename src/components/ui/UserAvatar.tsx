import React, { useState, useEffect } from "react";
import { generateInitialsSvg, getDefaultAvatar } from "@/lib/avatars";
import { Camera, Shield, Award, Sparkles } from "lucide-react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

interface UserAvatarProps {
  src?: string | null;
  name?: string | null;
  email?: string | null;
  size?: AvatarSize;
  className?: string;
  role?: "admin" | "moderator" | "user" | string;
  showRoleBadge?: boolean;
  showStatus?: boolean;
  status?: "online" | "offline" | "away";
  isEditable?: boolean;
  onEditClick?: () => void;
  alt?: string;
}

const sizeClasses: Record<AvatarSize, { container: string; text: string; icon: string; badge: string }> = {
  xs: { container: "w-6 h-6", text: "text-[10px]", icon: "h-2.5 w-2.5", badge: "w-2 h-2" },
  sm: { container: "w-8 h-8", text: "text-xs", icon: "h-3 w-3", badge: "w-2.5 h-2.5" },
  md: { container: "w-10 h-10", text: "text-sm", icon: "h-4 w-4", badge: "w-3 h-3" },
  lg: { container: "w-12 h-12", text: "text-base", icon: "h-4 w-4", badge: "w-3.5 h-3.5" },
  xl: { container: "w-16 h-16", text: "text-xl", icon: "h-5 w-5", badge: "w-4 h-4" },
  "2xl": { container: "w-24 h-24", text: "text-3xl", icon: "h-6 w-6", badge: "w-5 h-5" },
  "3xl": { container: "w-32 h-32", text: "text-4xl", icon: "h-8 w-8", badge: "w-6 h-6" },
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  name,
  email,
  size = "md",
  className = "",
  role,
  showRoleBadge = false,
  showStatus = false,
  status = "online",
  isEditable = false,
  onEditClick,
  alt,
}) => {
  const effectiveName = name || email?.split("@")[0] || "User";
  const [imgError, setImgError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);

  useEffect(() => {
    setImgError(false);
    if (src && src.trim().length > 0) {
      setCurrentSrc(src.trim());
    } else {
      // Use fallback default avatar
      setCurrentSrc(getDefaultAvatar(effectiveName, email || effectiveName));
    }
  }, [src, effectiveName, email]);

  const handleError = () => {
    if (!imgError) {
      setImgError(true);
      // Fall back to initials SVG Data URL which never fails
      setCurrentSrc(generateInitialsSvg(effectiveName));
    }
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  const roleIcon = () => {
    if (role === "admin") {
      return <Shield className="w-full h-full text-white fill-primary" />;
    }
    if (role === "moderator") {
      return <Award className="w-full h-full text-white fill-secondary" />;
    }
    return <Sparkles className="w-full h-full text-white fill-amber-500" />;
  };

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${currentSize.container} ${className}`}>
      {/* Avatar Image Shell */}
      <div
        className={`relative w-full h-full rounded-full overflow-hidden ring-2 ring-white/60 dark:ring-zinc-800/80 shadow-xs bg-surface-container transition-all ${
          isEditable ? "group cursor-pointer hover:ring-primary/60 hover:shadow-md" : ""
        }`}
        onClick={isEditable && onEditClick ? onEditClick : undefined}
      >
        {currentSrc ? (
          <img
            src={currentSrc}
            alt={alt || effectiveName}
            onError={handleError}
            className="w-full h-full object-cover select-none transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary text-white font-bold uppercase">
            <span className={currentSize.text}>{effectiveName.charAt(0)}</span>
          </div>
        )}

        {/* Hover Camera Overlay for Editable Mode */}
        {isEditable && (
          <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-200 flex flex-col items-center justify-center text-white">
            <Camera className={`${currentSize.icon} drop-shadow-xs animate-bounce`} />
            {(size === "2xl" || size === "3xl") && (
              <span className="text-[11px] font-bold mt-1 tracking-tight text-white/90">Change</span>
            )}
          </div>
        )}
      </div>

      {/* Online / Status Badge */}
      {showStatus && (
        <span
          className={`absolute bottom-0 right-0 rounded-full ring-2 ring-surface ${currentSize.badge} ${
            status === "online"
              ? "bg-emerald-500"
              : status === "away"
              ? "bg-amber-500"
              : "bg-zinc-400"
          }`}
          title={`Status: ${status}`}
        />
      )}

      {/* Role Badge Indicator */}
      {showRoleBadge && role && (role === "admin" || role === "moderator") && (
        <div
          className={`absolute -top-1 -right-1 rounded-full p-0.5 shadow-sm ring-1 ring-surface ${
            role === "admin" ? "bg-primary text-white" : "bg-secondary text-white"
          } ${size === "xs" || size === "sm" ? "w-3 h-3" : "w-4 h-4"}`}
          title={role === "admin" ? "Platform Administrator" : "Community Moderator"}
        >
          {roleIcon()}
        </div>
      )}
    </div>
  );
};
