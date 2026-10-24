import React from 'react';

const education = [
  {
    institution: 'Polytechnic Institute of Viseu',
    degree: 'MSc in Computer Science and Engineering - Information Systems',
    date: 'October 2021 - April 2024',
    details: 'Focus on Information Systems, research in real-time monitoring and IoT frameworks.',
  },
  {
    institution: 'Polytechnic Institute of Viseu',
    degree: 'BSc in Computer Science and Engineering',
    date: 'September 2017 - July 2020',
    details: 'Focus on software engineering, distributed systems and databases management.',
  },
];

const Education = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-12 bg-gray-800">
    {education.map((edu, index) => (
      <div key={index} className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold text-white">{edu.degree}</h3>
        <p className="text-gray-400">{edu.institution}</p>
        <p className="text-sm text-gray-500">{edu.date}</p>
        <p className="text-gray-300">{edu.details}</p>
      </div>
    ))}
  </div>
);

export default Education;
