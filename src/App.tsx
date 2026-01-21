import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faExternalLink } from "@fortawesome/free-solid-svg-icons";
import LinkedinIcon from "./UI/LinkedinIcon";
import GithubIcon from "./UI/GithubIcon";

interface Project {
	title: string;
	link: string;
	description: string;
	stack: string[];
	code?: string;
	hasLink?: boolean;
}

const projects: Project[] = [
	{
		title: "Digital Archive of Independent Performing Artists",
		link: "https:/performingarchive.org/de/home",
		description:
			"Headless web application built with Nuxt 3 and TypeScript for managing and exploring archival content of independent performing artists. Data is fetched via an API and stored in a SQL database, with all content fully editable through a CMS. I was the main frontend developer, responsible for architecture, component development, accessibility, and API integration.",
		stack: ["Nuxt 3", "TypeScript", "Vue 3", "SQL"],
	},
	{
		title: "Teddy Awards Website Redesign",
		link: "https://www.teddyaward.tv/de/",
		description:
			"Developed the redesign of the new Teddy Awards website, creating modular templates for CMS integration using HTML5, Nunjucks, and JavaScript. I focused on semantic HTML, accessibility, and CSS standards. As the main frontend developer, I collaborated closely with a senior developer through regular check-ins and code reviews to meet the deadline for the Teddy Award event.",
		stack: ["HTML5 / Nunjucks", "CSS", "JavaScript", "Webpack"],
	},
	{
		title: "xCurator",
		link: "https://xcurator.landesmuseum.de/",
		description:
			"Web platform integrating objects from multiple museum databases, allowing users to explore curated artefacts. I worked in a multidisciplinary team with designers and backend developers and implemented user-facing features such as story creation. A key challenge was handling complex data fetching using GraphQL and Apollo Client.",
		stack: ["Next.js", "TypeScript", "GraphQL", "Apollo Client", "Styled Components", "Radix UI"],
	},
];

const personalProjects: Project[] = [
	{
		title: "Text Analyzer",
		link: "https://text-analyzer-netify.netlify.app/",
		description:
			"				This application allows users to analyze a text by counting the number of characters and paragraphs, among other functions. The main goal of this project was to dive into regular expressions.",
		stack: ["React", "TypeScript"],
		code: "https://github.com/jnuaff/text-analyzer",
		hasLink: true,
	},
	{
		title: "Movies Search Engine",
		link: "https://movies-finder123.netlify.app/",
		description:
			"I've developed a movie search engine utilizing The Movie Database (TMDB) API. Users can seamlessly add movies to a watchlist and remove them at their convenience. This application was built with React and TypeScript, the data was fetched using the TanStack Query Library. A challenge in this project was enabling users to manage their watchlist within a Client-Side Application, allowing them to add and remove movies. I overcame it by using React Context alongside local storage.",
		stack: ["React", "TypeScript"],
		code: "https://github.com/jnuaff/movies-finder",
		hasLink: true,
	},
	{
		title: "This Portfolio",
		link: "",
		description:
			"				I've developed this portfolio to showcase my projects and skills. The main goal of this project was to create a clean and accessible design. I've used React and TypeScript to build this application. I've also used the Interesection Observer API for the navigation.",
		stack: ["React", "TypeScript"],
		code: "https://github.com/jnuaff/jnuaff-portfolio",
		hasLink: false,
	},
];

