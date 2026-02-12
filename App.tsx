
import React, { useState, useEffect, useRef } from 'react';
import { 
    CodeIcon, BrainIcon, WrenchIcon, UsersIcon, MailIcon, PhoneIcon, LinkedInIcon, GithubIcon, ExternalLinkIcon, BriefcaseIcon, BookOpenIcon, MessageSquareIcon, ArrowRightIcon,
    PythonIcon, DatabaseIcon, GitIcon, DockerIcon, AWSIcon, LightbulbIcon, UsersGroupIcon, ChartBarIcon, TensorFlowIcon, PyTorchIcon, SparkIcon, CertificateIcon, ExcelIcon
} from './components/Icons';

// --- DATA CONSTANTS ---

const skills = {
    languages: ["Python", "R", "SQL", "Java"],
    backend: ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "Spark"],
    tools: ["Jupyter", "Git", "Docker", "AWS", "Tableau","Excel"],
    softSkills: ["Problem-Solving", "Leadership", "Communication", "Project Management", "Adaptability"]
};

const skillIcons: { [key: string]: React.ReactNode } = {
    // Languages
    Python: <PythonIcon className="w-4 h-4 text-blue-500" />,
    R: <ChartBarIcon className="w-4 h-4 text-blue-700" />,
    SQL: <DatabaseIcon className="w-4 h-4 text-indigo-500" />,
    Java: <CodeIcon className="w-4 h-4 text-red-500" />,
    // Data Science & ML
    TensorFlow: <TensorFlowIcon className="w-4 h-4 text-orange-500" />,
    PyTorch: <PyTorchIcon className="w-4 h-4 text-red-600" />,
    'Scikit-learn': <BriefcaseIcon className="w-4 h-4 text-orange-400" />,
    Pandas: <ChartBarIcon className="w-4 h-4 text-indigo-800" />,
    Spark: <SparkIcon className="w-4 h-4 text-orange-500" />,
    // Tools & Platforms
    Jupyter: <BookOpenIcon className="w-4 h-4 text-orange-600" />,
    Git: <GitIcon className="w-4 h-4 text-red-500" />,
    Docker: <DockerIcon className="w-4 h-4 text-blue-500" />,
    AWS: <AWSIcon className="w-4 h-4 text-yellow-500" />,
    Tableau: <ChartBarIcon className="w-4 h-4 text-blue-600" />,
    Excel: <ExcelIcon className="w-4 h-4 text-green-700" />,
    // Soft Skills
    'Problem-Solving': <LightbulbIcon className="w-4 h-4 text-yellow-500" />,
    Leadership: <UsersGroupIcon className="w-4 h-4 text-green-500" />,
    Communication: <MessageSquareIcon className="w-4 h-4 text-sky-500" />,
    'Project Management': <BriefcaseIcon className="w-4 h-4 text-purple-500" />,
    Adaptability: <WrenchIcon className="w-4 h-4 text-gray-500" />,
};

const projects = [
    {
        date: "JAN 2024",
        title: "Customer Churn Prediction",
        description: [
            "Built a machine learning model to predict customer churn with 95% accuracy, enabling proactive retention strategies.",
            "Utilized logistic regression and random forests, performing extensive feature engineering and hyperparameter tuning."
        ],
        tags: ['Machine Learning', 'Python'],
        technologies: ['Scikit-learn', 'Pandas', 'Seaborn'],
        liveDemoUrl: '#',
        codeUrl: '#',
    },
    {
        date: "NOV 2023",
        title: "Sentiment Analysis on Social Media",
        description: [
            "Developed an NLP model to analyze and classify sentiment from real-time social media data streams.",
            "Implemented using LSTM networks to capture contextual nuances in text, providing valuable market insights."
        ],
        tags: ['NLP', 'Deep Learning'],
        technologies: ['TensorFlow', 'Keras', 'NLTK', 'Pandas'],
        liveDemoUrl: '#',
        codeUrl: '#',
    },
    {
        date: "AUG 2023",
        title: "Real-Time Anomaly Detection",
        description: [
            "Engineered a system for detecting anomalies in financial transactions to prevent fraud.",
            "Leveraged unsupervised learning algorithms like Isolation Forest and autoencoders for high-precision detection."
        ],
        tags: ['Unsupervised Learning', 'FinTech'],
        technologies: ['PyTorch', 'Scikit-learn', 'Kafka'],
        liveDemoUrl: '#',
        codeUrl: '#',
    }
];

