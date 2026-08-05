export interface Profile {
  name: string
  roles: string[]
  tagline: string
  bio: string
  email: string
  location: string
  linkedin: string
  github: string
  leetcode: string
  resumeFile: string
}

export interface EducationItem {
  school: string
  location: string
  degree: string
  score: string
  period: string
}

export interface ExperienceItem {
  title: string
  company: string
  location: string
  period: string
  bullets: string[]
  certificate?: string
}

export interface ProjectItem {
  slug: string
  name: string
  period: string
  emoji: string
  category: string
  tags: string[]
  description: string
  bullets: string[]
  github?: string
  demo?: string
  admin?: string
}

export interface SkillGroup {
  category: string
  items: string[]
}

export interface AchievementItem {
  title: string
  period: string
  description: string
  link?: string
  linkLabel?: string
}

export interface CertificationItem {
  name: string
  issuer: string
  period: string
  link: string
}

export const profile: Profile = {
  name: 'Harshitha Palaram',
  roles: [
    'AI/ML Engineer',
    'Computer Vision Researcher',
    'Full-Stack Engineer',
  ],
  tagline: 'Building systems that turn data into decisions',
  bio: "I'm a B.Tech student in Artificial Intelligence and Data Science at Shiv Nadar University, Chennai, building deep learning pipelines, computer vision systems, and full-stack applications. My recent work spans satellite-imagery segmentation for glacial lake outburst floods, rip-current detection for CVPR's NTIRE 2026 challenge, and GenAI-powered tools like a RAG study assistant and an AI-driven financial risk platform. I enjoy taking a project from a research idea to a working, deployed product.",
  email: 'harshithapalaram09@gmail.com',
  location: 'Chennai, India',
  linkedin: 'https://www.linkedin.com/in/harshitha-palaram-aa42a4348/',
  github: 'https://github.com/H4rshitha',
  leetcode: 'https://leetcode.com/u/VVQfJJi5NW/',
  resumeFile: '/resume.pdf',
}

export const education: EducationItem[] = [
  {
    school: 'Shiv Nadar University',
    location: 'Chennai',
    degree: 'B.Tech in Artificial Intelligence and Data Science',
    score: 'CGPA: 7.713',
    period: 'Aug 2023 -- May 2027',
  },
  {
    school: 'FIITJEE Junior College',
    location: 'Hyderabad',
    degree: 'Intermediate (Class XII)',
    score: '95.4%',
    period: 'May 2021 -- May 2023',
  },
  {
    school: 'Royale Concorde International School',
    location: 'Bengaluru',
    degree: 'Class X (CBSE)',
    score: '96.6%',
    period: 'Till May 2021',
  },
]

export const experience: ExperienceItem[] = [
  {
    title: 'Machine Learning Intern',
    company: 'Cognifyz IT Solutions Pvt. Ltd.',
    location: 'Remote',
    period: 'Apr 2026 -- May 2026',
    bullets: [
      'Engineered and evaluated end-to-end machine learning pipelines for restaurant rating prediction, recommendation systems, cuisine classification, and location analytics using Python, Pandas, NumPy, Scikit-learn, TF-IDF, and cosine similarity.',
      'Optimized regression models using Random Forest, XGBoost, and CatBoost, achieving 95.35% R² with 0.33 RMSE; leveraged DBSCAN clustering and SHAP explainability to extract actionable insights and improve model interpretability.',
    ],
    certificate: 'https://drive.google.com/file/d/19Jnc3It1br9hTEznDRrb0r6Wg85VJ9hN/view?usp=sharing',
  },
]

