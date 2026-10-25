// Everything the site says about Manuel, shared by all three personas.
// Persona-specific wording lives next to each item (recruiter / engineer / curious).

export const CONTACT_ENDPOINT = 'https://immense-ridge-33859-3708a56393e0.herokuapp.com/api/send-email';

export const socials = [
  { name: 'GitHub', href: 'https://github.com/manuelclopes' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/manuelclopes' },
];

export const projects = [
  {
    name: 'francesinhas.top',
    github: 'https://github.com/ManuelCLopes/francesinhas',
    demo: 'https://francesinhas.top',
    stack: ['Next.js 16', 'Prisma 7', 'PostgreSQL', 'TypeScript', 'Tailwind', 'Playwright'],
    featured: true,
    description: 'A focused platform to evaluate francesinhas in Portugal with structured scoring, configurable weighted criteria, national rankings, restaurant insights, and community suggestions.',
    recruiter: { pitch: "Public site ranking Portugal's francesinhas.", signal: 'owns a product from database to design.' },
    engineer: { note: 'Prisma 7 runs on the pg driver adapter. Next 15→16 and Prisma 6→7 landed in the same evening, with unit, integration and e2e suites green.' },
    curious: 'A website that rates francesinhas across Portugal: sauce, bread, meat, the works. Very serious research, eaten one plate at a time.',
  },
  {
    name: 'Competitor Watcher',
    github: 'https://github.com/ManuelCLopes/radar',
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
    stack: ['Electron', 'React', 'TypeScript', 'Vite', 'Tailwind', 'Node.js'],
    featured: true,
    description: 'Local-first macOS workspace for tracking repositories, branch review queues, pull requests, and development activity from one desktop interface.',
    recruiter: { pitch: 'Desktop app for developers to track repos and code reviews.', signal: 'builds tools people use daily.' },
    engineer: { note: 'Local-first: the data stays on your machine, no backend to babysit.' },
    curious: 'A to-do list for programmers that already knows what their code is up to. Lives on your own computer, not in [[the cloud]].',
  },
  {
    name: 'LeadOps.',
    github: 'https://github.com/ManuelCLopes/real-estate-lead-ops',
    demo: 'https://tiny-snickerdoodle-eb2b4c.netlify.app',
    stack: ['HTML', 'CSS'],
    description: 'A high-conversion landing page for the "Lead Ops System" (real estate lead management): agencies capture leads and book demos of a Gmail-as-CRM solution.',
    recruiter: { pitch: 'Landing page for a real estate lead management product.' },
    engineer: { note: 'Static HTML and CSS. Sometimes the right framework is none.' },
    curious: 'A website that helps estate agencies stop losing customers in their inbox.',
  },
  {
    name: 'EasyScan',
    github: 'https://github.com/ManuelCLopes/EasyScan',
    stack: ['Kotlin', 'Firebase', 'Google Cloud Functions'],
    description: 'Native OCR mobile application integrated with Firebase and Google Cloud Functions.',
    recruiter: { pitch: 'Android app that reads text from photos.' },
    engineer: { note: 'Native Android in Kotlin, with Firebase and Google Cloud Functions behind it.' },
    curious: 'Point your phone at a page and it types the text for you.',
  },
  {
    name: 'Real-time Monitoring Safety System',
    github: 'https://link.springer.com/chapter/10.1007/978-3-031-14859-0_6',
    stack: ['Python', 'Kafka', 'RabbitMQ', 'ActiveMQ', 'Docker'],
    description: 'An intelligent and scalable IoT monitoring framework for safety in civil construction workspaces and other sectors.',
    recruiter: { pitch: 'IoT safety monitoring framework, published research.' },
    engineer: { note: 'Message brokers (Kafka, RabbitMQ, ActiveMQ) carry the real-time sensor data.' },
    curious: 'Sensors on construction sites that warn people before something goes wrong.',
  },
  {
    name: 'Finance Tracker Mobile App',
    github: 'https://github.com/ManuelCLopes/finance_tracker',
    stack: ['Flutter', 'Dart'],
    description: 'A Flutter app to manage expenses, income and investments, with multi-language support, net worth and an overview of financial activity.',
    recruiter: { pitch: 'Cross-platform personal finance app.' },
    engineer: { note: 'Flutter and Dart, multi-language, with net worth and an activity overview.' },
    curious: 'An app that tells you where your money went. Sometimes painfully.',
  },
  {
    name: 'Finance Tracker Web App',
    github: 'https://github.com/ManuelCLopes/finance_dashboard',
    stack: ['Python', 'Django', 'JavaScript', 'Heroku'],
    description: 'A web app to visualise financial data with charts. Data is uploaded by scanning a QR code generated by the app and shown in real time.',
    recruiter: { pitch: 'Web dashboard for personal finance data.' },
    engineer: { note: 'Django; data handed over from the phone through a QR code.' },
    curious: 'The same money story, but with charts on a big screen.',
  },
  {
    name: 'GraphPathsCalculator',
    github: 'https://github.com/ManuelCLopes/GraphPathsCalculator',
    stack: ['C++'],
    description: 'A C++ application to explore the capabilities of graphs.',
    recruiter: { pitch: 'Graph algorithms in C++.' },
    engineer: { note: 'Path finding on graphs, written in C++.' },
    curious: 'Finds the best way from A to B. Like a map app, minus the map.',
  },
  {
    name: 'Restaurant Management Desktop App',
    github: 'https://github.com/ManuelCLopes/RestaurantManagement',
    stack: ['Python', 'Tkinter', 'PostgreSQL'],
    description: 'A desktop app to help manage restaurants, with a Tkinter front end and PostgreSQL 11 as the database.',
    recruiter: { pitch: 'Desktop app for restaurant management.' },
    engineer: { note: 'Python + Tkinter front end on PostgreSQL 11.' },
    curious: 'A computer program that helps a restaurant run its day-to-day.',
  },
];

// start / end as YYYY-MM; end null means "now"
export const experience = [
  {
    company: 'Talkdesk', website: 'https://www.talkdesk.com', role: 'Software Engineer', start: '2024-12', end: null,
    engineer: 'Cloud-native, generative-AI customer experience platform, in the cloud and on premises. Mostly Kotlin.',
    curious: 'Building software that helps companies talk to their customers.',
  },
  {
    company: 'Bitsight', website: 'https://www.bitsight.com', role: 'Software Engineer', start: '2024-07', end: '2024-08',
    engineer: 'Scaled REST APIs to serve large amounts of data during rapid user growth.',
    curious: 'Making a big system cope with lots of people at once.',
  },
  {
    company: 'Polytechnic Institute of Viseu', website: 'https://ipv.pt', role: 'Invited Assistant', start: '2023-02', end: null,
    recruiterNote: 'In parallel, teaching.',
    engineer: 'Programming and Algorithms, Software Engineering I, Database Management, NoSQL. Course materials and student support.',
    curious: 'Teaching university students how to program. Turns out explaining things is half the job anyway.',
  },
  {
    company: 'Capgemini', website: 'https://www.capgemini.com/', role: 'Lead Software Engineer', start: '2022-07', end: '2024-06',
    recruiterNote: 'Led delivery and mentored junior developers.',
    engineer: 'OutSystems apps for automatic payment terminal management in banking. Mentoring and code review.',
    curious: 'Leading a team, helping newer developers and checking their work before it went live.',
  },
  {
    company: 'Softinsa', website: 'https://www.softinsa.pt/pt/', role: 'Software Developer', start: '2020-09', end: '2022-06',
    engineer: 'OutSystems for banking: a Reactive web app for vaults management and a Traditional web app for disinvestment properties.',
    curious: 'Building apps for banks with a tool that lets you program by drawing boxes (it’s called [[low-code]]).',
  },
  {
    company: 'Softinsa', website: 'https://www.softinsa.pt/pt/', role: 'Trainee', start: '2020-02', end: '2020-06',
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
  { title: 'Mobile Optical Character Recognition', venue: 'IBIMA 2022', link: 'https://link.springer.com/chapter/10.1007/978-3-031-14859-0_6' },
  { title: 'An Intelligent and Scalable IoT Monitoring Framework for Civil Construction Workspaces', venue: 'DiTTEt 2022', link: 'https://ibima.org/accepted-paper/mobile-optical-character-recognition' },
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
  sensors: 'Little devices that measure things like temperature or movement and report it.',
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
