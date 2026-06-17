// Grandeur SSCBS Website Data Source
const GrandeurData = {
  publications: [
    {
      id: "pub-casebook-2025",
      title: "SSCBS Casebook 2025-26",
      subtitle: "3rd Edition • Placement Preparation",
      category: "casebooks",
      date: "October 2025",
      description: "A comprehensive casebook compiled by Grandeur containing real consulting interview transcripts, frameworks, guesstimates, and industry primers. Tailored for placements at top-tier firms like McKinsey, BCG, and Bain.",
      image: "assets/pub_casebook_2025.jpg",
      tags: ["Consulting", "Frameworks", "Case Interviews"],
      highlights: [
        "40+ detailed case transcripts from actual MBB interviews",
        "Structuring frameworks (Market Entry, Profitability, GTM, M&A)",
        "15+ guesstimate walkthroughs with structured approaches",
        "Industry primers covering 8 key sectors"
      ],
      downloadUrl: "#",
      readTime: "120 pages"
    },
    {
      id: "pub-casebook-2024",
      title: "SSCBS Casebook 2024-25",
      subtitle: "2nd Edition • Case Prep Guide",
      category: "casebooks",
      date: "September 2024",
      description: "The second iteration of the highly acclaimed consulting interview workbook, focusing on modern product cases, pricing strategies, and system design questions.",
      image: "assets/pub_casebook_2024.jpg",
      tags: ["Case Prep", "Interview Prep", "MBB Guides"],
      highlights: [
        "30+ interactive mock cases",
        "Special focus on digital consulting and tech product cases",
        "Comprehensive guide on structured thinking and MECE principles"
      ],
      downloadUrl: "#",
      readTime: "95 pages"
    },
    {
      id: "pub-sector-ai-2026",
      title: "Artificial Intelligence & Automation Primer",
      subtitle: "Sector Report 2026",
      category: "sector-reports",
      date: "March 2026",
      description: "An in-depth analysis of how Generative AI and automation are transforming traditional consulting and corporate strategies. Focuses on tech adoption, operational efficiency, and market disruption.",
      image: "assets/pub_sector_ai.jpg",
      tags: ["Artificial Intelligence", "Tech Strategy", "Automation"],
      highlights: [
        "Market size projections and growth drivers (2026-2030)",
        "Impact assessment of GenAI on SaaS, IT, and Service industries",
        "Consulting frameworks for AI implementation readiness"
      ],
      downloadUrl: "#",
      readTime: "45 pages"
    },
    {
      id: "pub-sector-qcomm-2025",
      title: "Quick Commerce Industry Analysis",
      subtitle: "Sector Report 2025",
      category: "sector-reports",
      date: "November 2025",
      description: "Analyzing the rapid expansion of 10-minute delivery services in urban India. Evaluates dark store unit economics, delivery algorithms, FMCG brand partnerships, and sustainability models.",
      image: "assets/pub_sector_qcomm.jpg",
      tags: ["Logistics", "Unit Economics", "E-Commerce"],
      highlights: [
        "Detailed comparison of Zepto, Blinkit, and Instamart models",
        "Analysis of dark store density and micro-fulfillment center logistics",
        "Profitability roadmap and margin analysis of FMCG private labels"
      ],
      downloadUrl: "#",
      readTime: "38 pages"
    },
    {
      id: "pub-sector-fintech-2025",
      title: "Fintech Landscape in India",
      subtitle: "Sector Report 2025",
      category: "sector-reports",
      date: "June 2025",
      description: "A detailed research paper examining UPI scaling, digital lending, neo-banking regulatory changes, and the rise of wealth-tech applications among GenZ users.",
      image: "assets/pub_sector_fintech.jpg",
      tags: ["Finance", "UPI", "Regulations"],
      highlights: [
        "Regulatory shifts in digital lending and credit card issuance",
        "Neo-banking adoption rates and trust factors in tier-2/3 cities",
        "Analysis of wealth-tech monetization strategies"
      ],
      downloadUrl: "#",
      readTime: "52 pages"
    },
    {
      id: "pub-newsletter-dec-2025",
      title: "Market Pulse: GenAI in Consulting",
      subtitle: "Grandeur Monthly • Dec 2025",
      category: "newsletters",
      date: "December 2025",
      description: "Grandeur's monthly wrap-up summarizing key corporate acquisitions, macroeconomic trends, and a breakdown of a complex guesstimate on the Indian electric vehicle market.",
      image: "assets/pub_newsletter_dec2025.jpg",
      tags: ["Macroeconomics", "Market Watch", "EV Guesstimate"],
      highlights: [
        "Macroeconomic analysis: Interest rate trends and inflation impact",
        "Weekly Guesstimate: Number of EV charging stations in Delhi NCR",
        "Consulting Spotlight: McKinsey's acquisition of tech boutique firms"
      ],
      downloadUrl: "#",
      readTime: "12 pages"
    },
    {
      id: "pub-guesstimate-2026",
      title: "Guesstimate Primer & Practice Book",
      subtitle: "Special Edition 2026",
      category: "newsletters",
      date: "January 2026",
      description: "A quick-reference guide containing standard formulas, population metrics, sizing benchmarks, and structured approaches to tackle any guesstimate question in under 10 minutes.",
      image: "assets/pub_guesstimate.jpg",
      tags: ["Guesstimates", "Market Sizing", "Estimation"],
      highlights: [
        "Sanity check benchmarks (demographics, income groups, area)",
        "10 classic guesstimates solved step-by-step using supply & demand sides",
        "Mental math hacks for quick estimation"
      ],
      downloadUrl: "#",
      readTime: "24 pages"
    }
  ],

  projects: [
    {
      id: "proj-agritech-gtm",
      title: "Market Entry & GTM Strategy for Agritech Startup",
      client: "RuralGrow Solutions",
      domain: "Agritech / Growth Strategy",
      status: "Completed",
      duration: "8 Weeks (Paid)",
      summary: "Developed a comprehensive Go-To-Market (GTM) strategy and dynamic pricing model to launch a B2B SaaS platform connecting smallholder farmers with wholesale buyers in Haryana and Punjab.",
      problem: "RuralGrow wanted to expand its platform from Maharashtra to Northern India but faced challenges in understanding local commission agent (arthiya) networks, logistics costs, and farmers' willingness to pay.",
      approach: [
        "Conducted primary research with 150+ farmers and 30 wholesale traders in mandis.",
        "Analyzed regional supply chains, crop seasonality, and credit cycles.",
        "Designed a tiered subscription model for premium logistics and quality-testing features.",
        "Formulated a GTM roadmap leveraging local farmer cooperatives (FPOs)."
      ],
      results: [
        "Designed a pricing model approved by the client, yielding a projected 22% increase in average revenue per user (ARPU).",
        "Formulated a pilot launch strategy that successfully onboarded 450+ farmers in the first month.",
        "Identified key channel partners, reducing customer acquisition costs (CAC) by 18%."
      ],
      tags: ["Market Entry", "Pricing Strategy", "Primary Research"]
    },
    {
      id: "proj-fincorp-valuation",
      title: "Competitor Benchmarking & Revenue Optimization",
      client: "FinCorp Wealth Management",
      domain: "Financial Advisory / Fintech",
      status: "Completed",
      duration: "10 Weeks (Paid)",
      summary: "Performed thorough financial modeling, valuation sensitivity analysis, and product benchmarking for a leading wealth management platform to enhance its market share among young retail investors.",
      problem: "FinCorp faced intense competition from zero-brokerage apps. They needed to identify product feature gaps, optimize their advisory fee structure, and assess the feasibility of introducing fractional investing.",
      approach: [
        "Created a financial projection model for the next 5 years with sensitivity scenarios.",
        "Conducted a feature-by-feature benchmark analysis against 6 major domestic and international competitors.",
        "Ran focus groups and surveys to measure interest and price elasticity for fractional share ownership.",
        "Built cost-benefit models for regulatory compliance and API integrations."
      ],
      results: [
        "Recommended a hybrid pricing structure (fixed + percentage of AUM) that was adopted in their premium tier.",
        "Presented a product roadmap for fractional investing, identifying potential 30% user growth.",
        "Identified leakages in customer onboarding, suggesting UI/UX fixes to reduce drop-off by 14%."
      ],
      tags: ["Financial Modeling", "Competitor Analysis", "Valuation"]
    },
    {
      id: "proj-qcomm-logistics",
      title: "Operations & Dark Store Location Optimization",
      client: "Q-Deliver Logistics",
      domain: "Operations / E-Commerce",
      status: "Completed",
      duration: "6 Weeks (Pro-Bono)",
      summary: "Leveraged spatial analysis and inventory management frameworks to optimize dark store layouts and delivery dispatch operations, lowering order fulfillment times by 90 seconds.",
      problem: "Q-Deliver was failing to meet its 10-minute delivery promise in South Delhi due to congestion, suboptimal dark store spatial organization, and driver dispatch delays.",
      approach: [
        "Mapped high-density order zones against existing dark store catchments.",
        "Applied heat maps to redesign dark store shelving layouts (putting high-frequency items near packing bays).",
        "Analyzed order dispatch times and suggested batching rules for riders.",
        "Formulated a prediction framework for micro-fulfillment inventory stocking based on historical sales."
      ],
      results: [
        "Successfully reduced average in-store picking and packing time from 3 minutes to 1.8 minutes.",
        "Improved the percentage of deliveries under 10 minutes from 72% to 89% in the pilot zone.",
        "Optimized inventory holding, reducing write-offs of perishables by 12%."
      ],
      tags: ["Operations", "Supply Chain", "Spatial Optimization"]
    },
    {
      id: "proj-glowskin-d2c",
      title: "Customer Acquisition & Digital Brand Strategy",
      client: "GlowSkin Cosmetics",
      domain: "Marketing / D2C",
      status: "Completed",
      duration: "8 Weeks (Paid)",
      summary: "Designed a digital brand strategy and marketing funnel optimization for an organic skincare brand, enhancing digital ROI and lowering Customer Acquisition Cost (CAC).",
      problem: "GlowSkin was struggling with skyrocketing Facebook/Instagram ad costs and low retention rates, leading to a high CAC to Lifetime Value (LTV) ratio.",
      approach: [
        "Analyzed website analytics and customer journey touchpoints to identify conversion funnel drop-offs.",
        "Designed a customer segmentation model (based on buying behavior, age, and concerns).",
        "Developed a structured influencer collaboration framework (tiering nano, micro, and macro creators).",
        "Designed email and WhatsApp marketing sequences for post-purchase engagement."
      ],
      results: [
        "Achieved a 26% reduction in Customer Acquisition Cost (CAC) through micro-influencer targeting.",
        "Increased website conversion rate from 1.5% to 2.4% via cart recovery automation.",
        "Boosted customer repeat-purchase rate by 15% within a 60-day period."
      ],
      tags: ["Brand Strategy", "Marketing Funnel", "CAC Optimization"]
    }
  ],

  events: [
    {
      id: "event-invicta-2026",
      title: "Invicta 2026",
      type: "Case Study Competition",
      scope: "National Level Flagship Event",
      date: "Feb 10 - Feb 28, 2026",
      registrationLink: "#",
      prizePool: "₹1,50,000",
      description: "Invicta is the flagship annual case study competition of Grandeur. It brings together the brightest minds from top-tier institutions across India (IITs, IIMs, DU, BITS, etc.) to solve complex, real-world corporate challenges. Hosted offline at SSCBS, the event provides participants the chance to pitch to consulting executives and win handsome cash prizes.",
      rounds: [
        {
          name: "Round 1: Preliminary Strategy Quiz",
          date: "Feb 10, 2026",
          description: "An online test assessing logical reasoning, business news, macroeconomic concepts, and case study basics. 20-minute timed quiz."
        },
        {
          name: "Round 2: Case Submission",
          date: "Feb 18, 2026",
          description: "Shortlisted teams receive a comprehensive corporate case regarding a market expansion dilemma. Teams submit a 5-slider solution deck."
        },
        {
          name: "Round 3: Grand Finale Presentation",
          date: "Feb 28, 2026",
          description: "Top 8 teams present their detailed strategies live in the SSCBS Auditorium to an elite jury comprising management consultants from MBB and Big 4 firms."
        }
      ],
      pastWinners: [
        { position: "Winner", team: "Team Vanguard", college: "IIM Ahmedabad" },
        { position: "First Runner Up", team: "The Strategists", college: "Shaheed Sukhdev College of Business Studies" },
        { position: "Second Runner Up", team: "Synergy Consulting", college: "SRCC" }
      ]
    },
    {
      id: "event-echelon-2026",
      title: "Echelon 2026",
      type: "Simulation Challenge",
      scope: "Intra & Inter-College Event",
      date: "September 15, 2026",
      registrationLink: "#",
      prizePool: "₹50,000",
      description: "Echelon is a high-octane corporate simulation challenge. Participants step into the shoes of CXOs navigating economic downturns, competitor hostile takeovers, and technological disruptions. Using a dynamic decision-making engine, the teams must balance profitability, market share, and investor relations under strict time constraints.",
      rounds: [
        {
          name: "Round 1: Resource Allocation bidding",
          date: "Sep 15, morning",
          description: "A fast-paced auction where teams bid for manufacturing units, R&D projects, and marketing rights."
        },
        {
          name: "Round 2: Live Crisis Management Simulator",
          date: "Sep 15, afternoon",
          description: "Teams react to random market shocks (e.g., supply chain disruption, inflation spike, tax hikes) in a live digital simulation dashboard."
        }
      ],
      pastWinners: [
        { position: "Winner", team: "Alpha Capital", college: "St. Stephen's College" },
        { position: "Runner Up", team: "Apex Strategists", college: "SSCBS" }
      ]
    },
    {
      id: "event-bootcamp-2026",
      title: "Case Interview & Guesstimate Bootcamp",
      type: "Workshop Series",
      scope: "Skill Development Initiative",
      date: "August 20 - August 22, 2026",
      registrationLink: "#",
      prizePool: "N/A (Certificate of Completion)",
      description: "A comprehensive 3-day masterclass designed for students preparing for consulting recruitment cycles. Conducted by incoming consultants and working professionals from McKinsey, BCG, and Bain, the bootcamp covers structured case-solving methods, interview etiquette, and interactive guesstimate drills.",
      rounds: [
        {
          name: "Day 1: Demystifying the Case Interview",
          date: "Aug 20, 2026",
          description: "Introduction to profit/loss structures, market entry frameworks, and MECE principles."
        },
        {
          name: "Day 2: Mastering Guesstimates & Sizing",
          date: "Aug 21, 2026",
          description: "Frameworks for market-sizing, population filters, and supply vs. demand estimation."
        },
        {
          name: "Day 3: Live Mock Interview & Q&A",
          date: "Aug 22, 2026",
          description: "Live mock consulting interview on stage with immediate feedback, followed by an interactive panel discussion on career paths."
        }
      ],
      pastWinners: []
    }
  ],

  team: {
    faculty: [
      {
        name: "Dr. Sushmita",
        role: "Teacher-in-Charge",
        department: "Department of Management Studies",
        college: "SSCBS",
        description: "An academician with over 15 years of teaching experience in corporate finance, business valuations, and strategic management. She acts as the guiding force behind the society's research orientation.",
        image: "assets/faculty_sushmita.jpg"
      },
      {
        name: "Mr. Tushar Marwaha",
        role: "Faculty Advisor",
        department: "Department of Management Studies",
        college: "SSCBS",
        description: "Specializes in business analytics, operations research, and organizational behavior. He mentors the students in structuring live corporate projects and expanding professional outreach.",
        image: "assets/faculty_tushar.jpg"
      }
    ],
    core: [
      {
        name: "Aarav Mehta",
        role: "President",
        image: "assets/team_aarav.jpg",
        linkedin: "#",
        placement: "Placed at McKinsey & Company",
        quote: "Grandeur is more than a society; it's an incubator for strategic thinking. Our goal is to equip members with a structured problem-solving toolkit that serves them for a lifetime."
      },
      {
        name: "Sneha Sharma",
        role: "Vice President",
        image: "assets/team_sneha.jpg",
        linkedin: "#",
        placement: "Placed at Boston Consulting Group (BCG)",
        quote: "Managing corporate live projects and running flagship events like Invicta gives us unmatched execution experience. It bridges our classrooms directly to boardroom realities."
      },
      {
        name: "Ishaan Verma",
        role: "Head of Consulting & Projects",
        image: "assets/team_ishaan.jpg",
        linkedin: "#",
        placement: "Placed at Bain & Company",
        quote: "We approach each corporate project with analytical rigor, combining intensive field research with financial modeling to deliver actionable strategies for our clients."
      },
      {
        name: "Diya Kapoor",
        role: "Head of Research & Publications",
        image: "assets/team_diya.jpg",
        linkedin: "#",
        placement: "Placed at EY-Parthenon",
        quote: "Curating sector reports and drafting the annual Casebook allows us to document the shifting paradigms in technology, finance, and consumer behavior."
      },
      {
        name: "Aditya Sen",
        role: "Head of Corporate Relations",
        image: "assets/team_aditya.jpg",
        linkedin: "#",
        placement: "Placed at PwC India",
        quote: "We act as the primary interface between Grandeur and the corporate ecosystem, pitching for consultancy gigs and onboarding executive sponsors."
      },
      {
        name: "Riya Malhotra",
        role: "Head of Public Relations & Marketing",
        image: "assets/team_riya.jpg",
        linkedin: "#",
        placement: "Placed at Deloitte USI",
        quote: "Bringing Grandeur's ideas to life visually and expanding our digital footprint across India ensures our work reaches students and corporate leaders alike."
      }
    ],
    advisory: [
      {
        name: "Kartik Malhotra",
        role: "Senior Advisory Member",
        image: "assets/team_kartik.jpg",
        linkedin: "#",
        placement: "Alumnus • Now Consultant at Bain & Company",
        quote: "Mentoring the junior cohort is a rich tradition at Grandeur. The rigor we maintain prepares members to hit the ground running in high-pressure consulting roles."
      },
      {
        name: "Ananya Singhal",
        role: "Senior Advisory Member",
        image: "assets/team_ananya.jpg",
        linkedin: "#",
        placement: "Alumna • Now Associate at McKinsey & Company",
        quote: "Solving cases, structuring logic, and learning under peer guidance at Grandeur was the absolute bedrock of my placement preparation and early career success."
      }
    ],
    alumniPlacements: [
      { firm: "McKinsey & Company", count: 28, logo: "mckinsey" },
      { firm: "Boston Consulting Group (BCG)", count: 22, logo: "bcg" },
      { firm: "Bain & Company", count: 18, logo: "bain" },
      { firm: "EY Parthenon / EY", count: 35, logo: "ey" },
      { firm: "PwC India / Strategy&", count: 24, logo: "pwc" },
      { firm: "Deloitte India / USI", count: 41, logo: "deloitte" },
      { firm: "KPMG India", count: 19, logo: "kpmg" },
      { firm: "Investment Banks & Boutique Firms", count: 32, logo: "ib" }
    ]
  }
};
