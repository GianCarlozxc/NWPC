export const productivityModules = [
  {
    id: "7s",
    code: "7S",
    title: "7S of Good Housekeeping",
    subtitle: "Foundational Workplace Organization & Safety",
    description: "An enhanced workplace organization methodology adapted for Philippine MSMEs to optimize efficiency, reduce workplace hazards, eliminate waste, and cultivate a disciplined work environment.",
    color: "from-blue-600 to-indigo-700",
    badge: "Foundation Level",
    pillars: [
      { name: "Sort (Suriin)", desc: "Distinguish between necessary and unnecessary items; discard what is not needed." },
      { name: "Systematize (Sinupin)", desc: "Arrange necessary items neatly in designated locations for quick retrieval." },
      { name: "Sweep (Linisin)", desc: "Clean the workplace thoroughly, inspect machinery, and maintain order daily." },
      { name: "Standardize (Simulan)", desc: "Maintain high standards of housekeeping and visual workplace management." },
      { name: "Self-Discipline (Sariling-Kusa)", desc: "Build spontaneous adherence to established organizational protocols." },
      { name: "Safety (Siguro)", desc: "Identify and eliminate occupational hazards to ensure zero workplace injuries." },
      { name: "Sustain (Suportahan)", desc: "Conduct routine audits, reward best practices, and instill continuous improvement." }
    ],
    targetAudience: "Manufacturing, Retail, Food Processing, Services, Warehousing",
    duration: "2-Day Intensive Workshop + Onsite Assessment",
    deliverables: "Action Plan, 7S Audit Checklist, DOLE-NWPC Certificate of Completion"
  },
  {
    id: "istiv",
    code: "ISTIV",
    title: "ISTIV Productivity Awareness & Values",
    subtitle: "Filipino Work Values & Mindset Transformation",
    description: "A values-based human relations training program designed to develop productive mindsets, strengthen labor-management cooperation, and align personal work ethics with enterprise productivity goals.",
    color: "from-amber-500 to-orange-600",
    badge: "Core Values",
    pillars: [
      { name: "I - Inisyatibo (Initiative)", desc: "Proactively taking constructive action without waiting to be told." },
      { name: "S - Sipag (Hard Work)", desc: "Diligence, perseverance, and dedication to delivering top-tier work output." },
      { name: "T - Tipid (Prudence & Thriftiness)", desc: "Optimum utilization of enterprise resources, reducing scrap and utilities." },
      { name: "I - Integridad (Integrity)", desc: "Honesty, accountability, and ethical conduct in all professional dealings." },
      { name: "V - Malasakit (Commitment / Care)", desc: "Deep commitment to customer satisfaction and organizational success." }
    ],
    targetAudience: "Frontline Workers, Supervisors, Union Leaders, HR Professionals",
    duration: "1 to 2-Day Interactive Seminar",
    deliverables: "Labor-Management Action Plan, Values Integration Matrix, Certificate"
  },
  {
    id: "lean",
    code: "LEAN",
    title: "Lean Management & Waste Elimination",
    subtitle: "Maximizing Value through Waste Elimination",
    description: "Empowers enterprises to streamline production cycles, eliminate non-value-adding activities (Muda), optimize layout workflows, and establish continuous flow (Kaizen) for heightened profitability.",
    color: "from-emerald-600 to-teal-700",
    badge: "Operational Excellence",
    pillars: [
      { name: "Transport Waste Elimination", desc: "Minimizing unnecessary movement of raw materials, parts, and equipment." },
      { name: "Inventory Optimization", desc: "Reducing excess work-in-progress and storage holding costs." },
      { name: "Motion Economy", desc: "Ergonomically optimizing employee body movements and tool placements." },
      { name: "Waiting Time Reduction", desc: "Eliminating bottlenecks, queue delays, and idle equipment time." },
      { name: "Overproduction Prevention", desc: "Producing only what the customer demands via pull-systems (Just-in-Time)." },
      { name: "Over-processing Elimination", desc: "Eliminating redundant inspection steps and non-essential product specs." },
      { name: "Defects & Rework Prevention", desc: "Poka-Yoke (Mistake-proofing) mechanisms for zero-defect quality." }
    ],
    targetAudience: "Operations Managers, Plant Engineers, Industrial Supervisors",
    duration: "3-Day Masterclass + 1-Month Implementation Mentoring",
    deliverables: "Value Stream Map (VSM), Kaizen Project Charters, Productivity Audit"
  },
  {
    id: "green-me",
    code: "GREEN ME",
    title: "Green ME (Eco-Productivity & Energy Efficiency)",
    subtitle: "Sustainable Enterprise Practices & Resource Efficiency",
    description: "Assists MSMEs in adopting eco-friendly operational processes, reducing carbon footprint, cutting electricity and water overheads, and complying with national environmental statutes.",
    color: "from-green-600 to-emerald-800",
    badge: "Sustainability",
    pillars: [
      { name: "Energy Conservation", desc: "Lighting retrofits, motor maintenance, and energy audits." },
      { name: "Water Management & Recycling", desc: "Rainwater harvesting, flow restrictors, and wastewater management." },
      { name: "Solid Waste Hierarchy", desc: "3Rs (Reduce, Reuse, Recycle) applied to production scraps." },
      { name: "Chemical & Hazardous Material Safety", desc: "Safe handling, MSDS compliance, and toxic reduction." }
    ],
    targetAudience: "Facility Managers, Safety Officers (OSH), Sustainability Leads",
    duration: "2-Day Training Workshop",
    deliverables: "Green Audit Assessment, Resource Efficiency Roadmap"
  },
  {
    id: "sqip",
    code: "SQIP",
    title: "Service Quality Improvement Program (SQIP)",
    subtitle: "Customer Delight & Service Standardization",
    description: "Custom-tailored for the service, tourism, hospitality, and retail sectors to elevate customer experience, handle complaints constructively, and standardize service blueprints.",
    color: "from-purple-600 to-indigo-800",
    badge: "Service Sector",
    pillars: [
      { name: "Moments of Truth", desc: "Identifying and elevating critical touchpoints in the customer journey." },
      { name: "Service Recovery Protocol", desc: "Converting customer dissatisfaction into brand loyalty and repeat visits." },
      { name: "Frontline Empowerment", desc: "Equipping staff with communication tools and dispute mitigation skills." },
      { name: "Mystery Guest Audits", desc: "Benchmarking service consistency through structured evaluations." }
    ],
    targetAudience: "Hotels, Resorts, Restaurants, Retail Stores, BPO, Clinics",
    duration: "2-Day Interactive Workshop with Roleplaying",
    deliverables: "Service Standards Manual, Customer Delight Blueprint"
  },
  {
    id: "olympics",
    code: "AWARDS",
    title: "National Productivity Olympics",
    subtitle: "National Recognition of Excellence for MSMEs",
    description: "A prestigious biennial national competition that recognizes outstanding MSMEs nationwide demonstrating exceptional labor-productivity improvements, gainsharing schemes, and CSR initiatives.",
    color: "from-rose-500 to-red-600",
    badge: "Recognition & Awards",
    pillars: [
      { name: "Micro Enterprise Category", desc: "Recognizing outstanding community micro-businesses (Asset size up to PHP 3M)." },
      { name: "Small Enterprise Category", desc: "Honoring dynamic small enterprises with stellar labor-management relations (PHP 3M - 15M)." },
      { name: "Medium Enterprise Category", desc: "Celebrating innovative medium enterprises achieving global standards (PHP 15M - 100M)." },
      { name: "Gainsharing Benchmarks", desc: "Showcasing transparent productivity bonus schemes that uplift workers' livelihoods." }
    ],
    targetAudience: "All Registered MSMEs nationwide",
    duration: "Biennial Regional & National Search",
    deliverables: "National Trophy, Cash Incentives, DOLE Hall of Fame Citation, Global Benchmarking Tour"
  }
];

