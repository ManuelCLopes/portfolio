import React from "react";

const experience = [
  {
    company: "Talkdesk",
    website: "https://www.talkdesk.com",
    role: "Software Engineer",
    date: "December 2024 - Present",
    details:
      "With our cloud-native, generative AI-powered CX platform, purpose-built industry solutions, and extensible AI offerings, we empower enterprises in the cloud and on premises to deliver exceptional customer experiences that make them more competitive, grow revenue, reduce costs, and provide operational efficiencies.",
  },
  {
    company: "Polytechnic Institute of Viseu",
    website: "https://ipv.pt",
    role: "Invited Assistant",
    date: "February 2023 - Present",
    details:
      "Programming and Algorithms, Software Engineering I, Database Management, and NoSQL courses.\nDeveloped course materials and provided academic support to students.",
  },
  {
    company: "Bitsight",
    website: "https://www.bitsight.com",
    role: "Software Engineer",
    date: "July 2024 - August 2024",
    details:
      "Contribute to scale SaaS product during a time of rapid user growth. Maintain, build, and optimize REST APIs with a particular focus on making existing APIs scale to handle large amounts of data.",
  },
  {
    company: "Capgemini",
    website: "https://www.capgemini.com/",
    role: "Lead Software Engineer",
    date: "July 2022 - June 2024",
    details:
      "Design and develop applications using Outsystems platform.\nDevelopment of new functionalities for Automatic Payment Terminals Management Web App for the banking sector.\nMentor junior developers and review code to ensure best practices.",
  },
  {
    company: "Softinsa",
    website: "https://www.softinsa.pt/pt/",
    role: "Software Developer",
    date: "September 2020 - June 2022",
    details:
      "Developed web applications using OutSystems for the banking sector.\nCreated and developed a Reactive Web app for Vaults Management.\nDeveloped new functionalities for a Traditional Web app responsible for Disinvestment Properties Management.",
  },
  {
    company: "Softinsa",
    website: "https://www.softinsa.pt/pt/",
    role: "Trainee",
    date: "February 2020 - June 2020",
    details:
      "Developed a comprehensive mobile (online and offline) and web application for managing projects and the respective hours claimed by each company collaborator.",
  },
];

const Experience = () => {
  return (
    <div className="p-6 md:p-12 bg-gray-800 text-white">
      <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center">
        Tech roles that shaped my journey
      </h2>
      <div className="relative">
        {/* Central line */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-500 h-full"></div>
        <div className="space-y-8 md:space-y-12 max-w-6xl mx-auto">
          {experience.map((exp, idx) => (
            <div
              key={exp.company}
              className={`relative flex flex-col md:flex-row items-center ${
                idx % 2 === 0 ? "md:justify-start" : "md:justify-end"
              }`}
            >
              <div
                className={`w-full md:w-auto max-w-full md:max-w-[45%] p-6 bg-gray-900 rounded-lg shadow-lg ${
                  idx % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                }`}
              >
                <h3 className="text-lg md:text-2xl font-bold mb-2">
                  {exp.role}
                </h3>
                <a
                  href={exp.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg text-gray-400"
                >
                  {exp.company}
                </a>
                <p className="text-sm text-gray-500 mb-2">{exp.date}</p>
                <p className="text-gray-400 whitespace-pre-line">
                  {exp.details}
                </p>
              </div>
              {/* Blue dot for timeline */}
              <div
                className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-8 w-8 bg-blue-500 rounded-full"
                style={{ top: "50%", transform: "translate(-50%, -50%)" }} // Adjust for perfect vertical centering
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
