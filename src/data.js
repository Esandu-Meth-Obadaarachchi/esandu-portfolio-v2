// All site content lives here. Components only lay it out.
// Copy rule: no em dashes, no invented numbers. Every figure is from the CV.

export const PROFILE = {
  name: 'Esandu Obadaarachchi',
  first: 'Esandu',
  last: 'Obadaarachchi',
  role: 'AI Engineer',
  current: { title: 'Associate Software Engineer, Full Stack AI', company: 'Digital T3', since: 'Sep 2026' },
  email: 'eobadaarachchi@gmail.com',
  phone: '+94 76 779 0567',
  phoneHref: 'tel:+94767790567',
  location: 'Colombo, Sri Lanka',
  cv: '/Esandu_Obadaarachchi_CV.pdf',
  links: {
    linkedin: 'https://linkedin.com/in/esandumeth',
    github: 'https://github.com/Esandu-Meth-Obadaarachchi',
    ieee: 'https://ieeexplore.ieee.org/document/10851118/',
  },
};

// Shown behind the hero doors as they close.
export const PROOF = [
  { value: '4', label: 'national awards' },
  { value: '300+', label: 'production sites' },
  { value: '1', label: 'IEEE paper' },
];

// The way he works, as an agent loop. Order matters: it is a real sequence.
export const LOOP = [
  {
    id: 'understand',
    verb: 'Understand',
    line: 'Find the hour being wasted.',
    body: 'I sit with the people doing the work and name the slow, expensive step. At SLT it was field engineers digging through manuals in the middle of a power fault.',
  },
  {
    id: 'digitise',
    verb: 'Digitise',
    line: 'Turn the work into data.',
    body: 'Paper logs and spreadsheets become one system an AI can read. SLT PowerProx put 12,000+ power assets across 300+ locations into a single platform.',
  },
  {
    id: 'agent',
    verb: 'Build the agent',
    line: 'Wire AI into the loop.',
    body: 'Retrieval, tools and guardrails, built around the real task. The PowerProx agent walks an engineer through a fix step by step and drives the app for them.',
  },
  {
    id: 'evaluate',
    verb: 'Evaluate',
    line: 'Check it before anyone trusts it.',
    body: 'Grading, retries and groundedness checks. In Lune AI every claim has to trace back to a source before the answer leaves the server.',
  },
  {
    id: 'ship',
    verb: 'Ship',
    line: 'On time, with the pipeline included.',
    body: 'I took PowerProx from a blank repo to production and built the CI/CD and deployment workflow end to end, while leading the dev team.',
  },
  {
    id: 'scale',
    verb: 'Scale',
    line: 'Then it grows the business.',
    body: 'PowerProx is rolling out to every SLT branch nationwide and won three national awards. PowerZenith won a fourth. Then the loop starts again.',
  },
];

