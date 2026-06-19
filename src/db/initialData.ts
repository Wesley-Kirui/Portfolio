export interface DepartmentDetail {
  name: string;
  responsibilities: string[];
  equipment: string[];
  skills: string[];
  products: string[];
}

export interface ProjectDetail {
  id: string;
  title: string;
  category: 'Scientific' | 'Python' | 'Web Dev';
  description: string;
  objectives: string[];
  results: string[];
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  image: string;
}

export interface PublicationDetail {
  id: string;
  title: string;
  authors: string;
  journal: string;
  date: string;
  abstract: string;
  downloadUrl: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export interface AnalyticsData {
  views: number[];
  downloads: number[];
  submissions: number[];
  dates: string[];
}

export const PERSONAL_INFO = {
  fullName: "Wisely Kirui Sichambo",
  title: "Medical Biochemistry Student | Laboratory Scientist | Research Enthusiast",
  tagline: "Transforming scientific knowledge into innovative healthcare and pharmaceutical solutions.",
  email: "weslykirui2003@gmail.com",
  phone: "+254112993021",
  linkedin: "https://www.linkedin.com/in/wisely-kirui-72b5b3278",
  github: "https://github.com/Wesley-Kirui",
  bio: "Medical Biochemistry graduate/student from Jomo Kenyatta University of Agriculture and Technology (JKUAT) with strong laboratory and quality-control experience in regulated environments. Skilled in analytical testing, process monitoring, data analysis, and compliance with Good Laboratory Practices (GLP). Hands-on experience supporting pharmaceutical product formulation, quality assurance, and documentation aligned with international standards.",
  careerObjective: "Highly motivated to develop production, quality, and operational competencies through laboratory quality control, contributing to consistent product quality and continuous process improvement in the pharmaceutical and biotech industries.",
};

export const MILESTONES = [
  { year: "2022", title: "Joined JKUAT", description: "Began Bachelor of Science in Medical Biochemistry at Jomo Kenyatta University of Agriculture and Technology." },
  { year: "2024", title: "Biochemistry Society Chairperson", description: "Elected Chairperson of the JKUAT Society of Biochemistry (served Apr 2024 - Apr 2025)." },
  { year: "2024", title: "Student Union Leadership", description: "Elected Chairperson of the Likuyani Sub-county Students' Association at JKUAT." },
  { year: "2025", title: "Industrial Attachment", description: "Completed a comprehensive 3-month attachment at Lab and Allied Ltd. Manufacturers of Pharmaceuticals." },
  { year: "2025", title: "Professional Training", description: "Certified in QuickBooks/Sage, ILO Start & Improve Your Business, and GEEES Entrepreneurship." },
  { year: "2026", title: "Undergraduate Research", description: "Conducted elemental nutrient comparisons of rock fertilizers vs. supplements; completed graduation requirements." }
];

export const EDUCATION = {
  institution: "Jomo Kenyatta University of Agriculture and Technology (JKUAT)",
  degree: "Bachelor of Science in Medical Biochemistry",
  duration: "Sept 2022 – June 2026",
  coursework: [
    "Instrumental Analysis (FTIR, UV-Vis, GC-MS, LC-MS/MS)",
    "Analytical & Physical Chemistry",
    "Chemical Process & Quality Management",
    "Research Methods & Experimental Design",
    "Thermodynamics & Kinetics"
  ],
  achievements: [
    "Chairperson of JKUAT Society of Biochemistry (2024-2025)",
    "Recipient of JKUSA Speaker's Award for Event Planning Excellence",
    "Earned Certificate of Service for student union leadership"
  ],
  laboratoryTraining: [
    "SOP design & compliance reporting",
    "FTIR spectroscopy & chromatography assays",
    "Workplace Health, Safety & Environment (HSE) protocols",
    "Solid materials characterization & structure-reactivity testing"
  ]
};

export const DEPARTMENTS: DepartmentDetail[] = [
  {
    name: "Granulation",
    responsibilities: [
      "Assisted in wet massing and dry mixing of raw active ingredients and binders.",
      "Monitored moisture content (Loss on Drying - LOD) during process stages.",
      "Sieved dried granules to uniform sizes for compression readiness."
    ],
    equipment: [
      "Rapid Mixer Granulator (RMG)",
      "Fluid Bed Dryer (FBD)",
      "Oscillating Granulator"
    ],
    skills: [
      "Wet granulation process monitoring",
      "Sieving & size control calibration",
      "Binder preparation & hydration testing"
    ],
    products: [
      "Paracetamol granules",
      "Ibuprofen granulated matrices"
    ]
  },
  {
    name: "Dry Mixing",
    responsibilities: [
      "Loaded active pharmaceutical ingredients (APIs) and excipients into industrial blenders.",
      "Ensured thorough blend uniformity before passing batches to compaction.",
      "Maintained batch records (BMR) verifying load sequence and mixing intervals."
    ],
    equipment: [
      "Double Cone Blender",
      "Octagonal Blender",
      "Ribbon Blender"
    ],
    skills: [
      "Blend uniformity testing",
      "Batch Record documentation",
      "Cross-contamination prevention protocols"
    ],
    products: [
      "Multivitamin formulations",
      "Antibiotic powder pre-mixes"
    ]
  },
  {
    name: "Coating",
    responsibilities: [
      "Prepared polymer coating suspensions following detailed formulations.",
      "Adjusted bed temperatures, atomizing pressures, and pan speeds to prevent defects.",
      "Assessed coating thickness and gloss uniformity post-operation."
    ],
    equipment: [
      "Auto-Coater Pan",
      "Pneumatic Spray Guns",
      "Inlet/Exhaust Air Flow Controls"
    ],
    skills: [
      "Polymeric film coating",
      "Spray gun calibration & maintenance",
      "Coating defect troubleshooting (peeling, picking)"
    ],
    products: [
      "Enteric-coated Aspirin",
      "Sugar-coated tablet formulations"
    ]
  },
  {
    name: "Compression",
    responsibilities: [
      "Operated rotary compression presses verifying tablet weight, hardness, and height.",
      "Executed weight variation and friability tests at scheduled intervals.",
      "Adjusted punch pressures to meet pharmacopeial specifications."
    ],
    equipment: [
      "Double-sided Rotary Tablet Press",
      "Hardness Testers",
      "Friability Drums",
      "Vernier Calipers"
    ],
    skills: [
      "In-process quality controls (IPC)",
      "Rotary tool set adjustment",
      "Weight variation monitoring"
    ],
    products: [
      "Cetirizine Hydrochloride tablets",
      "Metformin Hydrochloride tablets"
    ]
  },
  {
    name: "Capsulation",
    responsibilities: [
      "Set up capsule filling machines for varying capsule sizes (00, 0, 1).",
      "Maintained uniform powder flow and filled weight consistency.",
      "Performed sorting and polishing to eliminate dust and static static charges."
    ],
    equipment: [
      "Semi-automatic Capsule Filler",
      "De-duster & Capsule Polisher",
      "Precision Analytical Balances"
    ],
    skills: [
      "Semi-automatic capsulation operation",
      "Tamped powder weight variation control",
      "Machine cleaning and sanitization (CIP)"
    ],
    products: [
      "Amoxicillin Trihydrate capsules",
      "Omeprazole delayed-release capsules"
    ]
  },
  {
    name: "Blister Packaging",
    responsibilities: [
      "Operated thermal blister packaging systems utilizing PVC/Aluminum foils.",
      "Conducted blue dye leak tests to confirm hermetic seal integrity.",
      "Checked batch codes, expiries, and embossing quality on the foils."
    ],
    equipment: [
      "Rotary Blister Packing Machine",
      "Vacuum Leak Tester",
      "Laser Batch Coder"
    ],
    skills: [
      "Forming & sealing temperature control",
      "Embossing audit",
      "Packaging leakage validation"
    ],
    products: [
      "Blister-packed antibiotic tablets",
      "Analgesic strip packaging"
    ]
  },
  {
    name: "Dry Powder Suspension Filling",
    responsibilities: [
      "Monitored automated auger powder filling lines for dry suspensions.",
      "Verified cap torque tightness and induction sealer effectiveness.",
      "Documented fill volume deviations and carried out corrective recalibration."
    ],
    equipment: [
      "Auger Powder Filling System",
      "Induction Bottle Sealer",
      "Torque Meter"
    ],
    skills: [
      "Precision powder dose checks",
      "Hermetic induction sealing verification",
      "High-speed line coordination"
    ],
    products: [
      "Amoxicillin Oral Suspension powder",
      "Cefalexin Dry Suspension"
    ]
  }
];

export const SKILLS = {
  laboratory: [
    { name: "Wet Granulation & Sieve Sizing", level: 90 },
    { name: "Fluid Bed Drying Operations", level: 85 },
    { name: "Tablet Compression & Tooling", level: 85 },
    { name: "Tablet Coating & Defects Audit", level: 80 },
    { name: "Capsule Filling & Weight Control", level: 85 },
    { name: "QC Analytical Assays (FTIR, UV-Vis, GC-MS)", level: 75 },
    { name: "Sample Prep & Dilutions", level: 90 },
    { name: "Good Laboratory Practice (GLP) & HSE Standards", level: 95 }
  ],
  research: [
    { name: "Scientific Writing & Reports", level: 85 },
    { name: "Quantitative Data Analysis", level: 80 },
    { name: "Scientific Literature Review", level: 90 },
    { name: "Experimental Design & Methodologies", level: 85 }
  ],
  technical: [
    { name: "Python Programming (Data & Biotech scripts)", level: 80 },
    { name: "Data Visualization (Matplotlib, Seaborn)", level: 75 },
    { name: "Git & GitHub Version Control", level: 70 },
    { name: "Microsoft Office Suite (Excel, Word)", level: 90 }
  ]
};

export const PROJECTS: ProjectDetail[] = [
  {
    id: "proj_1",
    title: "Medicinal Plant Phytochemistry Analysis",
    category: "Scientific",
    description: "Conducted extraction, screening, and profiling of bioactive phytochemical components of indigenous Kenyan medicinal flora to assay their antibacterial capabilities.",
    objectives: [
      "Perform solvent extraction (maceration) of targeted plant leaves.",
      "Conduct screening for alkaloids, saponins, tannins, and flavonoids.",
      "Test antimicrobial zones of inhibition against standard bacterial strains."
    ],
    results: [
      "Successfully identified robust alkaloid concentrations in methanolic extracts.",
      "Assayed zones of inhibition of up to 18mm against S. aureus.",
      "Drafted comprehensive laboratory report mapping extract yields."
    ],
    technologies: ["Maceration Extraction", "Thin Layer Chromatography (TLC)", "UV-Vis Spectroscopy", "Agar Well Diffusion"],
    githubUrl: "https://github.com/Wesley-Kirui/medicinal-plant-phytochem",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "proj_2",
    title: "Pharmacognosy Laboratory Assays",
    category: "Scientific",
    description: "A series of investigative laboratory reports analyzing secondary metabolites, conducting chemical tests, and profiling extracts via chromatography.",
    objectives: [
      "Isolate and characterize active components using chromatography.",
      "Document standard testing procedures for plant identification.",
      "Observe cell morphology and crystal inclusions under microscope."
    ],
    results: [
      "Compiled 6 detailed laboratory protocols with chromatographic profiles.",
      "Optimized mobile phase ratios for thin-layer chromatography of local weeds.",
      "Created digital microscopic profiles for cellular structures."
    ],
    technologies: ["Chromatography", "Microscopy", "Gravimetric Analysis", "Refractometry"],
    githubUrl: "https://github.com/Wesley-Kirui/pharmacognosy-labs",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "proj_3",
    title: "Biochemical Endocrinology Pathways Simulation",
    category: "Scientific",
    description: "Evaluated metabolic pathways and hormone regulation mechanisms, simulating enzyme kinetics and steroidogenesis feedback loops.",
    objectives: [
      "Model enzyme-substrate reactions of thyroid hormone synthesis.",
      "Plot feedback inhibition curves for endocrine regulators.",
      "Analyze clinical endocrine profiles for virtual metabolic syndromes."
    ],
    results: [
      "Determined Vmax and Km parameters for regulatory hormones.",
      "Built a python simulation representing hormone oscillation curves.",
      "Published review report on endocrine-disrupting chemicals."
    ],
    technologies: ["Enzyme Kinetics", "Python Modeling", "Spectrophotometric Assays", "Pathways Mapping"],
    githubUrl: "https://github.com/Wesley-Kirui/endocrinology-pathways",
    image: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "proj_4",
    title: "Financial Analysis Suite for Biotech Operations",
    category: "Python",
    description: "A python utility designed to consume QuickBooks and Sage data exports to track operating costs, lab consumable burns, and financial run rates.",
    objectives: [
      "Parse and sanitize CSV ledgers from Sage/QuickBooks accounting systems.",
      "Calculate monthly burn rates, inventory valuations, and cost center margins.",
      "Visualize budget allocations and operational expenses."
    ],
    results: [
      "Automated consolidation of laboratory supply invoices, saving hours of manual data entry.",
      "Built a neat dashboard plotting reagent burn vs project timeline.",
      "Improved cost projection accuracy by 15% using historical regression models."
    ],
    technologies: ["Python", "Pandas", "Matplotlib", "QuickBooks API", "Sage Export Parsers"],
    githubUrl: "https://github.com/Wesley-Kirui/biotech-finance-python",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "proj_5",
    title: "Bioinformatics Transcription & Translation Tool",
    category: "Python",
    description: "Python CLI application that accepts DNA sequences, executes transcription/translation, translates to amino acid chains, and identifies reading frames.",
    objectives: [
      "Build a parser for FASTA format DNA files.",
      "Translate codons using the standard genetic code lookup tables.",
      "Detect open reading frames (ORFs) and point mutations."
    ],
    results: [
      "Successfully created a CLI utility capable of processing sequence files up to 50MB.",
      "Integrated visual alignment maps highlighting single nucleotide variants.",
      "Tested and validated tool using JKUAT lab sequence database."
    ],
    technologies: ["Python", "Biopython", "Regex", "Command Line Interface", "FASTA parsing"],
    githubUrl: "https://github.com/Wesley-Kirui/bioinformatics-seq-tools",
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "proj_6",
    title: "Twilight Records Management System",
    category: "Web Dev",
    description: "A React and Node.js portal developed for Twilight Records, supporting artist booking, session tracking, audio visualizers, and digital metadata storage.",
    objectives: [
      "Create a responsive user portal with rich audio player components.",
      "Build a scheduling calendar for studio room bookings.",
      "Deploy secure dashboard showing session invoicing and file downloads."
    ],
    results: [
      "Deployed fully responsive front-end utilizing modern glassmorphic layout.",
      "Integrated Web Audio API for custom interactive audio waveform visualizations.",
      "Enabled cloud attachments for storing raw audio stems."
    ],
    technologies: ["React.js", "Tailwind CSS", "Node.js", "Web Audio API", "LocalStorage / Firebase"],
    githubUrl: "https://github.com/Wesley-Kirui/twilight-records-web",
    liveUrl: "https://twilight-records-demo.netlify.app",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=600"
  }
];

export const RESEARCH_PORTFOLIO = {
  projectTitle: "Comparative Analysis of Nutrient Composition in Rock Fertilizer and Chicken Supplements",
  projectAbstract: "This analytical research project focused on comparative composition mapping of rock phosphate fertilizer bases versus organic chicken bone-meal supplements. Using spectrophotometric and elemental assay techniques, nutrient ratios including Phosphorus, Calcium, and trace metals were quantified. The study evaluates adsorption properties and structure-reactivity relationships to determine optimal soil release metrics, providing quantitative insights that assist agricultural product formulation and yield safety calibrations.",
  projectDetails: [
    "Designed and executed hypothesis-driven chemical testing protocols to assay inorganic components.",
    "Utilized UV-Vis spectroscopy and volumetric titration to measure Phosphate (P2O5) percentages.",
    "Discussed solid material adsorption behavior and heavy metal impurities compliance according to KEBS regulations.",
    "Formulated a technical report summarizing statistical variance between organic and inorganic supplements."
  ],
  interests: [
    "Quality Control in Pharmaceutical Systems",
    "Phytochemistry and Pharmacognosy Natural Products",
    "Biomedical Endocrinology and Metabolic Biochemistry",
    "Bioinformatics Sequence Alignments & Data Modeling",
    "Biotechnology and Gene Expression Systems"
  ],
  publications: [
    {
      id: "pub_1",
      title: "Comparative Analysis of Nutrient Composition in Rock Fertilizer and Chicken Supplements",
      authors: "Wisely Kirui Sichambo",
      journal: "JKUAT Society of Biochemistry Conference",
      date: "August 2025",
      abstract: "An analytical study investigating the comparative elemental distribution of phosphorus, calcium, and trace contaminants in rock fertilizer formulations compared to organic poultry mineral supplements. Evaluated using spectrophotometric indicators.",
      downloadUrl: "#"
    },
    {
      id: "pub_2",
      title: "Quality Control Standards and Good Laboratory Practices (GLP) in East African Pharmaceutical Manufacturing",
      authors: "W. K. Sichambo",
      journal: "Undergraduate Review of Scientific Methods",
      date: "November 2025",
      abstract: "A synthesis review documenting process validations in pharmaceutical tableting and coating lines, focusing on standard operating procedures, clean-in-place configurations, and equipment calibrations in Kenya.",
      downloadUrl: "#"
    }
  ]
};

export const CERTIFICATIONS = [
  {
    title: "QuickBooks & Sage Accounting Software",
    issuer: "Vision Institute of Professionals",
    date: "2025",
    description: "Intensive certification training covering digital ledgers, inventory tracking, cost adjustments, cash flows, and report exports used for financial audits.",
    code: "VIP-QB-SAGE-2025"
  },
  {
    title: "Start & Improve Your Business (SIYB)",
    issuer: "International Labour Organization (ILO)",
    date: "2025",
    description: "Global business management training detailing operational planning, market evaluations, pricing models, and compliance logistics for startup models.",
    code: "ILO-SIYB-KE-904"
  },
  {
    title: "GEEES Entrepreneurship Bootcamp",
    issuer: "Global Education & Entrepreneurship Society",
    date: "2025",
    description: "Immersive program focusing on project pitch preparation, cross-functional leadership, risk assessments, and venture scaling metrics.",
    code: "GEEES-EB-2025-081"
  }
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: "blog_1",
    title: "Understanding High-Performance Liquid Chromatography (HPLC) in Drug Testing",
    excerpt: "An overview of HPLC columns, mobile phase preparations, and detection assays utilized for validating drug purity in active pharmaceutical lines.",
    content: "High-Performance Liquid Chromatography (HPLC) is the cornerstone of modern pharmaceutical quality control. By pumping a liquid solvent (mobile phase) containing the sample mixture through a column filled with solid adsorbent material (stationary phase), different compounds in the sample are separated based on their chemical interactions.\n\nAt Lab and Allied Ltd., chromatography technologies like UV-Vis detectors connected to liquid lines are instrumental in checking that active ingredients like Paracetamol or Amoxicillin conform to pharmacopeial dosage margins. In this article, we break down how to optimize peak resolutions and resolve common chromatography noises...",
    category: "Analytical Chemistry",
    date: "June 10, 2026",
    author: "Wisely Kirui Sichambo",
    readTime: "5 min read"
  },
  {
    id: "blog_2",
    title: "The Biochemistry of Natural Antipyretics: Plant Metabolites",
    excerpt: "Exploring secondary metabolites, phytochemical groups, and the biochemical mechanisms of organic compounds in managing cellular inflammation.",
    content: "Phytochemistry studies the chemical structures and biological activities of substances produced by plants. Natural antipyretics and anti-inflammatories have been used for generations in traditional medicine. Secondary metabolites such as flavonoids, alkaloids, and terpenoids act by inhibiting key enzymatic pathways like Cyclooxygenase (COX-1 and COX-2), reducing prostaglandin synthesis.\n\nIn our laboratory screenings, methanolic extracts of local medicinal weeds were assayed. By tracing zones of inhibition, we can match chemical concentration profiles with clinical efficacy, showing the pathway from natural botany to synthetic pharmaceuticals...",
    category: "Phytochemistry",
    date: "May 18, 2026",
    author: "Wisely Kirui Sichambo",
    readTime: "7 min read"
  },
  {
    id: "blog_3",
    title: "Writing Python Scripts for DNA Codon Translators",
    excerpt: "A simple guide to using Python strings, lists, and dictionary lookups to build high-performance codon translation files for sequence analysis.",
    content: "Bioinformatics bridges the gap between molecular biology and computer science. Python is an excellent language for bioinformatics due to its readability and powerful text manipulation libraries. A basic translation script maps triplets of DNA nucleotides (codons) to specific amino acids.\n\nBy defining a dictionary representing the standard genetic code, we can read FASTA files, locate start codons (AUG), translate sequences, and identify stop codons (UAG, UAA, UGA) to isolate open reading frames. In this post, we share a clean, optimized script and discuss how it can assist laboratory diagnostics...",
    category: "Bioinformatics",
    date: "April 24, 2026",
    author: "Wisely Kirui Sichambo",
    readTime: "4 min read"
  }
];

export const MOCK_ANALYTICS: AnalyticsData = {
  views: [142, 195, 230, 310, 280, 395, 480],
  downloads: [18, 24, 31, 40, 38, 52, 64],
  submissions: [2, 5, 4, 8, 3, 9, 12],
  dates: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
};
