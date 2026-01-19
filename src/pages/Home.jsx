import {Link} from 'react-router-dom'
import Navbar from '../components/Navbar'
import {projects} from '../config'
import './Home.css'
import {ProjectCard} from "../components/ProjectCard";

const skills = [
    'python',
    'jupyter',
    'matplotlib',
    'scikit-learn',
    'xgboost',
    'sql',
    'numpy',
    'pandas',
    'seaborn',
    'azure',
    'aws',
    'github',
    'jetbrains',
    'economics',
]

function Home() {

    return (
        <>
            <Navbar/>
            <main className="main-content">
                <div className="home">
                    <section className="hero">
                        <h1>Hugh Kirkpatrick</h1>
                        <p className="strapline">
                            Sports data scientist and aspiring web developer passionate about turning data into insights and
                            building elegant digital experiences.
                        </p>
                        <div className="hero-description">
                            <p>
                                My work focuses on football data, where I explore the intersection of [REWORD:
                                data science and tactical analysis]. I'm particularly interested in how advanced
                                metrics can provide deeper insights into player and team performance.</p>
                            <p>
                                My personal work (on GitHub) led to an internship at the Football Association in 2025, where I
                                gained invaluable experience working with grass-roots football data, using cutting-edge
                                AI/ML cloud infrastructure.
                            </p>
                        </div>
                    </section>

                    <section id="projects" className="projects-section">
                        <h2 className="section-title">Projects & Articles</h2>
                        <ul className="projects-list">
                            {projects.map((project, index) => {
                                const isGithub = project.type === 'github'

                                return (
                                    <li key={index} className="project-item">
                                        {isGithub ? (
                                            <Link
                                                to={`/github/${project.repo}`}
                                                className={`project-link project-type-${project.category}`}
                                            >
                                                <ProjectCard
                                                    title={project.title}
                                                    description={project.description}
                                                    category={project.category}
                                                />
                                            </Link>
                                        ) : (
                                            <a
                                                href={project.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`project-link project-type-${project.category}`}
                                            >
                                                <ProjectCard
                                                    title={project.title}
                                                    description={project.description}
                                                    category={project.category}
                                                />
                                            </a>
                                        )}
                                    </li>
                                )
                            })}
                        </ul>
                    </section>

                    <section className="skills">
                        <div className="skills-track">
                            {skills.map((skill, index) => (
                                <div key={`skill-1-${index}`}>{skill}</div>
                            ))}
                            {skills.map((skill, index) => (
                                <div key={`skill-2-${index}`}>{skill}</div>
                            ))}
                        </div>
                    </section>

                    <section className="affiliations">
                        <div className="affiliation">
                            <img src="https://www.lancaster.ac.uk/media/wdp/style-assets/images/foundation/lu-shield.svg" className="lancaster logo" alt="Lancaster University Logo"/>
                            Lancaster University
                        </div>
                        <div className="affiliation">
                            <img src="/burnley-fc-logo.svg" className="burnley logo" alt="Burnley FC Logo"/>
                            Burnley Supporter
                        </div>
                    </section>

                    <section className="testimonial-section">
                        <blockquote className="hero-quote">
                            <p>
                                "Hugh is a hard working individual who requires minimal supervision.
                                The work that he produced at The Football Association was insightful
                                and used in later stages of our project post his internship.
                                A professional individual who works well with other team members
                                in getting the job done."
                            </p>
                            <cite>— Ed Gething, Data Architect at The Football Association</cite>
                        </blockquote>
                    </section>
                </div>
            </main>
        </>
    )
}

export default Home