export const projects: ProjectItem[] = [
  {
    slug: 'glofeagles',
    name: "Glacial Lake Outburst Flood Detection (GLOFeagles'26)",
    period: '2026',
    emoji: '🏔️',
    category: 'COMPUTER VISION · SEGMENTATION · CVPR',
    tags: ['U-Net++', 'EfficientNet-B4', 'PyTorch', 'Computer Vision'],
    description:
      "A dual-task pipeline that spots glacial lakes from satellite imagery before they burst and flood a valley downstream — EfficientNet-B4 classifies, U-Net++ segments. Good enough for a Top 5 finish and a trip to present at NCVPRIPG'26 in Jaipur.",
    bullets: [
      'Architected a dual-task pipeline using EfficientNet-B4 for 6-class classification and U-Net++ for semantic segmentation of glacial lakes from satellite imagery.',
      'Achieved 0.6260 Mean IoU, 0.6920 Dice/F1, and 0.7656 Precision on 2,220 image-mask pairs using hybrid Focal + Tversky Loss, mixed precision training (AMP), and Albumentations.',
      "Top 5 Finalist at NCVPRIPG 2026 -- presented the solution at the finale in LNMIIT, Jaipur.",
    ],
    github: 'https://github.com/sathwik324/GlacioX_GLOF_Challenge',
  },
  {
    slug: 'ntire-ripcurrent',
    name: 'NTIRE 2026 Rip Current Detection & Segmentation Challenge',
    period: '2026',
    emoji: '🌊',
    category: 'COMPUTER VISION · YOLOV8 · CVPR WORKSHOP',
    tags: ['PyTorch', 'YOLOv8', 'OpenCV', 'CVPR Workshop'],
    description:
      "A YOLOv8 pipeline that spots rip currents in ocean imagery before they pull someone under — segmentation, contour extraction, and test-time augmentation stacked together for a Top 7 finish among 900+ submissions at CVPR's NTIRE 2026 Workshop.",
    bullets: [
      'Designed a YOLOv8-based pipeline for rip current detection using segmentation, contour extraction, morphological operations, and post-processing for accurate localization.',
      'Implemented multi-scale inference and test-time augmentation (TTA), contributing to a Top 7 global ranking among 900+ submissions at the NTIRE CVPR 2026 Workshop Challenge.',
    ],
    github: 'https://github.com/H4rshitha/Rip-Current-Detection',
  },
  {
    slug: 'finascend',
    name: 'FinAscend: AI-Powered Financial Decision System',
    period: '2026',
    emoji: '💸',
    category: 'FULL STACK · FINTECH · EXPLAINABLE AI',
    tags: ['Monte Carlo Simulation', 'Explainable AI', 'OCR'],
    description:
      "An AI-powered financial analytics platform for small businesses — OCR reads their invoices, Monte Carlo simulations forecast risk, and explainable AI shows exactly why it predicts what it predicts about liquidity and runway. Hackathon finalist at SNUC Hacks'26.",
    bullets: [
      'Developed an AI-powered financial analytics platform integrating OCR and API pipelines to process invoices and financial statements for small businesses.',
      'Implemented Monte Carlo simulations, probabilistic risk forecasting, and Explainable AI techniques to predict liquidity, runway, and bankruptcy risk.',
      "Finalist at SNUC Hacks'26 FinTech Hackathon.",
    ],
    github: 'https://github.com/Pradeepaa001/fin-ascent',
  },
  {
    slug: 'learn-lynx',
    name: 'Learn-Lynx: GenAI-Powered Study Partner',
    period: '2025',
    emoji: '📖',
    category: 'GENAI · RAG · FULL STACK',
    tags: ['LangChain', 'RAG', 'Hugging Face', 'Streamlit'],
    description:
      "A Retrieval-Augmented Generation study partner built with LangChain and Hugging Face — semantic search over your notes, real-time summarization, and a Streamlit interface that turns 'I have an exam tomorrow' into an actual study plan.",
    bullets: [
      'Created a RAG study assistant using LangChain, Sentence Transformers, and Hugging Face for semantic search, summarization, and question answering.',
      'Delivered an interactive Streamlit application providing personalized learning plans and real-time AI-assisted study support through vector-based document retrieval.',
    ],
    github: 'https://github.com/H4rshitha/Learn-Lynx-GenAI-Study-Assistant',
  },
  {
    slug: 'food-delivery',
    name: 'Food Delivery Web Application',
    period: '2025',
    emoji: '🛵',
    category: 'FULL STACK · MERN · E-COMMERCE',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    description:
      'A full-stack food ordering platform built from scratch — React front end, Node/Express API, MongoDB behind it, JWT auth and role-based access control for customers and admins, deployed live on Vercel and Render.',
    bullets: [
      'Built a full-stack food ordering platform using React.js, Node.js, Express.js, and MongoDB featuring authentication, cart management, and order processing.',
      'Implemented JWT authentication, role-based access control, RESTful APIs, and deployed production-ready applications on Vercel and Render.',
    ],
    github: 'https://github.com/H4rshitha/food-del',
    demo: 'https://food-del-murex-six.vercel.app/',
    admin: 'https://food-del-admin-hazel.vercel.app/',
  },
]

