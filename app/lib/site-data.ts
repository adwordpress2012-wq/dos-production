export type SiteLink = {
  href: string;
  label: string;
  description?: string;
  external?: boolean;
};

export type Industry = {
  slug: string;
  name: string;
  shortName: string;
  pain: string;
  solution: string;
  bottlenecks: string[];
  capabilities: string[];
  micahRole: string;
};

export const SOLUTIONS: SiteLink[] = [
  {
    href: "/solutions#micah",
    label: "Micah Smart Business Assistant",
    description: "A 24/7 front door for enquiries, bookings, follow-up and customer questions.",
  },
  {
    href: "/solutions#smart-chat",
    label: "Smart Chat Widget",
    description: "Guide website visitors and capture the details your team needs.",
  },
  {
    href: "/solutions/smart-intake-follow-up",
    label: "DOS Smart Intake & Follow-Up System",
    description: "Turn every enquiry into an organised opportunity with automatic acknowledgement and follow-up.",
  },
  {
    href: "/solutions/era",
    label: "DOS ERA — Email Response Automation",
    description: "Answer, capture and route inbound business email while your team keeps control.",
  },
  {
    href: "/solutions/arc",
    label: "DOS ARC — Accounts Receivable Control",
    description: "Structured invoice follow-up before unpaid accounts become a collection problem.",
  },
  {
    href: "/solutions#communication",
    label: "Customer Communication",
    description: "Keep conversations clear, timely and connected across each customer channel.",
  },
  {
    href: "/solutions#communication",
    label: "SMS and WhatsApp",
    description: "Respond faster and keep important customer conversations organised.",
  },
  {
    href: "/solutions#bookings",
    label: "Booking Automation",
    description: "Reduce booking friction with confirmations, reminders and clear next steps.",
  },
  {
    href: "/solutions#automation",
    label: "Follow-Up Automation",
    description: "Keep opportunities moving without relying on manual reminders.",
  },
  {
    href: "/solutions#websites",
    label: "Website Builds and Rebuilds",
    description: "Modern websites designed around trust, performance and customer action.",
  },
  {
    href: "/solutions#pipelines",
    label: "CRM and Pipelines",
    description: "Organise leads, customers and opportunities from first contact onward.",
  },
  {
    href: "/solutions/reputation",
    label: "DOS Reputation",
    description: "Turn good service into genuine reviews, private feedback and stronger business trust.",
  },
  {
    href: "/solutions#automation",
    label: "Workflow Automation",
    description: "Reduce repetitive administration and keep everyday processes moving.",
  },
  {
    href: "/solutions#lead-capture",
    label: "Lead Capture",
    description: "Capture customer details from forms, chat, calls and website enquiries.",
  },
  {
    href: "/solutions#onboarding",
    label: "Client Onboarding",
    description: "Make intake, information collection and implementation easier to manage.",
  },
  {
    href: "/solutions#reporting",
    label: "Reporting and Analytics",
    description: "See the business activity that matters without adding more admin.",
  },
];