// Featured case studies. `diagram` picks the mechanism drawing in components/diagrams.
export const FEATURED = [
  {
    id: 'lune',
    diagram: 'lune',
    name: 'Lune AI',
    kicker: 'Agentic RAG second brain',
    summary: 'A multi-tenant assistant over private workspace documents. A LangGraph ReAct agent decides each turn whether it needs a tool. Its knowledge search is a second graph: rewrite the query, retrieve across Pinecone namespaces, rerank with a cross-encoder, grade, retry on a weak grade.',
    did: 'Solo build: architecture, backend, deployment.',
    metrics: [
      { value: '2', label: 'nested LangGraph loops' },
      { value: '6', label: 'agent tools' },
      { value: 'Cited', label: 'every answer' },
    ],
    stack: ['LangGraph', 'Claude Haiku 4.5', 'FastAPI', 'Pinecone', 'Voyage AI', 'Next.js', 'AWS ECS Fargate'],
    links: [
      { label: 'luneai.site', href: 'https://luneai.site' },
      { label: 'Source', href: 'https://github.com/Esandu-Meth-Obadaarachchi/Agentic-Ai-Rag-Chatbot-personal-assistant' },
    ],
  },
  {
    id: 'powerprox',
    diagram: 'powerprox',
    name: 'SLT PowerProx',
    kicker: 'Award-winning AI for national power infrastructure',
    summary: 'Mission-critical platform for SLT Telecom’s power network. A RAG-based agent guides field engineers through fault troubleshooting, procedures and in-app navigation. An LLM quotation analyser automates cost estimation.',
    did: 'Project lead and technical lead. I built it from scratch: frontend, backend, database architecture and the AI, through to production with CI/CD.',
    metrics: [
      { value: '300+', label: 'locations' },
      { value: '12,000+', label: 'assets' },
      { value: '3', label: 'national awards' },
    ],
    stack: ['RAG', 'Agentic AI', 'LLM APIs', 'Flutter', 'FastAPI', 'InfluxDB', 'React', 'MySQL'],
    links: [],
  },
  {
    id: 'powerzenith',
    diagram: 'powerzenith',
    name: 'SLT PowerZenith',
    kicker: 'Real-time energy anomaly detection',
    summary: 'Live energy monitoring for SLT’s HQ data centre and canteen. IoT sensors stream into InfluxDB, an XGBoost model with lag features flags irregular consumption, and a role-based dashboard puts it in front of the right people.',
    did: 'Built from scratch: frontend, backend, database architecture and the anomaly detection pipeline. Led it to production.',
    metrics: [
      { value: 'Live', label: 'in production' },
      { value: '3', label: 'user roles' },
      { value: 'BMPC', label: '2026 award' },
    ],
    stack: ['XGBoost', 'Time series', 'FastAPI', 'InfluxDB', 'React', 'IoT'],
    links: [],
  },
  {
    id: 'macyclegan',
    diagram: 'cyclegan',
    name: 'MA-CycleGAN',
    kicker: 'Few-shot CT to MRI translation',
    summary: 'Final-year thesis. The first integration of first-order MAML with cycle-consistent GANs for brain CT to MRI synthesis. It beats full-data baselines while training on five examples.',
    did: 'Individual research, supervised at IIT / RGU.',
    metrics: [
      { value: '0.9545', label: 'cycle SSIM' },
      { value: '5', label: 'training examples' },
      { value: '98.6%', label: 'less data' },
    ],
    stack: ['PyTorch', 'CycleGAN', 'FOMAML', 'PatchGAN', 'Coordinate attention'],
    links: [
      { label: 'Source', href: 'https://github.com/Esandu-Meth-Obadaarachchi/FEW-SHOT-CROSS-MODAL-MEDICAL-IMAGE-TRANSLATION' },
    ],
  },
];

// Demo reels, played on the laptop in the Demos section and in project drawers.
export const DEMOS = [
  {
    id: 'lune',
    name: 'Lune AI',
    kicker: 'Agents & LLMs',
    line: 'Project and task management with an agentic second brain. Upload anything, ask anything, and it acts.',
    tags: ['LangGraph', 'Claude', 'Pinecone', 'FastAPI', 'Next.js'],
    link: { label: 'luneai.site', href: 'https://luneai.site' },
    src: '/video/lune.mp4',
    poster: '/video/lune.jpg',
  },
  {
    id: 'visitloop',
    name: 'VisitLoop',
    kicker: 'Client product, The Odon',
    line: 'One app to run a hotel: bookings, invoices, stock, and AI that explains the numbers.',
    tags: ['Flutter', 'Node.js', 'MongoDB', 'Claude API'],
    src: '/video/visitloop.mp4',
    poster: '/video/visitloop.jpg',
  },
  {
    id: 'visitloop-finance',
    name: 'VisitLoop Finance',
    kicker: 'Client product, The Odon',
    line: 'Every income, expense and food cost in one view. Claude spots the unusual and writes the monthly report.',
    tags: ['Claude API', 'Anomaly tracking', 'Dashboards'],
    src: '/video/visitloop-finance.mp4',
    poster: '/video/visitloop-finance.jpg',
  },
];