export const skills: SkillGroup[] = [
  {
    category: 'Languages',
    items: ['Python', 'Java', 'C', 'JavaScript (ES6+)', 'SQL', 'HTML/CSS'],
  },
  {
    category: 'Frameworks & Web',
    items: ['React.js', 'Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'JWT', 'Tailwind CSS'],
  },
  {
    category: 'AI/ML',
    items: [
      'PyTorch',
      'TensorFlow',
      'Scikit-learn',
      'OpenCV',
      'YOLOv8',
      'Hugging Face Transformers',
      'Sentence Transformers',
      'RAG',
      'Semantic Segmentation',
    ],
  },
  {
    category: 'Libraries',
    items: ['NumPy', 'Pandas', 'Matplotlib', 'NLTK'],
  },
  {
    category: 'Databases',
    items: ['MongoDB', 'MySQL'],
  },
  {
    category: 'Tools',
    items: ['Git', 'GitHub', 'Docker', 'Linux', 'Jupyter Notebook', 'VS Code', 'Vercel', 'Render', 'Streamlit'],
  },
]

export const achievements: AchievementItem[] = [
  {
    title: 'Top 5 Finalist -- GLOFeagles Challenge (NCVPRIPG 2026)',
    period: '2026',
    description:
      'Selected among the Top 5 teams and invited to present the solution at the NCVPRIPG 2026 finale in LNMIIT, Jaipur.',
    link: 'https://drive.google.com/file/d/1CuydxqpQ9sWZf828fMRX9k9Qe12Y9JFG/view?usp=sharing',
    linkLabel: 'Certificate',
  },
  {
    title: 'Top 7 Global Rank -- NTIRE 2026 Rip Current Detection & Segmentation Challenge (CVPR)',
    period: '2026',
    description: 'Secured 7th place among 900+ global submissions in an international computer vision challenge.',
    link: 'https://www.codabench.org/competitions/12730/#/results-tab',
    linkLabel: 'Leaderboard',
  },
  {
    title: "Finalist -- SNUC Hacks'26 FinTech Hackathon",
    period: '2026',
    description: 'Presented FinAscend, an AI-powered financial decision support system, and advanced to the hackathon finals.',
  },
]

export const certifications: CertificationItem[] = [
  {
    name: 'Affective Computing',
    issuer: 'NPTEL',
    period: 'Jan 2026 -- Apr 2026',
    link: 'https://drive.google.com/file/d/1LjE9Xx123oKRWybuoTQr_dT-rHtWnOhV/view?usp=sharing',
  },
  {
    name: 'Programming in Java',
    issuer: 'NPTEL',
    period: 'Jul 2025 -- Oct 2025',
    link: 'https://drive.google.com/file/d/161d07655xKWlj3nm2EuattVu9Zrj87Jy/view?usp=sharing',
  },
  {
    name: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI',
    period: 'Feb 2025 -- Apr 2025',
    link: 'https://drive.google.com/file/d/11KM7Q-gcr6RudOmmaNWrqm8yhFeaZSfE/view?usp=sharing',
  },
]