export const INDUSTRIES: Industry[] = [
  {
    slug: "restaurants",
    name: "Restaurants and Cafes",
    shortName: "Restaurants",
    pain: "Bookings, calls and customer questions arrive during the busiest parts of the day.",
    solution: "Capture bookings, answer common questions and keep follow-up moving after service.",
    bottlenecks: ["Missed calls during service", "Repeated menu and booking questions", "Inconsistent review follow-up"],
    capabilities: ["Booking enquiries", "Website chat", "Customer notifications", "Review requests"],
    micahRole: "Micah can answer common questions, capture booking intent and guide customers to the right next step.",
  },
  {
    slug: "recruitment",
    name: "Recruitment",
    shortName: "Recruitment",
    pain: "Employer enquiries, candidate applications and vacancy follow-up can become disconnected.",
    solution: "Create clearer employer and candidate journeys with organised enquiry pathways.",
    bottlenecks: ["Slow employer follow-up", "Unclear candidate pathways", "Disconnected vacancy enquiries"],
    capabilities: ["Employer lead capture", "Candidate journeys", "Pipeline follow-up", "Website systems"],
    micahRole: "Micah can direct employers and candidates to the right pathway while capturing useful context for the team.",
  },
  {
    slug: "transport",
    name: "Transport and Logistics",
    shortName: "Transport",
    pain: "Customer updates, quote requests and operational documents can be spread across too many channels.",
    solution: "Organise communication and routine workflows so teams can respond with less friction.",
    bottlenecks: ["Scattered customer updates", "Slow quote response", "Manual document collection"],
    capabilities: ["Quote capture", "Customer notifications", "Document workflows", "Pipeline visibility"],
    micahRole: "Micah can capture enquiry details and route customers to the correct service or operational contact.",
  },
  {
    slug: "scaffolding",
    name: "Scaffolding and Access",
    shortName: "Scaffolding",
    pain: "Quote requests and project communication are easily delayed when teams are working on site.",
    solution: "Capture better project details and keep quote opportunities and follow-up organised.",
    bottlenecks: ["Incomplete quote requests", "Delayed follow-up", "Site teams missing office messages"],
    capabilities: ["Quote enquiry capture", "Project intake", "Opportunity pipelines", "Customer follow-up"],
    micahRole: "Micah can collect the first project details and help customers reach the right next step without waiting.",
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    shortName: "Real Estate",
    pain: "Property, buyer, seller and tenant enquiries compete for attention across multiple channels.",
    solution: "Direct each enquiry to the right pathway and automate routine communication.",
    bottlenecks: ["After-hours property enquiries", "Inconsistent lead response", "Multiple enquiry types"],
    capabilities: ["Lead routing", "Appointment pathways", "SMS follow-up", "Pipeline management"],
    micahRole: "Micah can identify the enquiry type, capture details and guide people toward the relevant team or booking.",
  },
  {
    slug: "tourism",
    name: "Tourism and Accommodation",
    shortName: "Tourism",
    pain: "Guest questions and booking enquiries often arrive outside normal office hours.",
    solution: "Support guest communication and guide visitors toward available booking pathways.",
    bottlenecks: ["After-hours guest questions", "Repeated availability enquiries", "Manual pre-arrival messages"],
    capabilities: ["Guest enquiries", "Booking pathways", "Notifications", "Review follow-up"],
    micahRole: "Micah can answer common guest questions and guide visitors to the right booking or contact option.",
  },
  {
    slug: "trades",
    name: "Trades",
    shortName: "Trades",
    pain: "Calls and quote requests are missed while the team is on the tools.",
    solution: "Capture job details, organise follow-up and keep customers informed.",
    bottlenecks: ["Missed calls on site", "Incomplete quote details", "Manual appointment reminders"],
    capabilities: ["Missed-call follow-up", "Quote forms", "Booking reminders", "Review requests"],
    micahRole: "Micah can capture the job type, location and urgency while the team keeps working.",
  },
  {
    slug: "medical",
    name: "Medical and Allied Health",
    shortName: "Medical",
    pain: "High call volumes and routine appointment questions can occupy valuable front-desk time.",
    solution: "Provide clear non-clinical information and smoother appointment communication.",
    bottlenecks: ["Routine appointment calls", "Manual reminders", "Unclear service pathways"],
    capabilities: ["Appointment enquiries", "Reminders", "Service navigation", "Feedback collection"],
    micahRole: "Micah can support non-clinical questions and direct people to appropriate booking or contact pathways.",
  },
  {
    slug: "dental",
    name: "Dental",
    shortName: "Dental",
    pain: "Appointment enquiries, reminders and follow-up create a steady administrative load.",
    solution: "Make appointment communication easier and reduce missed follow-up.",
    bottlenecks: ["Missed appointment enquiries", "Manual reminders", "Uncompleted follow-up"],
    capabilities: ["Appointment pathways", "Reminders", "Reactivation", "Review requests"],
    micahRole: "Micah can handle common non-clinical questions and guide patients toward the right booking pathway.",
  },
  {
    slug: "beauty",
    name: "Beauty and Salons",
    shortName: "Beauty",
    pain: "Booking changes and service questions interrupt appointments throughout the day.",
    solution: "Guide bookings, send reminders and keep repeat-customer follow-up consistent.",
    bottlenecks: ["Booking interruptions", "Last-minute changes", "Inconsistent rebooking"],
    capabilities: ["Online booking", "Reminders", "Reactivation", "Review follow-up"],
    micahRole: "Micah can answer service questions and help customers reach the booking option that suits them.",
  },
  {
    slug: "retail",
    name: "Retail",
    shortName: "Retail",
    pain: "Product, availability and service enquiries arrive across store, phone and online channels.",
    solution: "Create clear customer pathways and organise follow-up across channels.",
    bottlenecks: ["Channel fragmentation", "Repeated product questions", "Lost follow-up opportunities"],
    capabilities: ["Website conversations", "Customer notifications", "Lead capture", "Campaign follow-up"],
    micahRole: "Micah can help customers find the right information or capture an enquiry for the team.",
  },
  {
    slug: "legal",
    name: "Legal",
    shortName: "Legal",
    pain: "New matter enquiries require timely, structured intake without making legal promises.",
    solution: "Capture the right initial information and route enquiries to the appropriate team.",
    bottlenecks: ["Incomplete intake", "Slow enquiry response", "Unclear matter routing"],
    capabilities: ["Structured intake", "Consultation pathways", "Follow-up workflows", "Client onboarding"],
    micahRole: "Micah can collect non-confidential initial context and guide prospective clients to an appropriate next step.",
  },
  {
    slug: "accounting",
    name: "Accounting",
    shortName: "Accounting",
    pain: "Client requests, document collection and seasonal enquiries create recurring administrative pressure.",
    solution: "Standardise intake, reminders and client communication.",
    bottlenecks: ["Document chasing", "Seasonal enquiry spikes", "Scattered client requests"],
    capabilities: ["Client onboarding", "Document reminders", "Appointment pathways", "Task follow-up"],
    micahRole: "Micah can identify the type of enquiry and guide clients to the right form, booking or team contact.",
  },
  {
    slug: "mortgage-brokers",
    name: "Mortgage Brokers",
    shortName: "Mortgage Brokers",
    pain: "New enquiries need fast qualification and ongoing document follow-up.",
    solution: "Capture borrower context and create a clearer path from enquiry to appointment.",
    bottlenecks: ["Slow lead response", "Incomplete borrower details", "Manual appointment follow-up"],
    capabilities: ["Lead qualification", "Booking pathways", "Document workflows", "Pipeline follow-up"],
    micahRole: "Micah can capture initial borrower context and help prospects book the appropriate conversation.",
  },
  {
    slug: "ndis",
    name: "NDIS",
    shortName: "NDIS",
    pain: "Participant, family and referrer enquiries need clear, respectful routing and timely follow-up.",
    solution: "Make service information and enquiry pathways easier to understand.",
    bottlenecks: ["Complex service enquiries", "Referral follow-up", "Scattered intake information"],
    capabilities: ["Service navigation", "Referral intake", "Appointment pathways", "Communication workflows"],
    micahRole: "Micah can provide clear non-advisory guidance and route enquiries to the appropriate human team.",
  },
  {
    slug: "fitness",
    name: "Fitness and Gyms",
    shortName: "Fitness",
    pain: "Trial, membership and class enquiries often need follow-up outside staffed hours.",
    solution: "Capture interest, guide bookings and keep prospective members engaged.",
    bottlenecks: ["Unanswered trial enquiries", "Manual class reminders", "Lost membership follow-up"],
    capabilities: ["Trial lead capture", "Class bookings", "Reminders", "Reactivation"],
    micahRole: "Micah can answer common membership questions and guide prospects toward a trial or conversation.",
  },
  {
    slug: "education",
    name: "Education",
    shortName: "Education",
    pain: "Course, enrolment and learner enquiries require clear information and structured follow-up.",
    solution: "Guide prospective learners and organise enrolment communication.",
    bottlenecks: ["Repeated course questions", "Incomplete enrolment enquiries", "Manual learner reminders"],
    capabilities: ["Course navigation", "Enquiry capture", "Appointment pathways", "Learner notifications"],
    micahRole: "Micah can answer common course questions and direct prospective learners to the right application pathway.",
  },
  {
    slug: "automotive",
    name: "Automotive",
    shortName: "Automotive",
    pain: "Service calls and booking requests interrupt workshop work and can be missed during busy periods.",
    solution: "Capture vehicle and service details, organise bookings and improve customer updates.",
    bottlenecks: ["Missed workshop calls", "Incomplete booking details", "Manual service updates"],
    capabilities: ["Service intake", "Booking pathways", "Customer notifications", "Review requests"],
    micahRole: "Micah can collect vehicle and service details and guide customers toward the correct booking pathway.",
  },
  {
    slug: "childcare",
    name: "Childcare",
    shortName: "Childcare",
    pain: "Availability, enrolment and tour enquiries require prompt, reassuring communication.",
    solution: "Create a clear journey from first enquiry to tour or enrolment.",
    bottlenecks: ["Repeated availability questions", "Manual tour coordination", "Incomplete enrolment interest"],
    capabilities: ["Enquiry capture", "Tour bookings", "Parent notifications", "Follow-up workflows"],
    micahRole: "Micah can answer general centre questions and guide families toward a tour or enrolment enquiry.",
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    shortName: "Professional Services",
    pain: "Expert teams lose time qualifying enquiries and coordinating routine next steps.",
    solution: "Structure lead intake, appointments and client onboarding around the service journey.",
    bottlenecks: ["Unqualified enquiries", "Manual appointment coordination", "Inconsistent onboarding"],
    capabilities: ["Lead intake", "Consultation booking", "Pipeline management", "Client onboarding"],
    micahRole: "Micah can identify what a prospect needs and route them to the most useful next step.",
  },
  {
    slug: "multi-location",
    name: "Multi-location Businesses",
    shortName: "Multi-location",
    pain: "Customer communication and follow-up become inconsistent across teams and locations.",
    solution: "Build repeatable workflows with clear routing and shared visibility.",
    bottlenecks: ["Inconsistent location responses", "Unclear enquiry ownership", "Fragmented reporting"],
    capabilities: ["Location routing", "Shared pipelines", "Standard workflows", "Activity reporting"],
    micahRole: "Micah can identify the correct location and route each customer without adding confusion.",
  },
];

