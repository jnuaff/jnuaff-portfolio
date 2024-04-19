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
		title: "Teddy Awards Website Redesign",
		link: "https://www.teddyaward.tv/de/",
		description:
			"Developed the redesign of the new Teddy Awards Website, creating modular templates for integration into a CMS using HTML5/Nunjucks and JavaScript. I focused on semantic HTML, accessibility, CSS standards, modern communication design, and backend integration. I've worked alongside a Senior Developer who guided me through the project with mentoring and code reviews.",
		stack: ["HTML5 / Nunjucks", "CSS", "JavaScript", "Webpack"],
	},
	{
		title: "xCurator",
		link: "https://xcurator.landesmuseum.de/",
		description:
			"Integrated objects from two museum databases, enabling users to explore a diverse range of museum artefacts. I worked in a multidisciplinary team, collaborating with designers and backend developers. I was responsible for implementing some features, such as creating new stories in the user section. The main challenge of this was fetching data from the database, which required me to dive into GraphQL and Apollo Client to send requests through an API.",
		stack: ["Next.js", "Typescript", "GraphQL", "Apollo Client", "React Styled Components", "Stitches", "Radix UI"],
	},
];

const personalProjects: Project[] = [
	{
		title: "This Portfolio",
		link: "",
		description:
			"				I've developed this portfolio to showcase my projects and skills. The main goal of this project was to create a clean and accessible design. I've used React and TypeScript to build this application. I've also used the Interesection Observer API for the navigation.",
		stack: ["React", "TypeScript"],
		code: "https://github.com/jnuaff/jnuaff-portfolio",
		hasLink: false,
	},
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
		title: "The Mate Tee guide",
		link: "https://mate-tee-guide.netlify.app/",
		description:
			"Since I'm living in Berlin, there are not many people who are familiar with mate, so I've developed this application to explain curious people how important this kind of \"tea\" is to me. The challenge of this project was to play with animations and transitions, integrate some 3D objects and think out of the box in terms of design.",
		stack: ["React", "TypeScript"],
		code: "https://github.com/jnuaff/mate-tee-guide",
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
						I'm a self-taught frontend developer currently doing an apprenticeship at <a href="https://3pc.de/">3pc</a>. I'm focused on
						creating clean and semantic web applications following accessibility standards. I care about writing reusable, maintainable, and high-quality code, learning from my teammates and keep up to date with the new technologies.
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
