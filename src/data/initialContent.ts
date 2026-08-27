import { PageContent } from "@/types";

export const INITIAL_SITE_CONTENT: PageContent[] = [
  {
    pageId: "home",
    pageName: "Home Page",
    path: "/",
    icon: "home",
    status: "published",
    updatedBy: "system_admin",
    updatedAt: new Date().toISOString(),
    sections: [
      {
        sectionId: "hero",
        sectionLabel: "Hero Section",
        icon: "view_carousel",
        fields: [
          {
            fieldId: "headline_line1",
            label: "Headline Line 1",
            type: "text",
            value: "Every Great Innovation",
          },
          {
            fieldId: "headline_line2",
            label: "Headline Line 2",
            type: "text",
            value: "Starts With A Problem.",
          },
          {
            fieldId: "subheadline",
            label: "Description / Subheadline",
            type: "textarea",
            value:
              "Discover, analyze, and solve real-world challenges across industries. The world's largest open registry of verified problems.",
          },
          {
            fieldId: "search_placeholder",
            label: "Search Bar Placeholder",
            type: "text",
            value: "Search millions of verified problems...",
          },
          {
            fieldId: "search_button_label",
            label: "Search Button Label",
            type: "text",
            value: "Search",
          },
        ],
      },
      {
        sectionId: "searches",
        sectionLabel: "Popular Searches (Tags)",
        icon: "sell",
        fields: [
          {
            fieldId: "popular_tags",
            label: "Popular Category Tags",
            type: "tag_list",
            value: ["Healthcare", "Agriculture", "AI", "Construction", "Education"],
            helpText: "These tags appear below the search bar to guide users.",
          },
        ],
      },
      {
        sectionId: "stats",
        sectionLabel: "Stats Strip",
        icon: "bar_chart",
        fields: [
          {
            fieldId: "stat_1_label",
            label: "Statistic 1 Label",
            type: "text",
            value: "Verified Problems",
          },
          {
            fieldId: "stat_1_value",
            label: "Statistic 1 Value",
            type: "text",
            value: "14,208",
          },
          {
            fieldId: "stat_2_label",
            label: "Statistic 2 Label",
            type: "text",
            value: "Active Solvers",
          },
          {
            fieldId: "stat_2_value",
            label: "Statistic 2 Value",
            type: "text",
            value: "84.2K",
          },
          {
            fieldId: "stat_3_label",
            label: "Statistic 3 Label",
            type: "text",
            value: "Industries Mapped",
          },
          {
            fieldId: "stat_3_value",
            label: "Statistic 3 Value",
            type: "text",
            value: "128",
          },
          {
            fieldId: "stat_4_label",
            label: "Statistic 4 Label",
            type: "text",
            value: "Bounties Awarded",
          },
          {
            fieldId: "stat_4_value",
            label: "Statistic 4 Value",
            type: "text",
            value: "$2.4M",
          },
        ],
      },
      {
        sectionId: "how_it_works",
        sectionLabel: "How It Works Section",
        icon: "timeline",
        fields: [
          {
            fieldId: "title",
            label: "Section Title",
            type: "text",
            value: "From Pain Point to Breakthrough",
          },
          {
            fieldId: "subtitle",
            label: "Section Subtitle",
            type: "textarea",
            value:
              "A systematic pipeline transforming undocumented friction into validated, venture-backed opportunities.",
          },
          {
            fieldId: "step_1_title",
            label: "Step 1 Title",
            type: "text",
            value: "1. Discover & Verify",
          },
          {
            fieldId: "step_1_desc",
            label: "Step 1 Description",
            type: "textarea",
            value:
              "Crowdsource friction points across 120+ industries. Every submission undergoes AI validation and community review.",
          },
          {
            fieldId: "step_2_title",
            label: "Step 2 Title",
            type: "text",
            value: "2. Quantify Market Need",
          },
          {
            fieldId: "step_2_desc",
            label: "Step 2 Description",
            type: "textarea",
            value:
              "Real-time pain score algorithms and audience willingness-to-pay metrics assess problem viability instantly.",
          },
          {
            fieldId: "step_3_title",
            label: "Step 3 Title",
            type: "text",
            value: "3. Build & Fund",
          },
          {
            fieldId: "step_3_desc",
            label: "Step 3 Description",
            type: "textarea",
            value:
              "Connect with founders, compete in sponsored problem bounties, and access ready-made startup brief templates.",
          },
        ],
      },
      {
        sectionId: "cta",
        sectionLabel: "CTA Banner",
        icon: "campaign",
        fields: [
          {
            fieldId: "heading",
            label: "Heading",
            type: "text",
            value: "Ready to solve what actually matters?",
          },
          {
            fieldId: "subtext",
            label: "Subtext",
            type: "textarea",
            value:
              "Join researchers, builders, and domain experts building the future on verified problem data.",
          },
          {
            fieldId: "primary_btn_label",
            label: "Primary Button Label",
            type: "text",
            value: "Explore Problems",
          },
          {
            fieldId: "primary_btn_link",
            label: "Primary Button Link",
            type: "text",
            value: "/explore",
          },
          {
            fieldId: "secondary_btn_label",
            label: "Secondary Button Label",
            type: "text",
            value: "Submit a Problem",
          },
          {
            fieldId: "secondary_btn_link",
            label: "Secondary Button Link",
            type: "text",
            value: "/submit",
          },
        ],
      },
    ],
  },
  {
    pageId: "explore",
    pageName: "Explore Problems",
    path: "/explore",
    icon: "explore",
    status: "published",
    updatedBy: "system_admin",
    updatedAt: new Date().toISOString(),
    sections: [
      {
        sectionId: "header",
        sectionLabel: "Header & Search",
        icon: "pageview",
        fields: [
          {
            fieldId: "page_title",
            label: "Page Title",
            type: "text",
            value: "Explore Problem Atlas",
          },
          {
            fieldId: "page_subtitle",
            label: "Page Subtitle",
            type: "textarea",
            value:
              "Browse curated, verified, and community-ranked problem spaces ready for innovative solutions.",
          },
          {
            fieldId: "search_placeholder",
            label: "Search Input Placeholder",
            type: "text",
            value: "Filter by title, keywords, or symptoms...",
          },
        ],
      },
      {
        sectionId: "quick_filters",
        sectionLabel: "Quick Filter Tags",
        icon: "filter_alt",
        fields: [
          {
            fieldId: "tags",
            label: "Filter Tags",
            type: "tag_list",
            value: ["All", "High Opportunity", "Critical Pain", "AI & Automation", "Healthcare", "Climate"],
          },
        ],
      },
    ],
  },
  {
    pageId: "problem_detail",
    pageName: "Problem Detail",
    path: "/problem/:id",
    icon: "article",
    status: "published",
    updatedBy: "system_admin",
    updatedAt: new Date().toISOString(),
    sections: [
      {
        sectionId: "action_labels",
        sectionLabel: "Action & Button Labels",
        icon: "touch_app",
        fields: [
          {
            fieldId: "upvote_label",
            label: "Upvote Button Text",
            type: "text",
            value: "Upvote Problem",
          },
          {
            fieldId: "share_label",
            label: "Share Button Text",
            type: "text",
            value: "Share",
          },
          {
            fieldId: "startup_brief_label",
            label: "Startup Brief Generator CTA",
            type: "text",
            value: "Launch Startup Brief Mode",
          },
        ],
      },
    ],
  },
  {
    pageId: "about",
    pageName: "About Us",
    path: "/about",
    icon: "info",
    status: "published",
    updatedBy: "system_admin",
    updatedAt: new Date().toISOString(),
    sections: [
      {
        sectionId: "mission",
        sectionLabel: "Mission & Purpose",
        icon: "flag",
        fields: [
          {
            fieldId: "mission_headline",
            label: "Mission Headline",
            type: "text",
            value: "Mapping the World's Unsolved Problems",
          },
          {
            fieldId: "mission_body",
            label: "Mission Statement",
            type: "textarea",
            value:
              "ProblemAtlas is dedicated to accelerating human progress by categorizing, quantifying, and distributing the most urgent real-world problems to founders, researchers, and builders.",
          },
        ],
      },
    ],
  },
  {
    pageId: "contact",
    pageName: "Contact",
    path: "/contact",
    icon: "contact_support",
    status: "published",
    updatedBy: "system_admin",
    updatedAt: new Date().toISOString(),
    sections: [
      {
        sectionId: "contact_info",
        sectionLabel: "Contact Information",
        icon: "contact_mail",
        fields: [
          {
            fieldId: "headline",
            label: "Contact Headline",
            type: "text",
            value: "Get in Touch with ProblemAtlas",
          },
          {
            fieldId: "support_email",
            label: "Support Email Address",
            type: "text",
            value: "support@problematlas.com",
          },
          {
            fieldId: "description",
            label: "Help Description",
            type: "textarea",
            value:
              "Have a partnership proposal, bounty request, or platform feedback? Reach out to our global coordination team.",
          },
        ],
      },
    ],
  },
];