const allTags = ['All', ...new Set(projects.flatMap(p => p.tags))];

const education = [
    {
        period: "SINCE AUG 2023",
        degree: "CGPA: 6.89",
        institution: "Lovely Professional University",
        field: "Bachelor of Technology - Computer Science and Engineering",
        location: "PUNJAB, INDIA"
    },
    {
        period: "APR 2021 - MAR 2023",
        degree: "PERCENTAGE: 74%",
        institution: "Narayana Junior College",
        field: "Intermediate - MPC",
        location: "HYDERABAD, TELANGANA"
    },
    {
        period: "JUN 2020 - MAR 2021",
        degree: "PERCENTAGE: 85%",
        institution: "Narayana E-Techno School",
        field: "Secondary School (SSC)",
        location: "HYDERABAD, TELANGANA"
    }
];

const qualifications = [
    { name: "Google Data Analytics Professional Certificate", date: "NOV 2024", verifyUrl: '#' },
    { name: "IBM Data Science Professional Certificate", date: "JUL 2024", verifyUrl: '#' },
    { name: "TensorFlow Developer Certificate", date: "JAN 2024", verifyUrl: '#' },
];

const contactDetails = [
    { icon: <MailIcon />, title: "EMAIL", value: "kindiekrisr@gmail.com", href: "mailto:kindiekrisr@gmail.com" },
    { icon: <PhoneIcon />, title: "PHONE", value: "+91-9640404455", href: "tel:+919640404455" },
    { icon: <LinkedInIcon />, title: "LINKEDIN", value: "View Professional Profile", href: "https://www.linkedin.com/in/kindiekri-srujan/" },
    { icon: <GithubIcon />, title: "GITHUB", value: "Explore the Codebase", href: "https://github.com/srujanredy01" }
];


// --- REUSABLE COMPONENTS (defined outside App to prevent re-creation) ---

interface SkillCardProps {
    icon: React.ReactNode;
    title: string;
    skills: string[];
}
const SkillCard: React.FC<SkillCardProps> = ({ icon, title, skills }) => (
    <div className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-200/80 shadow-lg shadow-gray-500/5 hover:shadow-xl hover:shadow-gray-500/10 transition-shadow duration-300">
        <div className="flex items-center justify-center w-14 h-14 bg-indigo-100 rounded-2xl mb-6">
            {icon}
        </div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">{title}</h3>
        <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
                <span key={skill} className="bg-gray-100 text-gray-700 text-sm font-medium pl-2 pr-3 py-1 rounded-full flex items-center gap-1.5">
                    {skillIcons[skill] || <CodeIcon className="w-4 h-4 text-gray-500" />}
                    {skill}
                </span>
            ))}
        </div>
    </div>
);

