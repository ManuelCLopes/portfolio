// Everything the site says about Manuel, shared by all three personas.
// Persona-specific wording lives next to each item (recruiter / engineer / curious).

export const CONTACT_ENDPOINT = 'https://immense-ridge-33859-3708a56393e0.herokuapp.com/api/send-email';

export const socials = [
  { name: 'GitHub', href: 'https://github.com/manuelclopes' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/manuelclopes' },
];

export const GITHUB_PROFILE = 'https://github.com/ManuelCLopes';

// `repoPublic: false` hides the code link (it would 404 for visitors) and shows "Private repo" instead.
export const projects = [
  {
    name: 'Aura League',
    github: 'https://github.com/ManuelCLopes/aura-league',
    repoPublic: false,
    demo: 'https://auraleague.app',
    stack: ['React', 'TypeScript', 'Vite', 'Supabase', 'Edge Functions', 'Realtime'],
    featured: true,
    description: 'A competitive meme game with customisable characters and four modes (Pose Battle, Choice Battle, Absurd Arena and 67 Flight), played against the PC or online, on keyboard or touch, in four languages.',
    recruiter: { pitch: 'Online multiplayer game with matchmaking, private rooms and rankings, live at auraleague.app.', signal: 'builds real-time systems that players can’t cheat.' },
    engineer: { note: 'Server-authoritative: the server seeds matches and validates replayed inputs in SQL, clients never submit scores. Realtime with polling recovery, and bounded local prediction in the arena.' },
    curious: 'A silly, very competitive party game: strike poses on the beat, shove your friends off an arena or fly through gaps. Play against the computer or online.',
  },
  {
    name: 'Radar Real Estate',
    github: 'https://github.com/ManuelCLopes/radar-real-estate',
    repoPublic: false,
    status: 'In development',
    stack: ['Next.js 16', 'TypeScript', 'PostgreSQL + PostGIS', 'Clerk', 'MapLibre', 'Vercel Cron'],
    featured: true,
    description: 'Real-estate intelligence for investors in Portugal: find opportunities on a map, model acquisition, renovation, financing, rental and resale scenarios, and track actual returns after buying.',
    recruiter: { pitch: 'Investment decision platform for Portuguese real estate, in development.', signal: 'models a complex domain (finance, tax, data quality) end to end.' },
    engineer: { note: 'Monorepo with a pure investment engine; every analysis is an immutable, explainable version. A PostgreSQL job queue (SKIP LOCKED leases, retries, dead-letter) collects official statistics daily.' },
    curious: 'Helps people decide if a house is a good investment: what it costs to buy, fix and rent out, and what it could earn. Portugal first.',
  },
  {
    name: 'francesinhas.top',
    github: 'https://github.com/ManuelCLopes/francesinhas',
    repoPublic: false,
    demo: 'https://francesinhas.top',
    stack: ['Next.js 16', 'Prisma 7', 'PostgreSQL', 'TypeScript', 'Tailwind', 'Playwright'],
    featured: true,
    description: 'A focused platform to evaluate francesinhas in Portugal with structured scoring, configurable weighted criteria, national rankings, restaurant insights, and community suggestions.',
    recruiter: { pitch: "Public site ranking Portugal's francesinhas.", signal: 'owns a product from database to design.' },
    engineer: { note: 'Weighted criteria per review, aggregates recomputed in the background, and unit, integration and Playwright e2e suites in CI.' },
    curious: 'A website that rates francesinhas across Portugal: sauce, bread, meat, the works. Very serious research, eaten one plate at a time.',
  },
  {
    name: 'Competitor Watcher',
    github: 'https://github.com/ManuelCLopes/radar',
    repoPublic: true,
    demo: 'https://competitorwatcher.pt',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Google Places', 'OpenAI'],
    featured: true,
    description: 'AI-powered local competitor analysis platform. Businesses register, see nearby competitors from Google Places data, and get AI-driven reports to stay ahead.',
    recruiter: { pitch: "AI tool that analyses a business's local competitors.", signal: 'turns AI into something a café owner can use.' },
    engineer: { note: 'Places API provides the facts; the model only writes the narrative around them.' },
    curious: 'Tells a café who the other cafés nearby are and what they do better. It uses [[AI]], the friendly kind.',
  },
  {
    name: 'DevDeck',
    github: 'https://github.com/ManuelCLopes/DevDeck',
    repoPublic: true,
    stack: ['Electron', 'React', 'TypeScript', 'Vite', 'Tailwind', 'Node.js'],
    description: 'Local-first macOS workspace for tracking repositories, branch review queues, pull requests, and development activity from one desktop interface.',
    recruiter: { pitch: 'Desktop app for developers to track repos and code reviews.' },
    engineer: { note: 'Local-first: the data stays on your machine, no backend to babysit.' },
    curious: 'A to-do list for programmers that already knows what their code is up to. Lives on your own computer, not in [[the cloud]].',
  },
  {
    name: 'LeadOps.',
    github: 'https://github.com/ManuelCLopes/real-estate-lead-ops',
    repoPublic: false,
    demo: 'https://tiny-snickerdoodle-eb2b4c.netlify.app',
    stack: ['HTML', 'CSS'],
    description: 'A landing page for the "Lead Ops System" (real estate lead management): agencies capture leads and book demos of a Gmail-as-CRM solution.',
    recruiter: { pitch: 'Landing page for a real estate lead management product.' },
    engineer: { note: 'Static HTML and CSS. Sometimes the right framework is none.' },
    curious: 'A website that helps estate agencies stop losing customers in their inbox.',
  },
  {
    name: 'EasyScan',
    github: 'https://github.com/ManuelCLopes/EasyScan',
    repoPublic: true,
    stack: ['Kotlin', 'Firebase', 'Google Cloud Functions'],
    description: 'Native OCR mobile application integrated with Firebase and Google Cloud Functions.',
    recruiter: { pitch: 'Android app that reads text from photos.' },
    engineer: { note: 'Native Android in Kotlin, with Firebase and Google Cloud Functions behind it.' },
    curious: 'Point your phone at a page and it types the text for you.',
  },
  {
    name: 'Real-time Monitoring Safety System',
    github: 'https://link.springer.com/chapter/10.1007/978-3-031-14859-0_6',
    repoPublic: true,
    stack: ['Python', 'Kafka', 'RabbitMQ', 'ActiveMQ', 'Docker'],
    description: 'An intelligent and scalable IoT monitoring framework for safety in civil construction workspaces and other sectors.',
    recruiter: { pitch: 'IoT safety monitoring framework, published research.' },
    engineer: { note: 'Message brokers (Kafka, RabbitMQ, ActiveMQ) carry the real-time sensor data.' },
    curious: 'Sensors on construction sites that warn people before something goes wrong.',
  },
];

// start / end as YYYY-MM; end null means "now"
export const experience = [
  {
    company: 'Talkdesk', website: 'https://www.talkdesk.com', role: 'Software Engineer', start: '2024-12', end: null,
    recruiterNote: 'Owns services end to end, from discovery and design to monitoring in production. Mostly Kotlin, plus Ruby and React.',
    engineer: 'Kotlin services, with some Ruby and React, for a generative-AI customer experience platform that runs in the cloud and on premises. We own them end to end, from discovery and design to monitoring in production. The day-to-day stack includes PostgreSQL, Cassandra, Kafka, RabbitMQ, Dynatrace and Grafana, among others.',
    curious: 'Building software that helps companies talk to their customers, with AI in the mix. I look after my pieces from the first idea to keeping them healthy once they’re live, mostly writing [[Kotlin]] and watching the [[dashboards]] that show when something’s off.',
  },
  {
    company: 'Bitsight', website: 'https://www.bitsight.com', role: 'Software Engineer', start: '2024-07', end: '2024-08',
    recruiterNote: 'Worked on REST APIs serving large data volumes.',
    engineer: 'Joined a team scaling REST APIs during rapid user growth. Worked on endpoints serving large data volumes.',
    curious: 'A short stop on a team making a big system cope with lots of people at once.',
  },
  {
    company: 'Polytechnic Institute of Viseu', website: 'https://ipv.pt', role: 'Invited Assistant', start: '2023-02', end: '2026-09',
    recruiterNote: 'Taught four university courses alongside industry roles.',
    engineer: 'Taught Programming and Algorithms, Software Engineering I, Database Management and NoSQL. Course materials and student support.',
    curious: 'Taught university students how to program for three and a half years. Turns out explaining things is half the job anyway.',
  },
  {
    company: 'Capgemini', website: 'https://www.capgemini.com/', role: 'Lead Software Engineer', start: '2022-07', end: '2024-06',
    recruiterNote: 'A go-to person on the team. Owned features from design to delivery and mentored junior developers.',
    engineer: 'OutSystems apps for automatic payment terminal management in banking. Responsible for features from design and concept through delivery, and mentored junior developers.',
    curious: 'Building apps for banks, from the first sketch to launch day. One of the people the team came to with questions, and a helping hand for newer developers.',
  },
  {
    company: 'Softinsa', website: 'https://www.softinsa.pt/pt/', role: 'Software Developer', start: '2020-09', end: '2022-06',
    recruiterNote: 'Built two OutSystems web apps for banking: vault and property management.',
    engineer: 'OutSystems for banking: a Reactive web app for vault management and a Traditional web app for properties held for divestment.',
    curious: 'Building apps for banks with a tool that lets you program by drawing boxes (it’s called [[low-code]]).',
  },
  {
    company: 'Softinsa', website: 'https://www.softinsa.pt/pt/', role: 'Trainee', start: '2020-02', end: '2020-06',
    recruiterNote: 'First role: a project time-tracking app that works offline.',
    engineer: 'Online/offline mobile and web app for projects and the hours each collaborator claims.',
    curious: 'First job: an app to track who worked on what, even without internet.',
  },
];

export const education = [
  { degree: 'MSc in Computer Science and Engineering, Information Systems', institution: 'Polytechnic Institute of Viseu', start: '2021-10', end: '2024-04', details: 'Research in real-time monitoring and IoT frameworks.' },
  { degree: 'BSc in Computer Science and Engineering', institution: 'Polytechnic Institute of Viseu', start: '2017-09', end: '2020-07', details: 'Software engineering, distributed systems and database management.' },
];

export const publications = [
  { title: 'On the use of Message Brokers for Real-Time Monitoring Systems', venue: 'DiTTEt 2024', link: 'https://link.springer.com/chapter/10.1007/978-3-031-66635-3_12' },
  { title: 'An Audit Framework for Civil Construction Safety Management and Supervision', venue: 'DiTTEt 2024', link: 'https://www.researchgate.net/publication/382069042_An_Audit_Framework_for_Civil_Construction_Safety_Management_and_Supervision' },
  { title: 'Database Performance on Android Devices: A Comparative Analysis', venue: 'Marketing and Smart Technologies 2023', link: 'https://link.springer.com/chapter/10.1007/978-981-19-9099-1_18' },
  { title: 'Mobile Optical Character Recognition', venue: 'IBIMA 2022', link: 'https://ibima.org/accepted-paper/mobile-optical-character-recognition' },
  { title: 'An Intelligent and Scalable IoT Monitoring Framework for Safety in Civil Construction Workspaces', venue: 'DiTTEt 2022', link: 'https://link.springer.com/chapter/10.1007/978-3-031-14859-0_6' },
];

export const certifications = [
  { name: 'AWS Certified Cloud Practitioner', issuer: 'AWS', date: 'Sep 2022' },
  { name: 'Associate Developer (ODC)', issuer: 'OutSystems', date: 'Mar 2024' },
  { name: 'Mobile Developer Specialist', issuer: 'OutSystems', date: 'Dec 2023' },
  { name: 'Architecture Specialist', issuer: 'OutSystems', date: 'Sep 2022' },
  { name: 'Associate Reactive Developer', issuer: 'OutSystems', date: 'May 2021' },
  { name: 'Associate Traditional Web Developer', issuer: 'OutSystems', date: 'May 2020' },
];

export const otherTech = ['Java', 'Android', 'iOS', 'Kubernetes', 'AWS', 'MySQL', 'Oracle', 'MongoDB', 'JMeter', 'JUnit', 'Postman', 'GitLab', 'Jira'];

// Plain-language translations shown on hover in the Curious persona.
export const jargon = {
  AI: 'Software that can read and write text, a bit like a very fast intern.',
  'the cloud': 'Someone else’s computer, rented by the hour.',
  'low-code': 'Programming by connecting visual blocks instead of typing everything.',
  Kotlin: 'A programming language. Here it runs the servers behind the scenes that the apps talk to.',
  dashboards: 'Screens full of live charts showing whether the system is healthy, like a car’s instrument panel.',
  sensors: 'Little devices that measure things like temperature or movement and report back.',
};

const parse = (ym) => { const [y, m] = ym.split('-').map(Number); return y * 12 + (m - 1); };
// Finished roles count their last month (Jul 2022 – Jun 2024 is 2 years); ongoing ones count up to now.
export const monthsBetween = (start, end, now = new Date()) => {
  const e = end ? parse(end) + 1 : now.getFullYear() * 12 + now.getMonth();
  return Math.max(1, e - parse(start));
};
export const formatTenure = (months) => {
  const y = Math.floor(months / 12), m = months % 12;
  return [y ? `${y} yr` : '', m ? `${m} mo` : ''].filter(Boolean).join(' ') || '1 mo';
};
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const formatMonth = (ym) => { const [y, m] = ym.split('-').map(Number); return `${MONTHS[m - 1]} ${y}`; };
export const formatRange = (start, end) => `${formatMonth(start)} – ${end ? formatMonth(end) : 'now'}`;
export const yearsSince = (ym, now = new Date()) => Math.floor(monthsBetween(ym, null, now) / 12);