export const ECOSYSTEM_GROUPS: { title: string; links: SiteLink[] }[] = [
  {
    title: "Flagship",
    links: [
      { href: "https://directiveos.com.au", label: "Directive OS", description: "Practical business systems.", external: true },
      { href: "https://supermicah.com.au", label: "Micah", description: "Smart business assistance.", external: true },
      { href: "https://chatos.com.au", label: "ChatOS", description: "Customer communication systems.", external: true },
      { href: "https://smartchatwidget.com.au", label: "Smart Chat Widget", description: "Website enquiry capture.", external: true },
    ],
  },
  {
    title: "Business systems",
    links: [
      {
        href: "/solutions/era",
        label: "DOS ERA",
        description: "Inbound email response, capture and routing.",
      },
      {
        href: "/solutions/arc",
        label: "DOS ARC",
        description: "Receivables follow-up and escalation control.",
      },
      {
        href: "/solutions/reputation",
        label: "DOS Reputation",
        description: "Review generation and private feedback capture.",
      },
      {
        href: "/solutions/smart-intake-follow-up",
        label: "Smart Intake & Follow-Up",
        description: "Organised enquiry intake and automatic follow-up.",
      },
    ],
  },
  {
    title: "Industry systems",
    links: [
      { href: "https://realtyos.com.au", label: "RealtyOS", external: true },
      { href: "https://tourismos.com.au", label: "TourismOS", external: true },
      { href: "https://restaurantos.au", label: "RestaurantOS", external: true },
      { href: "https://transportos.com.au", label: "TransportOS", external: true },
    ],
  },
  {
    title: "Infrastructure and public utilities",
    links: [
      { href: "https://doshub.com.au", label: "DOS Hub", external: true },
      { href: "/onboarding/website-rebuild", label: "Website Onboarding" },
      { href: "https://chatos.com.au/onboarding", label: "Micah Onboarding", external: true },
      { href: "/start-here", label: "Business Discovery" },
    ],
  },
];

export const INSIGHTS = [
  {
    slug: "why-small-businesses-miss-bookings",
    title: "Why Small Businesses Miss Bookings — And How To Fix It",
    excerpt: "Practical ways to reduce missed calls, slow replies and booking friction.",
    category: "Customer Communication",
  },
  {
    slug: "your-website-should-do-more-than-look-good",
    title: "Your Website Should Do More Than Look Good",
    excerpt: "Why a modern website needs to build trust, capture enquiries and create action.",
    category: "Website Strategy",
  },
  {
    slug: "smart-chat-widgets-vs-basic-contact-forms",
    title: "Smart Chat Widgets vs Basic Contact Forms",
    excerpt: "How guided conversations improve enquiry capture without adding more manual work.",
    category: "Business Systems",
  },
] as const;

export function getIndustry(slug: string) {
  return INDUSTRIES.find((industry) => industry.slug === slug);
}