export const CATEGORIES = ['Agents & LLMs', 'Machine learning', 'Research', 'Client products'];

// Every project, for the filterable index.
export const PROJECTS = [
  {
    id: 'lune', name: 'Lune AI', demo: 'lune', category: 'Agents & LLMs', where: 'Independent',
    line: 'Agentic RAG assistant with a self-grading retrieval graph.',
    body: 'A LangGraph ReAct agent over private workspace documents. Knowledge search is its own graph: query rewrite, retrieval across Pinecone namespaces, cross-encoder rerank, relevance grading and retry. A groundedness check verifies every claim traces to a source. Multi-tenant isolation is enforced at the query layer, not by filtering afterwards.',
    stack: ['LangGraph', 'LangChain', 'Claude Haiku 4.5', 'FastAPI', 'Pinecone', 'Voyage AI', 'Firebase', 'Next.js', 'AWS ECS Fargate', 'Docker'],
    links: [{ label: 'Live site', href: 'https://luneai.site' }, { label: 'GitHub', href: 'https://github.com/Esandu-Meth-Obadaarachchi/Agentic-Ai-Rag-Chatbot-personal-assistant' }],
  },
  {
    id: 'powerprox', name: 'SLT PowerProx', category: 'Agents & LLMs', where: 'SLT Telecom',
    line: 'RAG agent for field engineers, 300+ locations, 3 national awards.',
    body: 'Power infrastructure platform for SLT Telecom covering solar assets, AMC records and shift scheduling. A RAG-based agentic workflow guides field engineers through fault troubleshooting and in-app navigation, and an LLM quotation analyser automates cost estimation. BMPC 2025 Telecommunications Category Winner, BMPC 2025 Digital Literacy Cluster, NPME 2025 Silver Award. Built from scratch, end to end: frontend, backend and database architecture, as well as the AI.',
    stack: ['RAG', 'Agentic AI', 'LLM APIs', 'Flutter', 'FastAPI', 'InfluxDB', 'React', 'MySQL', 'Raspberry Pi'],
    links: [],
  },
  {
    id: 'talentgrid', name: 'SLT TalentGrid', category: 'Agents & LLMs', where: 'SLT Telecom',
    line: 'Intern hiring pipeline that ranks CVs and has an LLM score the shortlist.',
    body: 'Vectorises CV text and recruiter prompts, ranks candidates by cosine similarity, then uses an LLM to summarise and score the top matches. Integrated with the Gmail API so CVs flow in without manual handling. Built from scratch, end to end: frontend, backend and database architecture, as well as the AI.',
    stack: ['Embeddings', 'Cosine similarity', 'LLM', 'Python', 'Gmail API'],
    links: [],
  },
  {
    id: 'configurator', name: 'Agentic Workflow Configurator', category: 'Agents & LLMs', where: 'Independent',
    line: 'Turns a configuration into a complete, working agentic application.',
    body: 'Pick the options (RAG, agents, tools, memory, UI, deployment) and it outputs a full project: FastAPI backend, Next.js chat UI, Docker Compose, tests and docs, plus a prompt pack to paste into Claude Code for anything the templates do not cover. Compared with asking Claude Code directly, it surfaces options a developer may not know exist (reranking, hybrid search, chunking strategies), gives the same code for the same spec every time, only ships combinations that boot in CI, costs zero tokens for the predictable parts, and leaves a spec file a team can review and diff, with a decision log explaining each choice.',
    stack: ['FastAPI', 'Next.js', 'Docker Compose', 'RAG', 'Agents', 'CI', 'Claude Code'],
    links: [],
  },
  {
    id: 'ats', name: 'SLT Application Tracking System', category: 'Machine learning', where: 'SLT Telecom',
    line: 'Ranks applicants against job requirements for faster shortlisting.',
    body: 'Internal recruitment dashboard that vectorises candidate CVs and job requirements and ranks applicants by cosine similarity. Used internally for SLT hiring. Built from scratch, end to end: frontend, backend and database architecture, as well as the AI.',
    stack: ['Embeddings', 'NLP', 'FastAPI', 'React', 'Python'],
    links: [],
  },
  {
    id: 'powerzenith', name: 'SLT PowerZenith', category: 'Machine learning', where: 'SLT Telecom',
    line: 'XGBoost anomaly detection on live energy data. BMPC 2026 winner.',
    body: 'Real-time energy dashboard for SLT’s HQ data centre and canteen, with an XGBoost anomaly detection pipeline using lag features to flag irregular consumption. Role-based access for three user roles. BMPC 2026 Digital Literacy Cluster Award Winner. Built from scratch, end to end: frontend, backend and database architecture, as well as the AI.',
    stack: ['XGBoost', 'Time series', 'Anomaly detection', 'React', 'FastAPI', 'InfluxDB', 'IoT'],
    links: [],
  },
  {
    id: 'smartsmile', name: 'SmartSmile', category: 'Machine learning', where: 'University',
    line: 'Edge AI dental X-ray diagnosis that retrains itself from expert labels.',
    body: 'Flutter app running YOLOv10 on-device over OPG dental X-rays. Low-confidence predictions go to Label Studio for expert annotation, and an AWS pipeline (S3, Lambda, SageMaker, EventBridge) retrains the model. A self-improving data loop.',
    stack: ['YOLOv10', 'TensorFlow Lite', 'PyTorch', 'Flutter', 'AWS SageMaker', 'Label Studio', 'Docker'],
    links: [{ label: 'GitHub', href: 'https://github.com/Esandu-Meth-Obadaarachchi/Smart_Smile_edge_ai_app' }],
  },
  {
    id: 'nlp', name: 'Public Opinion Analysis', category: 'Machine learning', where: 'University',
    line: 'Sentiment, topics and entities from Reddit across six model families.',
    body: 'End-to-end NLP pipeline for topic modelling, sentiment analysis and named entity extraction from Reddit via the PRAW API. Trained and compared BERT, DistilBERT, Word2Vec, LSTM, CNN and SVM, with LDA for topics.',
    stack: ['BERT', 'DistilBERT', 'LSTM', 'Word2Vec', 'LDA', 'scikit-learn'],
    links: [{ label: 'GitHub', href: 'https://github.com/Esandu-Meth-Obadaarachchi/Sentiment_analysis_srilankan_education' }],
  },
  {
    id: 'greenguard', name: 'GreenGuard', category: 'Research', where: 'IEEE ICAC 2024',
    line: 'Tea leaf disease detection. 94% accuracy, published on IEEE Xplore.',
    body: 'Mobile app for real-time tea leaf disease detection and treatment guidance. A custom CNN reaches 94% accuracy across 7 disease classes and beats ResNet50V2. Published at ICAC 2024, IEEE Xplore.',
    stack: ['TensorFlow', 'Keras', 'CNN', 'ResNet50V2', 'React Native', 'Flask'],
    links: [{ label: 'IEEE Xplore', href: 'https://ieeexplore.ieee.org/document/10851118/' }, { label: 'GitHub', href: 'https://github.com/DSGPproject/GreenGuard-tea-leaf-disease-detection' }],
  },
  {
    id: 'macyclegan', name: 'MA-CycleGAN', category: 'Research', where: 'Thesis, 2026',
    line: 'Meta-learned CT to MRI synthesis from five training examples.',
    body: 'First integration of FOMAML with cycle-consistent GANs for brain CT to MRI synthesis. Cycle SSIM 0.9545 with 5 training examples, surpassing full-data baselines with 98.6% less data and a train-val gap of 0.0032.',
    stack: ['PyTorch', 'CycleGAN', 'FOMAML', 'ResNet generators', 'PatchGAN', 'AttentionGAN'],
    links: [{ label: 'GitHub', href: 'https://github.com/Esandu-Meth-Obadaarachchi/FEW-SHOT-CROSS-MODAL-MEDICAL-IMAGE-TRANSLATION' }],
  },
  {
    id: 'rl', name: 'RL Traffic Signal Control', category: 'Research', where: 'Research paper, 2025',
    line: 'Six reinforcement learning methods reproduced, SARSA to Transformers.',
    body: 'Survey and implementation of six reinforcement learning approaches to adaptive traffic signal control, reproducing results from six papers spanning 1997 to 2025 in the SUMO simulator.',
    stack: ['Python', 'SUMO', 'TraCI', 'PyTorch', 'TensorFlow'],
    links: [],
  },
  {
    id: 'odon', name: 'VisitLoop', demo: 'visitloop', category: 'Client products', where: 'The Odon Pvt Ltd',
    line: 'Hotel operations app for The Odon, with AI expense entry and insights.',
    body: 'Full-stack hotel management for The Odon, Anuradhapura: bookings, inventory, revenue and staff, on Android and web with CI/CD. The Claude API turns a receipt photo or a typed note into an expense entry and powers financial analysis.',
    stack: ['Flutter', 'Node.js', 'MongoDB', 'Claude API'],
    links: [],
  },
  {
    id: 'hotel-finance', name: 'VisitLoop Finance', demo: 'visitloop-finance', category: 'Client products', where: 'The Odon Pvt Ltd',
    line: 'Full financial view of a hotel, with Claude finding the anomalies.',
    body: 'A hotel finance dashboard that takes its data from VisitLoop and gives a full view of income, expenses, food costs and everything in between. The Claude API is integrated to give insights, track anomalies and write summaries month by month and year by year.',
    stack: ['Claude API', 'Dashboard', 'Anomaly tracking', 'Node.js', 'MongoDB'],
    links: [],
  },
  {
    id: 'greencrest', name: 'Ceylon Green Crest', category: 'Client products', where: 'Via LeadX',
    line: 'International e-commerce for a tea exporter, architected from scratch.',
    body: 'Designed the system architecture and database schema, built the Next.js frontend and Node.js backend, integrated an international payment gateway and deployed on DigitalOcean.',
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'DigitalOcean', 'Payments'],
    links: [],
  },
  {
    id: 'thronestone', name: 'ThroneStone', category: 'Client products', where: 'Freelance',
    line: 'Digital showroom for a stone construction company.',
    body: 'Website that works as a showroom for ThroneStone Pvt Ltd: completed projects, stone materials and finishes, built to turn visitors into enquiries.',
    stack: ['React', 'Node.js', 'CSS'],
    links: [{ label: 'thronestone.com', href: 'https://www.thronestone.com' }],
  },
  {
    id: 'dwellers', name: 'Dwellers Engineering', category: 'Client products', where: 'Freelance',
    line: 'Company website for an engineering firm.',
    body: 'Company website for Dwellers Engineering, designed and built end to end.',
    stack: ['React', 'Responsive design', 'Netlify'],
    links: [{ label: 'Visit site', href: 'https://dwellers-engineering.netlify.app' }],
  },
  {
    id: 'nazik', name: 'Nazik Hamza, Video Editor Portfolio', category: 'Client products', where: 'Freelance',
    line: 'Portfolio website for a video editor.',
    body: 'Portfolio website for Nazik Hamza, a video editor, designed and built end to end.',
    stack: ['React', 'Responsive design', 'Netlify'],
    links: [{ label: 'Visit site', href: 'https://nazik-portfolio.netlify.app/' }],
  },
  {
    id: 'devindri', name: 'Devindri de Silva, Content Specialist Portfolio', category: 'Client products', where: 'Freelance',
    line: 'Portfolio website for a content specialist.',
    body: 'Portfolio website for Devindri de Silva, a content specialist, designed and built end to end.',
    stack: ['React', 'Responsive design', 'Netlify'],
    links: [{ label: 'Visit site', href: 'https://devindri-portfolio.netlify.app/' }],
  },
  {
    id: 'qr', name: 'SLT QR Fault Logging System', category: 'Client products', where: 'SLT Telecom',
    line: 'Scan an asset, log the fault, trigger the workflow.',
    body: 'Location-based fault reporting for field engineers. Scanning an asset QR code logs the fault, triggers the workflow and tracks resolution. In production internally at SLT. Built from scratch: frontend, backend and database architecture.',
    stack: ['MongoDB', 'Express', 'React', 'Node.js'],
    links: [],
  },
];

