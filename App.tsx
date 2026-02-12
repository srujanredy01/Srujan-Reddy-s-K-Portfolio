
import React, { useState, useEffect, useRef } from 'react';
import { 
    CodeIcon, BrainIcon, WrenchIcon, UsersIcon, MailIcon, PhoneIcon, LinkedInIcon, GithubIcon, ExternalLinkIcon, BriefcaseIcon, BookOpenIcon, MessageSquareIcon, ArrowRightIcon,
    PythonIcon, DatabaseIcon, GitIcon, DockerIcon, AWSIcon, LightbulbIcon, UsersGroupIcon, ChartBarIcon, TensorFlowIcon, PyTorchIcon, SparkIcon, CertificateIcon, ExcelIcon, XIcon
} from './components/Icons';

// --- TYPE DEFINITIONS ---
interface ProjectType {
    date: string;
    title: string;
    description: string[];
    detailedDescription: string;
    tags: string[];
    technologies: string[];
    liveDemoUrl: string;
    codeUrl: string;
    challenges: string[];
    solutions: {
        description: string;
        resource?: {
            label: string;
            url: string;
        }
    }[];
}

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

const projects: ProjectType[] = [
    {
        date: "JAN 2024",
        title: "Customer Churn Prediction",
        description: [
            "Built a machine learning model to predict customer churn with 95% accuracy.",
            "Utilized logistic regression and random forests with extensive feature engineering."
        ],
        detailedDescription: "This project aimed to proactively identify and retain customers at risk of churning. A comprehensive analysis of customer behavior, demographics, and service usage patterns was conducted to build a highly accurate predictive model, which allowed the business to implement targeted retention campaigns.",
        tags: ['Machine Learning', 'Python'],
        technologies: ['Scikit-learn', 'Pandas', 'Seaborn', 'Matplotlib'],
        liveDemoUrl: '#',
        codeUrl: 'https://github.com/srujanredy01',
        challenges: [
            "Handling an imbalanced dataset where churned customers were a small minority.",
            "Engineering meaningful features from raw transactional and temporal data.",
            "Ensuring model interpretability to provide actionable insights to the business."
        ],
        solutions: [
            { description: "Applied SMOTE (Synthetic Minority Over-sampling Technique) to balance the class distribution, which significantly improved model sensitivity and recall for the minority class." },
            { description: "Created time-based features like 'days since last purchase' and 'average purchase frequency' to capture user engagement trends effectively." },
            { description: "Utilized SHAP (SHapley Additive exPlanations) values to explain the output of the model, making the results transparent and actionable for stakeholders." }
        ]
    },
    {
        date: "NOV 2023",
        title: "Sentiment Analysis on Social Media",
        description: [
            "Developed an NLP model to analyze and classify sentiment from real-time social media data.",
            "Implemented using LSTM networks to capture contextual nuances in text."
        ],
        detailedDescription: "This project focused on building a real-time sentiment analysis pipeline for social media mentions related to a specific brand. The model was trained on a large corpus of labeled tweets to understand slang, irony, and context, providing the marketing team with immediate feedback on public perception.",
        tags: ['NLP', 'Deep Learning'],
        technologies: ['TensorFlow', 'Keras', 'NLTK', 'Pandas'],
        liveDemoUrl: '#',
        codeUrl: 'https://github.com/srujanredy01',
        challenges: [
            "Processing high-velocity, unstructured text data in real-time.",
            "Dealing with informal language, slang, and emojis common in social media.",
            "Maintaining model accuracy as language and trends evolve."
        ],
        solutions: [
            { description: "Utilized Apache Kafka for creating a robust data ingestion pipeline capable of handling high throughput from the Twitter API." },
            { description: "Employed pre-trained word embeddings (GloVe) and an LSTM architecture to better capture the semantic context and sequence of text, improving accuracy over traditional methods." },
            { description: "Implemented a CI/CD pipeline for automated model retraining and deployment, ensuring the model stays current with evolving language." }
        ]
    },
    {
        date: "AUG 2023",
        title: "Real-Time Anomaly Detection",
        description: [
            "Engineered a system for detecting anomalies in financial transactions to prevent fraud.",
            "Leveraged unsupervised learning algorithms like Isolation Forest."
        ],
        detailedDescription: "The goal of this project was to develop an unsupervised learning model to detect fraudulent financial transactions in real-time. By analyzing patterns in transaction data, the system flags suspicious activities for manual review, thereby reducing financial losses and protecting customers without labeled fraud data.",
        tags: ['Unsupervised Learning', 'FinTech'],
        technologies: ['PyTorch', 'Scikit-learn', 'Kafka', 'Pandas'],
        liveDemoUrl: '#',
        codeUrl: 'https://github.com/srujanredy01',
        challenges: [
            "The lack of labeled fraudulent data necessitated an unsupervised learning approach.",
            "Minimizing false positives to avoid disrupting legitimate user transactions.",
            "The system needed to be highly performant to process transactions in real-time."
        ],
        solutions: [
            { description: "Implemented an Isolation Forest algorithm, which is highly effective at identifying anomalies by isolating observations with fewer splits in a random forest." },
            { description: "Fine-tuned the model's contamination parameter based on domain knowledge and historical data to achieve an optimal balance between precision and recall." },
            { description: "Deployed the model as a microservice with a REST API, allowing for scalable and low-latency predictions within the existing transaction processing workflow." }
        ]
    }
];