function App() {
	const aboutRef = useRef<HTMLDivElement>(null);
	const workRef = useRef<HTMLDivElement>(null);
	const personalWorkRef = useRef<HTMLDivElement>(null);
	const contactRef = useRef<HTMLDivElement>(null);
	const [activeSection, setActiveSection] = useState<string | null>(null);
	const externalLinkIcon = faExternalLink as IconProp;
	const envelopeIcon = faEnvelope as IconProp;

	const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
		ref.current?.scrollIntoView({
			behavior: "smooth",
		});
	};

	useEffect(() => {
		const options = {
			threshold: 0.8,
		};

		const onIntersect = (entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setActiveSection(entry.target.id);
				}
			});
		};

		const observer = new IntersectionObserver(onIntersect, options);
		observer.observe(aboutRef.current as HTMLDivElement);
		observer.observe(workRef.current as HTMLDivElement);
		observer.observe(personalWorkRef.current as HTMLDivElement);
		observer.observe(contactRef.current as HTMLDivElement);

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<div className="app">
			<header>
				<h1>Juan Ferreyra</h1>
				<h2>Web Developer</h2>
				<ul className="teaser-links">
					<li>
						<span onClick={() => scrollToRef(aboutRef)} className={`teaser-links__link ${activeSection === "about" ? "active" : ""}`}>
							About
						</span>
					</li>
					<li>
						<span
							onClick={() => scrollToRef(workRef)}
							className={`teaser-links__link ${activeSection === "work" || activeSection === "personalWork" ? "active" : ""}`}>
							Projects
						</span>
					</li>
					<li>
						<span onClick={() => scrollToRef(contactRef)} className={`teaser-links__link ${activeSection === "contact" ? "active" : ""}`}>
							Contact
						</span>
					</li>
				</ul>
			</header>
			<div className="info-wrapper">
				<div className="info-wrapper__content" id="about" ref={aboutRef}>
					<h3>About me</h3>
					<p>
						I was born in Argentina and have been living in Berlin since 2019. My interest in technology has always been driven by curiosity and self-learning. What started as exploration gradually became a professional focus on web development.
						After completing my Abschluss in Anwendungsentwicklung, I worked across both frontend and backend development. Today, my main focus is frontend engineering, supported by a solid understanding of backend concepts and system interactions.
						Since 2022, I have been part of <a href="https://3pc.de/">3pc</a>, where I contribute to building and maintaining complex web applications.
						I enjoy collaborating with teams, solving problems, and helping turn ideas into reliable, well-crafted digital products. Below are some selected projects I have worked on:
					</p>
				</div>
				<span className="divider" />
				<div className="info-wrapper__content" id="work" ref={workRef}>
					<h3>Projects</h3>
					<ul className="info-wrapper__items">
						{projects.map((project) => (
							<li className="info-wrapper__item">
								<a className="info-item__link" href={project.link} target="_blank" rel="noreferrer">
									<h4>{project.title}</h4>
									<FontAwesomeIcon icon={externalLinkIcon} size="sm" />
								</a>
								<p>{project.description}</p>
								<div className="info-item__chips">
									{project.stack.map((stack, index) => (
										<span key={index} className="info-item__chip">
											{stack}
										</span>
									))}
								</div>
							</li>
						))}
					</ul>
				</div>
				<span className="divider" />
				<div id="personalWork" className="info-wrapper__content" ref={personalWorkRef}>
					<h3>Personal Projects</h3>
					<ul className="info-wrapper__items">
						{personalProjects.map((project) => (
							<li className="info-wrapper__item">
								{project.hasLink ? (
									<a className="info-item__link" href={project.link} target="_blank" rel="noreferrer">
										<h4>{project.title}</h4>
										<FontAwesomeIcon icon={externalLinkIcon} size="sm" />
									</a>
								) : (
									<h4>{project.title}</h4>
								)}

								<p>{project.description}</p>
								<p>
									You can see the code{" "}
									<a href={project.code} className="info-item__wrapper">
										<span>
											here
										</span>
										<FontAwesomeIcon className="test" icon={externalLinkIcon} size="xs" />
									</a>
								</p>
								<div className="info-item__chips">
									{project.stack.map((stack, index) => (
										<span key={index} className="info-item__chip">
											{stack}
										</span>
									))}
								</div>
							</li>
						))}
					</ul>
				</div>
				<span className="divider" />
				<div className="contact-wrapper" id="contact" ref={contactRef}>
					<h3>Let's connect!</h3>
					<p>Reach out if you have a project in mind, want to collaborate, or are curious about the code behind my projects.</p>
					<ul className="contact-wrapper__links">
						<li>
							<a
								className="contact-wrapper__link"
								href="https://www.linkedin.com/in/juan-ferreyra-24172b232/"
								target="_blank"
								rel="noreferrer">
								<LinkedinIcon width="24" height="24" fill="#213547" />
							</a>
						</li>
						<li>
							<a className="contact-wrapper__link" href="https://github.com/jnuaff" target="_blank" rel="noreferrer">
								<GithubIcon width="24" height="24" fill="#213547" />
							</a>
						</li>
						<li>
							<a className="contact-wrapper__link" href="mailto:jmferreyrafernandez@gmail.com">
								<FontAwesomeIcon icon={envelopeIcon} size="xl" />
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default App;
