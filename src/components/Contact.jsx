import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({ message: '', type: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ message: '', type: '' });

    try {
      const response = await fetch('https://immense-ridge-33859-3708a56393e0.herokuapp.com/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ message: 'Your message was sent successfully!', type: 'success' });
        setFormData({ name: '', email: '', message: '' }); // Clear the form
      } else {
        setStatus({ message: 'Failed to send the message. Please try again later.', type: 'error' });
      }
    } catch (error) {
      setStatus({ message: 'An error occurred. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="bg-gray-900 text-white py-12 px-6">
      <h2 className="text-4xl font-bold mb-6 text-center">
        Glad you made it this far! Let's discuss some ideas!
      </h2>
      <p className="text-xl text-center text-gray-400 mb-12">
        Whether you want to chat about tech, ask questions, or brainstorm brilliant ideas, I'm just a message away
      </p>

      <form className="max-w-lg mx-auto space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-300">Your Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="What should I call you?"
            className="w-full p-4 mt-1 bg-gray-800 text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Your Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Where can I reach you?"
            className="w-full p-4 mt-1 bg-gray-800 text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Your Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="What's on your mind?"
            className="w-full p-4 mt-1 bg-gray-800 text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows="5"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-500 focus:outline-none"
        >
          Send Message
        </button>

        {/* Status Message */}
        {status.message && (
          <div
            className={`mt-4 text-center font-semibold ${
              status.type === 'success' ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {status.message}
          </div>
        )}
      </form>

      {/* GitHub and LinkedIn buttons */}
      <div className="flex justify-center space-x-6 mt-8">
        <a
          href="https://github.com/manuelclopes"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg"
            alt="GitHub"
            className="w-8 h-8 text-gray-400 hover:text-white transition-colors"
            style={{ filter: "invert(100%)" }}
          />
        </a>

        <a
          href="https://www.linkedin.com/in/manuelclopes"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg"
            alt="LinkedIn"
            className="w-8 h-8 text-gray-400 hover:text-white transition-colors"
            style={{ filter: "invert(100%)" }}
          />
        </a>
      </div>

      <p className="text-center text-gray-500 mt-8">
        Don’t be shy, I’d love to hear from you!
      </p>
    </div>
  );
};

export default Contact;
