import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { subscribeCompanies } from "@/lib/firebase/services/companiesService";
import { CompanyDoc } from "@/types";
import {
  Search,
  Building2,
  Trophy,
  Award,
  ArrowRight,
  ExternalLink,
  PlusCircle,
  Briefcase,
  CheckCircle2,
} from "lucide-react";

export const Companies: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [companiesList, setCompaniesList] = useState<CompanyDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeCompanies((list) => {
      setCompaniesList(list);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filtered = companiesList.filter(
    (c) =>
      !c.hidden &&
      (c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.industry.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
          Companies & Ventures
        </h1>
        <p className="mt-1 text-xs text-zinc-500">
          Discover enterprise partners scouting verified problem statements and funding bounties.
        </p>

        {/* Filter Row */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search companies or industries..."
              className="w-full rounded-full border border-zinc-200 bg-white py-2 pl-9 pr-4 text-xs font-medium placeholder-zinc-400 shadow-xs focus:border-[#1657FF] focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
            />
          </div>
          <button
            onClick={() => navigate("/submit")}
            className="flex items-center gap-1.5 rounded-full bg-[#1657FF] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#0E47E6] transition-all cursor-pointer"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Post Challenge</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((company) => (
          <div
            key={company.id}
            className="group flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl border border-zinc-200 overflow-hidden bg-zinc-100 flex items-center justify-center dark:border-zinc-800">
                    {company.logoUrl ? (
                      <img src={company.logoUrl} alt={company.name} className="h-full w-full object-cover" />
                    ) : (
                      <Building2 className="h-6 w-6 text-zinc-400" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-zinc-950 dark:text-white group-hover:text-[#1657FF] transition-colors">
                      {company.name}
                    </h2>
                    <span className="text-[11px] font-semibold text-zinc-500">{company.industry}</span>
                  </div>
                </div>
                {company.verified && (
                  <span className="flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-[#1657FF] dark:bg-blue-950/40">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified
                  </span>
                )}
              </div>

              <p className="mt-4 text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                {company.description}
              </p>
            </div>

            <div className="mt-6 border-t border-zinc-100 pt-4 dark:border-zinc-800">
              <div className="flex items-center justify-between text-xs mb-4">
                <div>
                  <span className="text-[10px] text-zinc-400 block font-medium">Bounties</span>
                  <span className="font-bold text-zinc-900 dark:text-white">{company.problemBountiesCount || 2} Open</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 block font-medium">Total Rewards</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    ${(company.totalRewardsAwarded || 50000).toLocaleString()}
                  </span>
                </div>
              </div>

              <Link
                to={`/explore?q=${encodeURIComponent(company.name)}`}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-zinc-50 py-2.5 text-xs font-bold text-zinc-700 hover:bg-zinc-100 transition-colors dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                <span>View Problems</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
