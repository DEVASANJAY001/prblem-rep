import React from "react";
import { Link } from "react-router-dom";
import { CompanyDoc } from "@/types";
import { CompanyLogo } from "@/components/ui/CompanyLogo";
import { Building2 } from "lucide-react";

interface CompanyCardProps {
  company: CompanyDoc;
  problemsCount?: number;
  className?: string;
  onClick?: () => void;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({
  company,
  className = "",
  onClick,
}) => {
  const cardContent = (
    <article
      onClick={onClick}
      className={`bg-white/95 rounded-3xl border border-gray-100/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_2px_8px_-2px_rgba(0,0,0,0.03)] hover:shadow-[0_14px_36px_-6px_rgba(22,87,255,0.12)] transition-all duration-300 p-6 relative overflow-hidden group flex flex-col justify-between cursor-pointer font-['Poppins',sans-serif] min-h-[140px] ${className}`}
    >
      {/* Ambient Faded Company Logo Watermark in Background */}
      <div className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 pointer-events-none group-hover:scale-110 group-hover:opacity-15 transition-all duration-300 flex items-center justify-center select-none overflow-hidden">
        {company.logoUrl ? (
          <img
            src={company.logoUrl}
            alt={company.name}
            className="w-full h-full object-contain grayscale"
          />
        ) : (
          <Building2 className="w-24 h-24 text-gray-400" />
        )}
      </div>

      {/* Company Logo on Left (Direct with border, no extra inner container box) */}
      <div className="relative z-10">
        <CompanyLogo
          name={company.name}
          logoUrl={company.logoUrl}
          size="lg"
          className="w-12 h-12 rounded-2xl border border-gray-200/80 group-hover:scale-105 transition-transform duration-300 shadow-2xs"
        />
      </div>

      {/* Company Name Inside the Card */}
      <div className="relative z-10 mt-4">
        <h3 className="text-base md:text-lg font-bold text-gray-900 truncate group-hover:text-primary transition-colors">
          {company.name}
        </h3>
      </div>
    </article>
  );

  if (onClick) {
    return cardContent;
  }

  return (
    <Link to={`/companies?company=${encodeURIComponent(company.name)}`} className="block w-full">
      {cardContent}
    </Link>
  );
};