export const AWARDS = [
  { year: '2026', title: 'Digital Literacy Cluster Winner', body: 'BMPC 2026, CPM Sri Lanka. Among the Forty Outstanding Companies.', project: 'SLT PowerZenith' },
  { year: '2025', title: 'Telecommunications Category Winner', body: 'BMPC 2025, CPM Sri Lanka.', project: 'SLT PowerProx' },
  { year: '2025', title: 'Digital Literacy Cluster', body: 'BMPC 2025. Twenty Outstanding Companies.', project: 'SLT PowerProx' },
  { year: '2025', title: 'Silver, Best Managed Project', body: 'NPME 2025, PMI Colombo. Telecom sector.', project: 'SLT PowerProx' },
];

export const PHOTOS = [
  { src: '/img/bmpc-2026.webp', w: 837, h: 1280, caption: 'BMPC 2026, Digital Literacy Cluster winner' },
  { src: '/img/bmpc-2025-stage.webp', w: 960, h: 1280, caption: 'BMPC 2025, on stage for SLT' },
  { src: '/img/bmpc-2025-team.webp', w: 1280, h: 874, caption: 'BMPC 2025, the PowerProx team' },
  { src: '/img/npme-2025.webp', w: 828, h: 766, caption: 'NPME 2025, Silver Award' },
  { src: '/img/iit-excellence-2025.webp', w: 828, h: 1022, caption: 'IIT Excellence Awards 2025' },
];

