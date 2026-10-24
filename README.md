# Portfolio Website

This is the personal portfolio website of Manuel Lopes, showcasing my professional journey, projects, publications, and certifications. The website is built with modern frontend technologies like React and Framer Motion, featuring animations, a carousel of technologies, and a floating action button for certifications.

## Features:

- Home section with dynamic titles and smooth scroll.

- Projects section showcasing my work with relevant technologies and links to GitHub.

- Publications and Education section with a creative layout and motion animations.

- Experience timeline displaying roles in my professional career.

- Floating Certifications Button that expands on click, showing my certifications.

- Other Technologies carousel for skills not mentioned in specific projects.

- Contact form connected to a backend API to send emails.

## Technologies used:

- React (built with Vite)

- Framer Motion for animations

- Tailwind CSS for styling

- Node.js and Express for the contact form API
 

### Installation:

1\. Clone the repository:

```bash
   git clone https://github.com/your-username/portfolio.git
```

2\. Navigate to the project directory:

```bash
   cd portfolio
```


3\. Install dependencies:

```bash
   npm install
```


4\. Start the development server:

```bash
   npm start
```


This will run the portfolio website on `http://localhost:5173`.

Other scripts:

```bash
   npm test         # run the tests (Vitest)
   npm run build    # production build into build/
   npm run preview  # serve the production build locally
```

### Deployment:

`npm run deploy` builds the site with Vite and publishes `build/` to the `gh-pages` branch (GitHub Pages). Asset paths are relative, so the build also works from any static host or sub-path. For the backend email API, make sure the Node.js server is deployed separately (e.g., on Heroku) and update the contact form endpoint.

### Contact:

If you have any questions or want to connect, feel free to reach out through the contact form on my website.

### License:

This project is licensed under the MIT License.
