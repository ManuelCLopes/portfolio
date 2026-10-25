# Portfolio Website

This is the personal portfolio website of Manuel Lopes, showcasing my professional journey, projects, publications, and certifications. The website is built with React and GSAP. Visitors pick who they are (recruiter, engineer or just curious) and the whole site rewrites its copy, level of detail and scroll animations for them.

## Features:

- Persona chooser: recruiter, engineer or just curious, each with an animated character that reacts on hover and when picked. Nothing is shown until the visitor picks one; a choice can be linked directly (`#recruiter`, `#engineer`, `#curious`).

- Each persona gets its own copy, level of detail and scroll choreography; switch at any time from the sticky bar.

- Projects with stack, notes and links to GitHub and live demos.

- Career timeline with tenure, publications, degrees and certifications.

- Contact form connected to a backend API to send emails.

- Respects reduced-motion settings and works without animations.

## Technologies used:

- React (built with Vite)

- GSAP (ScrollTrigger, MotionPath) for animations

- Plain CSS with design tokens, light and dark

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