const allTags = ['All', ...new Set(projects.flatMap(p => p.tags))];

const education = [
    { period: "SINCE AUG 2023", degree: "CGPA: 6.89", institution: "Lovely Professional University", field: "Bachelor of Technology - Computer Science and Engineering", location: "PUNJAB, INDIA" },
    { period: "APR 2021 - MAR 2023", degree: "PERCENTAGE: 74%", institution: "Narayana Junior College", field: "Intermediate - MPC", location: "HYDERABAD, TELANGANA" },
    { period: "JUN 2020 - MAR 2021", degree: "PERCENTAGE: 85%", institution: "Narayana E-Techno School", field: "Secondary School (SSC)", location: "HYDERABAD, TELANGANA" }
];

const qualifications = [
    { name: "The Bits and Bytes of Computer Networking", date: "AUG 2025", verifyUrl: 'https://coursera.org/share/93d52094d17320ea876417bd3abaf3c8' },
    { name: "Operating Systems and You: Becoming a Power User", date: "SEP 2024", verifyUrl: 'https://coursera.org/share/aa337da15fecbe19c5e0772cfc9b07cb' },
    { name: "Python for data science ai & development", date: "NOV 2025", verifyUrl: '#' },
];

const contactDetails = [
    { icon: <MailIcon />, title: "EMAIL", value: "kindiekrisr@gmail.com", href: "mailto:kindiekrisr@gmail.com" },
    { icon: <PhoneIcon />, title: "PHONE", value: "+91-9640404455", href: "tel:+919640404455" },
    { icon: <LinkedInIcon />, title: "LINKEDIN", value: "View Professional Profile", href: "https://www.linkedin.com/in/kindiekri-srujan/" },
    { icon: <GithubIcon />, title: "GITHUB", value: "Explore the Codebase", href: "https://github.com/srujanredy01" }
];


// --- REUSABLE COMPONENTS ---

const SkillCard: React.FC<{ icon: React.ReactNode; title: string; skills: string[]; }> = ({ icon, title, skills }) => (
    <div className="bg-white/50 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-gray-200/80 shadow-lg shadow-gray-500/5 hover:shadow-xl hover:shadow-gray-500/10 transition-shadow duration-300">
        <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-indigo-100 rounded-2xl mb-4 md:mb-6">{icon}</div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">{title}</h3>
        <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
                <span key={skill} className="bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium pl-2 pr-3 py-1 rounded-full flex items-center gap-1.5">
                    {skillIcons[skill] || <CodeIcon className="w-4 h-4 text-gray-500" />}
                    {skill}
                </span>
            ))}
        </div>
    </div>
);