export const PAPERS = [
  {
    kind: 'IEEE Xplore, ICAC 2024',
    title: 'GreenGuard: Mobile Application for Real-Time Tea Leaves Disease Detection and Treatment Guidance',
    authors: 'Esandu Obadaarachchi, Damika Saputhanthri, Pramuditha Vithanarachchi, Yoosuf Zuhry, Rasanjalee Rathnayake',
    abstract: 'A custom CNN for real-time disease detection and treatment suggestions that surpasses ResNet50V2, reaching 94% accuracy.',
    metrics: [{ value: '94%', label: 'accuracy' }, { value: '7', label: 'disease classes' }],
    link: { label: 'Read on IEEE Xplore', href: 'https://ieeexplore.ieee.org/document/10851118/' },
  },
  {
    kind: 'Thesis, IIT / Robert Gordon University, 2026',
    title: 'Few-Shot Cross-Modal Medical Image Translation: CT to MRI Generation via Meta-Learning',
    authors: 'Esandu Obadaarachchi. Supervisor: Ms. Sandunika Rasanjalee',
    abstract: 'MA-CycleGAN, the first FOMAML-CycleGAN integration. Five training examples, no overfitting, and better visual realism than full-data baselines.',
    metrics: [
      { value: '0.9545', label: 'cycle SSIM' },
      { value: '98.6%', label: 'less data' },
      { value: '0.0032', label: 'train-val gap' },
      { value: '+48%', label: 'visual realism' },
    ],
    link: { label: 'View the code', href: 'https://github.com/Esandu-Meth-Obadaarachchi/FEW-SHOT-CROSS-MODAL-MEDICAL-IMAGE-TRANSLATION' },
  },
];

