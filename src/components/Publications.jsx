import { motion } from 'framer-motion';

const publications = [
  {
    title: 'On the use of Message Brokers for Real-Time Monitoring Systems',
    date: 'DiTTEt 2024',
    link: 'https://link.springer.com/chapter/10.1007/978-3-031-66635-3_12',
    description: 'Research on using message brokers for real-time system monitoring.',
  },
  {
    title: 'An Audit Framework for Civil Construction Safety Management and Supervision',
    date: 'DiTTEt 2024',
    link: 'https://www.researchgate.net/publication/382069042_An_Audit_Framework_for_Civil_Construction_Safety_Management_and_Supervision',
    description: 'A framework for ensuring safety in civil construction projects.',
  },
  {
    title: 'Database Performance on Android Devices: A Comparative Analysis',
    date: 'Marketing and Smart Technologies 2023',
    link: 'https://link.springer.com/chapter/10.1007/978-981-19-9099-1_18',
    description: 'Comparative analysis of database performance in Android environments.',
  },
  {
    title: 'Mobile Optical Character Recognition',
    date: 'IBIMA 2022',
    link: 'https://link.springer.com/chapter/10.1007/978-3-031-14859-0_6',
    description: 'Research on mobile OCR technology and its applications.',
  },
  {
    title: 'An Intelligent and Scalable IoT Monitoring Framework for Civil Construction Workspaces',
    date: 'DiTTEt 2022',
    link: 'https://ibima.org/accepted-paper/mobile-optical-character-recognition',
    description: 'A scalable IoT framework for safety monitoring in construction sites.',
  },
];

const Publications = () => (
  <div className="flex flex-col justify-between items-center h-auto bg-gradient-to-br from-black via-gray-900 to-transparent p-8 relative">
    <h2 className="text-xl font-bold text-center mb-4">Words I’ve compiled while not compiling code</h2>

    {/* Publications Section */}
    <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {publications.map((pub, index) => (
        <motion.a
          key={index}
          href={pub.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 hover:scale-105"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-bold text-blue-400">{pub.title}</h3>
          <p className="text-sm text-gray-400">{pub.date}</p>
          <p className="text-gray-300">{pub.description}</p>
        </motion.a>
      ))}
    </div>

    {/* Bottom Gradient/Shadow to blend with the next section */}
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-gray-800"></div>
  </div>
);

export default Publications;
