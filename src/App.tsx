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
}

const projects: Project[] = [
	{
		title: "Teddy Awards Website Redesign",
		link: "https://www.teddyaward.tv/de/",
		description:
			"Developed the redesign of the new Teddy Awards Website. Created modular templates for integration into a CMS using HTML5 / Nunjucks and Javascript. Worked on semantic HTML, accessibility, CSS standards, modern communication design, and backend.",
		stack: ["next js", "typescript"],
	},
	{
		title: "xCurator",
		link: "https://xcurator.landesmuseum.de/",
		description:
			"Web application designed for two museums: the Badisches Landesmuseum in Karlsruhe and Allard Pierson in Amsterdam. Integrated objects from both museums, allowing users to explore a diverse range of museum artifacts. Users can filter objects based on various criteria and add them to their favorites. Next.js was employed for the project, and GraphQL and Apollo Client were utilized for fetching data from the backend. The layout was built using React Styled Components, Stitches, and Radix UI.",
		stack: ["Next.js", "GraphQL", "Apollo Client", "React Styled Components", "Stitches", "Radix UI"],
	},
];

const personalProjects: Project[] = [
	{
		title: "Movies Search Engine",
		link: "https://movies-finder123.netlify.app/",
		description:
			"	I've developed a movie search engine utilizing The Movie Database (TMDB) API. Users can seamlessly add movies to a watchlist and remove them at their convenience. This application was built with React and TypeScript. A challenge in this project was enabling users to manage their watchlist by adding and removing movies.",
		stack: ["React", "TypeScript"],
	},
	{
		title: "Text Analyzer",
		link: "https://movies-finder123.netlify.app/",
		description:
			"				This application was built with React and TypeScript. It allows users to analyze a text by counting the number of characters and paragraphs, among other functions. The challange of this project was to work with regular expressions.",
		stack: ["React", "TypeScript"],
	},
	{
		title: "The mate guide",
		link: "https://movies-finder123.netlify.app/",
		description:
			"Since I'm living in Berlin, there are not many people who are familiar with mate, so I've developed this application to explain to curious people how important this kind of \"tea\" is to me. The challenge of this project was to work with animations and transitions, and integrate some 3D objects with it. I wanted to think out of the box in terms of design.",
		stack: ["React"],
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
				<h2>Junior Frontend Developer</h2>
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
						I'm a self-taught frontend developer currently undergoing an apprenticeship at 3pc. I'm focused on creating clean and semantic
						web applications following accessibility standards. I care about accessible design and development, learn from my teammates,
						and keep up to date trying new technologies.
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
				<div className="contact-wrapper" id="contact" ref={contactRef}>
					<h3>Let's connect!</h3>
					<p>
						Reach out if you have a project in mind, want to collaborate, or are curious about the code behind my projects and let's
						create something amazing together.
					</p>
					<ul className="contact-wrapper__links">
						<li>
							<a className="contact-wrapper__link" href="https://www.linkedin.com/in/juan-ferreyra-24172b232/" target="_blank" rel="noreferrer">
								<LinkedinIcon width="24" height="24" fill="#213547" />
							</a>
						</li>
						<li>
							<a className="contact-wrapper__link" href="https://github.com/jnuaff"  target="_blank" rel="noreferrer">
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