// The AI product stack, agents first. Alternates red and green in Stack.jsx.
export const STACK = [
  {
    layer: 'Agents & retrieval',
    note: 'Where most of my work lives now',
    items: ['LangGraph', 'LangChain', 'Claude API', 'OpenAI API', 'Gemini API', 'RAG', 'Pinecone', 'Voyage AI', 'Rerankers', 'n8n', 'Pydantic', 'Prompt engineering'],
  },
  {
    layer: 'Product',
    note: 'The app people actually touch',
    items: ['FastAPI', 'Node.js', 'React', 'Next.js', 'Flutter', 'React Native', 'Python', 'JavaScript', 'Dart', 'Java', 'SQL'],
  },
  {
    layer: 'Models',
    note: 'Training, fine-tuning, evaluating',
    items: ['PyTorch', 'TensorFlow', 'Keras', 'scikit-learn', 'XGBoost', 'Hugging Face', 'BERT', 'YOLO', 'CycleGAN', 'MAML', 'LLM fine-tuning', 'OpenCV'],
  },
  {
    layer: 'Infra & MLOps',
    note: 'So it stays up after launch',
    items: ['AWS ECS Fargate', 'SageMaker', 'Lambda', 'Azure ML', 'Docker', 'GitHub Actions', 'MLflow', 'Firebase', 'PostgreSQL', 'MongoDB', 'InfluxDB'],
  },
];