interface ProjectCardProps {
    date: string;
    title: string;
    description: string[];
    index: number;
    tags: string[];
    technologies: string[];
    liveDemoUrl: string;
    codeUrl: string;
}
const ProjectCard: React.FC<ProjectCardProps> = ({ date, title, description, index, tags, technologies, liveDemoUrl, codeUrl }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
            }
        );

        const currentRef = cardRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className={`bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-200/80 shadow-lg shadow-gray-500/5 hover:shadow-2xl hover:scale-[1.02] flex flex-col transition-all duration-300 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center justify-center w-14 h-14 bg-indigo-100 rounded-2xl">
                    <CodeIcon className="text-indigo-500 w-7 h-7" />
                </div>
            </div>
            <p className="text-indigo-500 font-semibold text-xs tracking-widest uppercase mb-2">{date}</p>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
            <ul className="space-y-2 list-disc list-inside text-gray-600 mb-4">
                {description.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
             <div className="flex flex-wrap gap-2 mb-4">
                {tags.map(tag => (
                    <span key={tag} className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
                        {tag}
                    </span>
                ))}
            </div>
            <p className="text-sm text-gray-600 mb-6 flex-grow">
                <span className="font-semibold">Skills Used:</span> {technologies.join(', ')}
            </p>
            <div className="mt-auto pt-4 border-t border-gray-200 flex justify-between items-center text-sm font-semibold">
                 <a href={liveDemoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-indigo-500 transition-all duration-200 hover:-translate-y-px">
                    <ExternalLinkIcon className="w-5 h-5" />
                    <span>Live Demo</span>
                </a>
                <a href={codeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-indigo-500 transition-all duration-200 hover:-translate-y-px">
                    <GithubIcon className="w-5 h-5" />
                    <span>View Code</span>
                </a>
            </div>
        </div>
    );
};

interface EducationItemProps {
    period: string;
    degree: string;
    institution: string;
    field: string;
    location: string;
}
const EducationItem: React.FC<EducationItemProps> = ({ period, degree, institution, field, location }) => (
    <div className="relative pl-8 py-4 group">
        <div className="absolute left-0 top-6 w-px h-full bg-gray-200"></div>
        <div className="absolute left-[-5px] top-6 w-3 h-3 bg-white border-2 border-gray-300 rounded-full group-hover:border-indigo-500 transition-colors"></div>
        <div className="flex items-baseline space-x-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{period}</p>
            <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">{degree}</span>
        </div>
        <h4 className="font-bold text-lg mt-1">{institution}</h4>
        <p className="text-gray-600">{field}</p>
        <p className="text-sm text-gray-400 mt-1">{location}</p>
    </div>
);


const App: React.FC = () => {
    const navLinks = ["About", "Skills", "Projects", "Experience", "Contact"];
    const [activeSection, setActiveSection] = useState('about');
    const [activeTag, setActiveTag] = useState('All');

    const filteredProjects = activeTag === 'All'
        ? projects
        : projects.filter(p => p.tags.includes(activeTag));

    useEffect(() => {
        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, {
            rootMargin: '-100px 0px -50% 0px',
        });

        const sections = document.querySelectorAll('main > section');
        sections.forEach(section => observer.observe(section));

        return () => sections.forEach(section => observer.unobserve(section));
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            const headerOffset = 100; // Fixed header height + spacing
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerOffset;
      
            window.scrollTo({
             top: offsetPosition,
             behavior: "smooth"
            });
        }
    };
    
    const isExternalLink = (href: string) => href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 antialiased relative">
            {/* Background Gradients */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

            <header className="fixed top-0 inset-x-0 md:top-4 md:left-1/2 md:-translate-x-1/2 md:w-auto z-50">
                <nav className="w-full md:w-auto bg-white/60 backdrop-blur-lg md:rounded-full shadow-lg shadow-gray-500/5 border-b md:border border-white/50 px-4 py-2">
                    <ul className="flex items-center justify-center md:gap-1">
                        <li className="hidden md:block"><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="font-bold text-lg px-4 py-2 text-gray-900 flex items-center gap-2">KS<span className="w-2 h-2 bg-indigo-500 rounded-full"></span></a></li>
                        <li className="hidden md:block w-px h-6 bg-gray-200 mx-2"></li>
                        {navLinks.map(link => {
                            const sectionId = link.toLowerCase();
                            return (
                                <li key={link}>
                                    <a
                                        href={`#${sectionId}`}
                                        onClick={(e) => handleNavClick(e, sectionId)}
                                        className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-colors ${
                                            activeSection === sectionId
                                                ? 'bg-gray-900 text-white'
                                                : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    >
                                        {link}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </header>

            <main className="container mx-auto px-4 pt-28 md:pt-32 pb-16 relative z-10">
                {/* Hero Section */}
                <section id="about" className="text-center pt-16 pb-24">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-extrabold tracking-tighter">
                        Kindikeri Srujan <span className="text-indigo-200">Kumar Reddy</span>
                    </h1>
                    <p className="mt-4 text-sm font-semibold text-indigo-500 uppercase tracking-widest">Data Scientist</p>
                    <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-gray-600">
                        Engineering robust data ecosystems and architecting intelligent, high-performance data science solutions that drive business value.
                    </p>
                    <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
                        <button className="bg-gray-900 text-white font-semibold px-6 py-3 rounded-full hover:bg-gray-700 transition-all duration-300 shadow-lg transform hover:-translate-y-0.5">
                            View Professional Timeline
                        </button>
                        <a href="https://github.com/srujanredy01" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"><GithubIcon /></a>
                        <a href="mailto:kindiekrisr@gmail.com" className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"><MailIcon /></a>
                    </div>
                </section>

                {/* Skills Section */}
                <section id="skills" className="py-24">
                    <div className="text-center mb-16">
                        <p className="text-sm font-semibold text-indigo-500 uppercase tracking-widest">Capabilities</p>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mt-2">Technological DNA</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <SkillCard icon={<CodeIcon className="w-7 h-7 text-indigo-500"/>} title="Languages" skills={skills.languages} />
                        <SkillCard icon={<BriefcaseIcon className="w-7 h-7 text-indigo-500"/>} title="Data Science & ML" skills={skills.backend} />
                        <SkillCard icon={<WrenchIcon className="w-7 h-7 text-indigo-500"/>} title="Tools & Platforms" skills={skills.tools} />
                        <SkillCard icon={<BrainIcon className="w-7 h-7 text-indigo-500"/>} title="Soft Skills" skills={skills.softSkills} />
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" className="py-24">
                    <div className="text-center mb-16">
                        <p className="text-sm font-semibold text-indigo-500 uppercase tracking-widest">Portfolio</p>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mt-2">Selected Works</h2>
                    </div>
                    
                    <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setActiveTag(tag)}
                                className={`px-4 md:px-5 py-2 text-xs md:text-sm font-semibold rounded-full transition-all duration-300 shadow-sm border ${
                                    activeTag === tag
                                        ? 'bg-gray-900 text-white border-transparent'
                                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((p, index) => <ProjectCard key={p.title} {...p} index={index} />)}
                    </div>

                </section>

                {/* Experience & Qualifications Section */}
                <section id="experience" className="py-24">
                    <div className="grid lg:grid-cols-5 gap-16">
                        <div className="lg:col-span-3">
                            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-8">Academic Narrative</h2>
                            <div className="space-y-4">
                                {education.map(e => <EducationItem key={e.institution} {...e} />)}
                            </div>
                        </div>
                        <div className="lg:col-span-2">
                             <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-8">Qualifications</h2>
                             <div className="space-y-6">
                                {qualifications.map(q => (
                                    <div key={q.name} className="p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-xl transition-all group flex flex-col">
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-bold pr-4">{q.name}</h4>
                                                <CertificateIcon className="w-6 h-6 text-gray-300 group-hover:text-indigo-500 transition-colors flex-shrink-0"/>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">{q.date}</p>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <a href={q.verifyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 shadow-sm border bg-white text-gray-700 border-gray-200 hover:bg-gray-100 transform hover:-translate-y-px">
                                                Verify Certificate
                                                <ExternalLinkIcon className="w-4 h-4"/>
                                            </a>
                                        </div>
                                    </div>
                                ))}
                             </div>
                             <div className="mt-10 p-8 bg-gray-800 text-white rounded-3xl shadow-2xl">
                                <BookOpenIcon className="w-8 h-8 text-indigo-400 mb-4" />
                                <h3 className="font-bold text-lg mb-2">Principal Focus</h3>
                                <p className="text-gray-300">
                                    Specializing in predictive modeling and machine learning algorithms. Focusing on optimizing model performance and scalability in cloud environments.
                                </p>
                             </div>
                        </div>
                    </div>
                </section>
            </main>
            
            <div className="px-4">
                <div className="bg-gray-900 text-white rounded-3xl md:rounded-[2.5rem] p-10 md:p-20 text-center mx-auto max-w-6xl my-16 relative overflow-hidden">
                     <div className="absolute -bottom-10 -right-10 w-40 h-40 border-4 border-indigo-500/30 rounded-full"></div>
                     <div className="absolute -top-10 -left-10 w-40 h-40 border-4 border-indigo-500/30 rounded-full"></div>
                     <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">Technical Vision</h2>
                     <p className="max-w-xl mx-auto mt-4 text-gray-300">
                         Committed to developing robust, ethical AI solutions and scalable systems that unlock data-driven insights.
                     </p>
                     <p className="mt-8 font-semibold tracking-widest text-indigo-400">
                         LET'S INNOVATE TOGETHER
                     </p>
                </div>
            </div>

            <section id="contact" className="py-24">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">Connect</h2>
                    <p className="mt-4 text-base md:text-lg text-gray-600">Direct channels for professional inquiries and architectural discussions.</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
                    {contactDetails.map(c => (
                        <a 
                          href={c.href} 
                          key={c.title} 
                          target={isExternalLink(c.href) ? "_blank" : "_self"}
                          rel={isExternalLink(c.href) ? "noopener noreferrer" : ""}
                          className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-200/80 shadow-lg shadow-gray-500/5 hover:shadow-xl hover:shadow-gray-500/10 transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4 text-indigo-500">
                                {c.icon}
                            </div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">{c.title}</p>
                            <p className="font-semibold mt-1">{c.value}</p>
                        </a>
                    ))}
                </div>
            </section>
            
            <footer className="text-center py-8 text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} KINDIKERI SRUJAN KUMAR REDDY</p>
                <p className="text-xs mt-1">Architected for clarity and performance</p>
            </footer>

        </div>
    );
};

export default App;