const ProjectCard: React.FC<ProjectType & { index: number; onSelect: () => void; }> = ({ date, title, description, index, tags, onSelect, liveDemoUrl, codeUrl }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        const currentRef = cardRef.current;
        if (currentRef) observer.observe(currentRef);
        return () => { if (currentRef) observer.unobserve(currentRef); };
    }, []);

    return (
        <div
            ref={cardRef}
            onClick={onSelect}
            className={`relative bg-white/50 hover:bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-gray-200/80 shadow-lg shadow-gray-500/5 hover:shadow-2xl hover:scale-[1.02] flex flex-col transition-all duration-300 ease-out cursor-pointer group ${ isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8' }`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-indigo-100 rounded-2xl mb-4"><CodeIcon className="text-indigo-500 w-6 h-6 md:w-7 md:h-7" /></div>
            <p className="text-indigo-500 font-semibold text-xs tracking-widest uppercase mb-2">{date}</p>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{title}</h3>
            
            <div className="relative flex-grow min-h-[100px] mb-4">
                <ul className="space-y-2 list-disc list-inside text-sm md:text-base text-gray-600 flex-grow leading-relaxed transition-opacity duration-300 group-hover:opacity-0">
                    {description.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
                    <a href={liveDemoUrl} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 text-sm text-white bg-gray-900 rounded-full hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg">
                        <ExternalLinkIcon className="w-4 h-4" />
                        <span>Live Demo</span>
                    </a>
                    <a href={codeUrl} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg">
                        <GithubIcon className="w-4 h-4" />
                        <span>View Code</span>
                    </a>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 my-auto">
                {tags.map(tag => <span key={tag} className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">{tag}</span>)}
            </div>
            <div className="mt-auto pt-4 border-t border-gray-200 text-center">
                <span className="text-indigo-600 font-semibold text-sm group-hover:text-indigo-800 transition-colors flex items-center justify-center gap-2">
                    View Details
                    <ArrowRightIcon className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </span>
            </div>
        </div>
    );
};

const ProjectModal: React.FC<{ project: ProjectType | null; onClose: () => void; }> = ({ project, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        
        if (project) {
            document.body.style.overflow = 'hidden';
            setTimeout(() => setIsVisible(true), 10);
        } else {
            setIsVisible(false);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [project, onClose]);
    
    if (!project) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    return (
        <div
            onClick={handleBackdropClick}
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
            aria-modal="true"
            role="dialog"
        >
            <div
                ref={modalRef}
                className={`bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 md:p-12 transition-all duration-300 ease-out ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors z-10" aria-label="Close project details">
                    <XIcon className="w-8 h-8" />
                </button>
                <p className="text-indigo-500 font-semibold text-xs tracking-widest uppercase mb-2">{project.date}</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{project.title}</h2>
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => <span key={tag} className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">{tag}</span>)}
                </div>
                
                <div className="prose max-w-none text-gray-600">
                    <p className="lead text-base sm:text-lg mb-6">{project.detailedDescription}</p>

                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">Challenges</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        {project.challenges.map((challenge, i) => <li key={i}>{challenge}</li>)}
                    </ul>

                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">Solutions</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        {project.solutions.map((solution, i) => (
                           <li key={i}>
                               {solution.description}
                               {solution.resource && (
                                   <a href={solution.resource.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-indigo-600 ml-2">
                                       {solution.resource.label}
                                       <ExternalLinkIcon className="w-4 h-4 ml-1"/>
                                   </a>
                               )}
                           </li>
                        ))}
                    </ul>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                     <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">Technologies Used</h4>
                     <div className="flex flex-wrap gap-2">
                        {project.technologies.map(tech => (
                            <span key={tech} className="bg-gray-100 text-gray-700 text-sm font-medium pl-2 pr-3 py-1 rounded-full flex items-center gap-1.5">
                                {skillIcons[tech] || <CodeIcon className="w-4 h-4 text-gray-500" />}
                                {tech}
                            </span>
                        ))}
                     </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap gap-4 text-sm font-semibold">
                     <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 text-white bg-gray-900 rounded-full hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg">
                        <ExternalLinkIcon className="w-5 h-5" />
                        <span>Live Demo</span>
                    </a>
                    <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg">
                        <GithubIcon className="w-5 h-5" />
                        <span>View Code</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

const EducationItem: React.FC<{ period: string; degree: string; institution: string; field: string; location: string; }> = ({ period, degree, institution, field, location }) => (
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
    const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
    const headerRef = useRef<HTMLElement>(null);

    const filteredProjects = activeTag === 'All'
        ? projects
        : projects.filter(p => p.tags.includes(activeTag));

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, sectionId: string) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            const headerOffset = headerRef.current?.clientHeight || 80;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    };

    useEffect(() => {
        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const headerHeight = headerRef.current?.clientHeight || 80;
        const observer = new IntersectionObserver(handleIntersect, {
            rootMargin: `-${headerHeight}px 0px -${window.innerHeight - headerHeight - 1}px`,
        });

        const sections = document.querySelectorAll('main > section');
        sections.forEach(section => observer.observe(section));

        return () => sections.forEach(section => observer.unobserve(section));
    }, []);
    
    const isExternalLink = (href: string) => href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 antialiased relative overflow-hidden">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

            <header ref={headerRef} className="fixed top-0 inset-x-0 md:top-4 md:left-1/2 md:-translate-x-1/2 md:w-auto z-40">
                <nav className="w-full md:w-auto bg-white/60 backdrop-blur-lg md:rounded-full shadow-lg shadow-gray-500/5 border-b md:border border-white/50 px-2 sm:px-4 py-2">
                    <ul className="flex items-center justify-center gap-0.5 md:gap-1">
                        <li className="hidden md:block"><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="font-bold text-lg px-4 py-2 text-gray-900 flex items-center gap-2">KS<span className="w-2 h-2 bg-indigo-500 rounded-full"></span></a></li>
                        <li className="hidden md:block w-px h-6 bg-gray-200 mx-2"></li>
                        {navLinks.map(link => {
                            const sectionId = link.toLowerCase();
                            const isActive = activeSection === sectionId;
                            return (
                                <li key={link}>
                                     <a
                                        href={`#${sectionId}`}
                                        onClick={(e) => handleNavClick(e, sectionId)}
                                        className={`
                                            relative group
                                            px-3 sm:px-4 py-2
                                            text-xs sm:text-sm font-semibold
                                            rounded-full
                                            transition-colors duration-300
                                            ${
                                                isActive
                                                    ? 'bg-gray-900 text-white'
                                                    : 'text-gray-600 hover:text-gray-900'
                                            }
                                        `}
                                    >
                                        <span className={`inline-block transition-transform duration-300 ${!isActive ? 'group-hover:scale-105 group-hover:-translate-y-0.5' : ''}`}>
                                            {link}
                                        </span>
                                        {!isActive && (
                                            <span className="
                                                absolute bottom-1 left-0 w-full
                                                h-[1px] bg-indigo-500
                                                transform scale-x-0 group-hover:scale-x-100
                                                transition-transform duration-300 ease-out origin-left
                                            "></span>
                                        )}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </header>

            <main className="container mx-auto px-4 pt-24 md:pt-32 pb-16 relative z-10">
                <section id="about" className="text-center pt-12 sm:pt-16 pb-16 sm:pb-24">
                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter">
                        Kindikeri Srujan <span className="text-indigo-400">Kumar Reddy</span>
                    </h1>
                    <p className="mt-4 text-sm font-semibold text-indigo-500 uppercase tracking-widest">Data Scientist</p>
                    <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-gray-600">
                        Engineering robust data ecosystems and architecting intelligent, high-performance data science solutions that drive business value.
                    </p>
                    <div className="mt-10 flex flex-wrap justify-center items-center gap-x-2 gap-y-4">
                        <button
                            onClick={(e) => handleNavClick(e, 'experience')}
                            className="bg-gray-900 text-white font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full hover:bg-gray-700 transition-all duration-300 shadow-lg transform hover:-translate-y-0.5">
                            View Professional Timeline
                        </button>
                        <a href="https://github.com/srujanredy01" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"><GithubIcon /></a>
                        <a href="mailto:kindiekrisr@gmail.com" className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"><MailIcon /></a>
                    </div>
                </section>

                <section id="skills" className="py-12 sm:py-20">
                    <div className="text-center mb-12 sm:mb-16">
                        <p className="text-sm font-semibold text-indigo-500 uppercase tracking-widest">Capabilities</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-2">Technological DNA</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        <SkillCard icon={<CodeIcon className="w-6 h-6 md:w-7 md:h-7 text-indigo-500"/>} title="Languages" skills={skills.languages} />
                        <SkillCard icon={<BriefcaseIcon className="w-6 h-6 md:w-7 md:h-7 text-indigo-500"/>} title="Data Science & ML" skills={skills.backend} />
                        <SkillCard icon={<WrenchIcon className="w-6 h-6 md:w-7 md:h-7 text-indigo-500"/>} title="Tools & Platforms" skills={skills.tools} />
                        <SkillCard icon={<BrainIcon className="w-6 h-6 md:w-7 md:h-7 text-indigo-500"/>} title="Soft Skills" skills={skills.softSkills} />
                    </div>
                </section>

                <section id="projects" className="py-12 sm:py-20">
                    <div className="text-center mb-12 sm:mb-16">
                        <p className="text-sm font-semibold text-indigo-500 uppercase tracking-widest">Portfolio</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-2">Selected Works</h2>
                    </div>
                    
                    <div className="flex justify-start md:justify-center overflow-x-auto whitespace-nowrap gap-2 md:gap-3 mb-12 pb-4 -mx-4 px-4 md:flex-wrap md:whitespace-normal">
                        {allTags.map(tag => (
                            <button key={tag} onClick={() => setActiveTag(tag)} className={`px-4 md:px-5 py-2 text-xs md:text-sm font-semibold rounded-full transition-all duration-300 shadow-sm border ${ activeTag === tag ? 'bg-gray-900 text-white border-transparent' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100' }`}>
                                {tag}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {filteredProjects.map((p, index) => <ProjectCard key={p.title} {...p} index={index} onSelect={() => setSelectedProject(p)} />)}
                    </div>
                </section>

                <section id="experience" className="py-12 sm:py-20">
                    <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
                        <div className="lg:col-span-3">
                            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-8">Academic Narrative</h2>
                            <div className="space-y-4">
                                {education.map(e => <EducationItem key={e.institution} {...e} />)}
                            </div>
                        </div>
                        <div className="lg:col-span-2">
                             <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-8">Qualifications</h2>
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
                                                Verify Certificate <ExternalLinkIcon className="w-4 h-4"/>
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
                
                <div className="px-4 my-16">
                    <div className="bg-gray-900 text-white rounded-3xl md:rounded-[2.5rem] p-8 sm:p-10 md:p-20 text-center mx-auto max-w-6xl relative overflow-hidden">
                         <div className="absolute -bottom-10 -right-10 w-40 h-40 border-4 border-indigo-500/30 rounded-full"></div>
                         <div className="absolute -top-10 -left-10 w-40 h-40 border-4 border-indigo-500/30 rounded-full"></div>
                         <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Technical Vision</h2>
                         <p className="max-w-xl mx-auto mt-4 text-gray-300">
                             Committed to developing robust, ethical AI solutions and scalable systems that unlock data-driven insights.
                         </p>
                         <p className="mt-8 font-semibold tracking-widest text-indigo-400">
                             LET'S INNOVATE TOGETHER
                         </p>
                    </div>
                </div>

                <section id="contact" className="py-12 sm:py-20">
                    <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">Connect</h2>
                        <p className="mt-4 text-base md:text-lg text-gray-600">Direct channels for professional inquiries and architectural discussions.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto px-4">
                        {contactDetails.map(c => (
                            <a 
                              href={c.href} 
                              key={c.title} 
                              target={isExternalLink(c.href) ? "_blank" : "_self"}
                              rel={isExternalLink(c.href) ? "noopener noreferrer" : ""}
                              className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-200/80 shadow-lg shadow-gray-500/5 hover:shadow-xl hover:shadow-gray-500/10 transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4 text-indigo-500">{c.icon}</div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">{c.title}</p>
                                <p className="font-semibold mt-1">{c.value}</p>
                            </a>
                        ))}
                    </div>
                </section>
            </main>
            
            <footer className="text-center py-8 text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} KINDIKERI SRUJAN KUMAR REDDY</p>
                <p className="text-xs mt-1">Architected for clarity and performance</p>
            </footer>

            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </div>
    );
};

export default App;