export const EXPERIENCE = [
  {
    period: 'Sep 2026 - Now',
    role: 'Associate Software Engineer, Full Stack AI',
    org: 'Digital T3',
    current: true,
    points: ['Building full-stack AI products.'],
  },
  {
    period: 'Jun 2025 - 2026',
    role: 'Freelance AI Engineer & Project Lead',
    org: 'SLT Telecom PLC, Head Office',
    points: [
      'Built the RAG-based agentic workflow inside SLT PowerProx that guides field engineers through fault troubleshooting and in-app navigation.',
      'Developed every SLT project from scratch, not only the AI: frontend, backend and database architecture.',
      'Led PowerProx and PowerZenith to production as lead developer and project manager, running task assignment, code review and integration for a team of junior developers.',
      'Built PowerZenith’s XGBoost anomaly detection pipeline.',
    ],
  },
  {
    period: 'Jul 2024 - Jun 2025',
    role: 'AI Engineer Intern',
    org: 'SLT Telecom PLC, Head Office',
    points: [
      'Built SLT TalentGrid, ranking intern CVs against recruiter prompts with vector similarity and the Gmail API.',
      'Added an LLM quotation analyser to PowerProx to automate cost estimation.',
    ],
  },
];

export const EDUCATION = [
  {
    period: '2022 - 2026',
    title: 'BSc (Hons) Artificial Intelligence & Data Science',
    org: 'Robert Gordon University, UK, via IIT Sri Lanka',
    grade: 'First Class Honours',
  },
  {
    period: '2020 - 2022',
    title: 'Cambridge A Levels',
    org: 'Lyceum International School, Nugegoda',
    grade: '3 A*',
    cert: '/img/cert-a-level.webp',
  },
  {
    period: '2018 - 2020',
    title: 'Cambridge O Levels',
    org: 'Lyceum International School, Nugegoda',
    grade: '4 A*, 2 A, 1 C',
    cert: '/img/cert-o-level.webp',
  },
];

export const CERTS = [
  'Neural Networks and Deep Learning, DeepLearning.AI',
  'Multimodal RAG with GPT, Packt',
  'Generative AI Advanced Fine-Tuning for LLMs, IBM',
];

// Sections in page order. Drives the nav and the run rail.
export const SECTIONS = [
  { id: 'top', label: 'Start' },
  { id: 'work', label: 'Work' },
  { id: 'demos', label: 'Demos' },
  { id: 'awards', label: 'Awards' },
  { id: 'research', label: 'Research' },
  { id: 'stack', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'loop', label: 'The loop' },
  { id: 'contact', label: 'Contact' },
];