export const trainingSchedule = [
  {
    id: "ts-1",
    module: "7S of Good Housekeeping for MSMEs",
    moduleId: "7s",
    date: "March 12-13, 2026",
    time: "8:30 AM - 4:30 PM",
    venue: "Online via Zoom / Regional Office",
    slotsAvailable: 15,
    fee: "FREE (Subsidized by DOLE-NWPC)",
    status: "Open"
  },
  {
    id: "ts-2",
    module: "ISTIV Productivity Improvement Workshop",
    moduleId: "istiv",
    date: "March 20-21, 2026",
    time: "9:00 AM - 5:00 PM",
    venue: "NWPC Conference Hall & Hybrid Webinar",
    slotsAvailable: 8,
    fee: "FREE",
    status: "Filling Fast"
  },
  {
    id: "ts-3",
    module: "Service Quality Improvement for Hospitality & Retail",
    moduleId: "sqip",
    date: "April 08, 2026",
    time: "9:00 AM - 4:00 PM",
    venue: "RTWPB Regional Training Centers",
    slotsAvailable: 20,
    fee: "FREE",
    status: "Open"
  },
  {
    id: "ts-4",
    module: "Green ME (Eco-Productivity & Waste Reduction)",
    moduleId: "green-me",
    date: "April 24, 2026",
    time: "8:30 AM - 12:00 PM",
    venue: "Online Interactive Masterclass",
    slotsAvailable: 35,
    fee: "FREE",
    status: "Open"
  }
];
