
import React, { useState, useEffect, useRef } from 'react';
import { 
    CodeIcon, BrainIcon, WrenchIcon, UsersIcon, MailIcon, PhoneIcon, LinkedInIcon, GithubIcon, ExternalLinkIcon, BriefcaseIcon, BookOpenIcon, MessageSquareIcon, ArrowRightIcon,
    PythonIcon, DatabaseIcon, GitIcon, DockerIcon, AWSIcon, LightbulbIcon, UsersGroupIcon, ChartBarIcon, TensorFlowIcon, PyTorchIcon, SparkIcon, CertificateIcon, ExcelIcon, XIcon, FileTextIcon,
    MenuIcon
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
    languages: ["Python", "SQL", "Java"],
    backend: ["Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn"],
    tools: ["Jupyter Notebook", "Git", "VS Code", "PowerBI", "Tableau", "Excel"],
    softSkills: ["Problem-Solving", "Team Player", "Communication", "Storytelling", "Adaptability"]
};

const skillIcons: { [key: string]: React.ReactNode } = {
    // Languages
    Python: <PythonIcon className="w-4 h-4 text-blue-500" />,
    SQL: <DatabaseIcon className="w-4 h-4 text-indigo-500" />,
    Java: <CodeIcon className="w-4 h-4 text-red-500" />,
    // Data Science & ML
    Pandas: <ChartBarIcon className="w-4 h-4 text-indigo-800" />,
    NumPy: <DatabaseIcon className="w-4 h-4 text-blue-400" />,
    'Scikit-learn': <BriefcaseIcon className="w-4 h-4 text-orange-400" />,
    Matplotlib: <ChartBarIcon className="w-4 h-4 text-green-500" />,
    Seaborn: <ChartBarIcon className="w-4 h-4 text-blue-500" />,
    // Tools & Platforms
    'Jupyter Notebook': <BookOpenIcon className="w-4 h-4 text-orange-600" />,
    Git: <GitIcon className="w-4 h-4 text-red-500" />,
    'VS Code': <CodeIcon className="w-4 h-4 text-blue-500" />,
    PowerBI: <ChartBarIcon className="w-4 h-4 text-yellow-600" />,
    Tableau: <ChartBarIcon className="w-4 h-4 text-blue-600" />,
    Excel: <ExcelIcon className="w-4 h-4 text-green-700" />,
    // Soft Skills
    'Problem-Solving': <LightbulbIcon className="w-4 h-4 text-yellow-500" />,
    'Team Player': <UsersGroupIcon className="w-4 h-4 text-green-500" />,
    Communication: <MessageSquareIcon className="w-4 h-4 text-sky-500" />,
    Storytelling: <BookOpenIcon className="w-4 h-4 text-purple-500" />,
    Adaptability: <WrenchIcon className="w-4 h-4 text-gray-500" />,
};

const projects: ProjectType[] = [
    {
        date: "DEC 2025",
        title: "Bike Rental Demand Forecasting",
        description: [
            "Built a reliable model to predict hourly and daily bike rental demand using historical data.",
            "Achieved strong prediction accuracy with ensemble models, enabling better fleet planning."
        ],
        detailedDescription: "Bike rental services faced difficulty in planning fleet distribution due to fluctuating demand influenced by time, weather, and seasonal factors. I cleaned and engineered features, analyzed operational factors, and trained multiple machine learning models, including ensemble methods, to achieve high accuracy.",
        tags: ['Machine Learning', 'Python'],
        technologies: ['Scikit-learn', 'Pandas', 'Matplotlib', 'Seaborn'],
        liveDemoUrl: '#',
        codeUrl: 'https://github.com/srujanredy01',
        challenges: [
            "Fluctuating demand influenced by unpredictable weather and seasonal factors.",
            "Engineering features that capture the temporal nature of bike rentals.",
            "Selecting and tuning ensemble models for optimal performance."
        ],
        solutions: [
            { description: "Performed extensive EDA to understand the impact of weather and holidays on rental patterns." },
            { description: "Implemented feature engineering to capture peak hours and seasonal trends." },
            { description: "Utilized ensemble methods like Random Forest and Gradient Boosting to improve prediction stability." }
        ]
    },
    {
        date: "NOV 2025",
        title: "Studio Developed for Students",
        description: [
            "Built a unified system for easy access to semester-wise subjects and practice resources.",
            "Developed an intuitive platform for viewing and downloading PDFs, PPTs, and Docs."
        ],
        detailedDescription: "Students needed a single, organized platform to access study materials and coding practice instead of using multiple scattered sources. I developed an intuitive platform with subject-wise organization and admin upload functionality to improve accessibility and learning efficiency.",
        tags: ['Web Development', 'Firebase'],
        technologies: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
        liveDemoUrl: '#',
        codeUrl: 'https://github.com/srujanredy01',
        challenges: [
            "Organizing a large volume of scattered academic resources into a coherent structure.",
            "Implementing a secure and efficient admin upload functionality.",
            "Ensuring a smooth user experience for navigating complex semester-wise content."
        ],
        solutions: [
            { description: "Leveraged Firebase for real-time data management and secure file storage." },
            { description: "Designed a hierarchical navigation system based on semesters and subjects." },
            { description: "Implemented a responsive UI to ensure accessibility across different devices." }
        ]
    },
    {
        date: "JUL 2025",
        title: "AI-Based Subjective Exam Evaluation",
        description: [
            "Developed an automated answer evaluation system using the Gemini API.",
            "Reduced evaluation effort and delivered consistent scoring with clear feedback."
        ],
        detailedDescription: "This project involved building an automated system to support teachers in evaluating subjective answers. Using the Gemini API, the system analyzes, compares, and evaluates student responses against sample answers, generating scores and meaningful improvement feedback.",
        tags: ['AI', 'NLP', 'Python'],
        technologies: ['Gemini API', 'Python', 'Flask'],
        liveDemoUrl: '#',
        codeUrl: 'https://github.com/srujanredy01',
        challenges: [
            "Ensuring fair and consistent scoring for subjective, open-ended answers.",
            "Integrating the Gemini API for complex text analysis and comparison.",
            "Providing actionable and constructive feedback to students automatically."
        ],
        solutions: [
            { description: "Prompt engineered the Gemini model to follow specific grading rubrics and provide structured feedback." },
            { description: "Built a Flask-based backend to handle document uploads and API interactions efficiently." },
            { description: "Implemented a review system for teachers to adjust AI-generated results when necessary." }
        ]
    },
    {
        date: "APR 2024",
        title: "Disk Scheduling Simulator",
        description: [
            "Developed a GUI-based simulator for FCFS, SSTF, SCAN, and C-SCAN algorithms.",
            "Created real-time visualizations for head movement and seek time."
        ],
        detailedDescription: "Disk scheduling algorithms are often difficult to understand through theory alone. This simulator visually explains different algorithms and their execution behavior, making complex OS concepts easier to understand through interactive charts and real-time flow visualizations.",
        tags: ['Python', 'Algorithms'],
        technologies: ['Python', 'Tkinter', 'Matplotlib'],
        liveDemoUrl: '#',
        codeUrl: 'https://github.com/srujanredy01',
        challenges: [
            "Translating abstract scheduling logic into accurate visual representations.",
            "Handling real-time updates to charts as the simulation progresses.",
            "Ensuring the GUI remains responsive during intensive calculations."
        ],
        solutions: [
            { description: "Used Matplotlib's animation capabilities to show head movement dynamically." },
            { description: "Implemented a modular architecture to easily switch between different scheduling algorithms." },
            { description: "Optimized the simulation logic to provide immediate feedback on seek time and execution flow." }
        ]
    }
];

const allTags = ['All', ...new Set(projects.flatMap(p => p.tags))];

const education = [
    { period: "AUG 2023 - PRESENT", degree: "CGPA: 6.76", institution: "Lovely Professional University", field: "Bachelor of Technology (Hons.) - Data Science & Data Engineering", location: "PUNJAB, INDIA" },
    { period: "JUN 2021 - APR 2023", degree: "PERCENTAGE: 71%", institution: "Narayana Junior College", field: "Intermediate", location: "HYDERABAD, TELANGANA" },
    { period: "JUN 2020 - APR 2021", degree: "PERCENTAGE: 99%", institution: "Narayana School", field: "Matriculation", location: "HYDERABAD, TELANGANA" }
];

const qualifications = [
    { name: "The Bits and Bytes of Computer Networking", date: "AUG 2025", verifyUrl: '#' },
    { name: "Python for Data Science, AI & Development", date: "NOV 2025", verifyUrl: '#' },
    { name: "Operating Systems and You: Becoming a Power User", date: "SEP 2024", verifyUrl: '#' },
];

const achievements = [
    { title: "Volunteered with Dhruvansh NGO", description: "Participated in lake conservation and cleanliness drives.", date: "JUL 2024" }
];

const resumeHighlights = [
    "Advanced Predictive Modeling & Machine Learning",
    "Full-stack Data Science Pipeline Development",
    "Cloud-native AI Solutions (AWS/GCP)",
    "Statistical Analysis & Data Visualization",
    "Big Data Processing with Spark & Kafka"
];

const contactDetails = [
    { icon: <MailIcon />, title: "EMAIL", value: "kindiekrisrujankumarreddy@gmail.com", href: "mailto:kindiekrisrujankumarreddy@gmail.com" },
    { icon: <PhoneIcon />, title: "PHONE", value: "+91-9640404455", href: "tel:+919640404455" },
    { icon: <LinkedInIcon />, title: "LINKEDIN", value: "View Professional Profile", href: "https://in.linkedin.com/in/kindiekri-srujanb" },
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
                <ul className="space-y-2 list-disc list-inside text-sm md:text-base text-gray-600 flex-grow leading-relaxed transition-opacity duration-300 md:group-hover:opacity-0">
                    {description.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
                <div className="hidden md:flex absolute inset-0 flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
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
    const navLinks = ["About", "Skills", "Projects", "Experience", "Resume", "Contact"];
    const [activeSection, setActiveSection] = useState('about');
    const [activeTag, setActiveTag] = useState('All');
    const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);

    const filteredProjects = activeTag === 'All'
        ? projects
        : projects.filter(p => p.tags.includes(activeTag));

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, sectionId: string) => {
        e.preventDefault();
        setIsMenuOpen(false);
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
                <nav className="w-full md:w-auto bg-white/80 backdrop-blur-lg md:rounded-full shadow-lg shadow-gray-500/5 border-b md:border border-white/50 px-4 py-3 md:py-2">
                    <div className="flex items-center justify-between md:justify-center gap-4">
                        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMenuOpen(false); }} className="font-bold text-xl md:text-lg text-gray-900 flex items-center gap-2">
                            KS<span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        </a>

                        {/* Mobile Menu Toggle */}
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                        </button>

                        {/* Desktop Navigation */}
                        <ul className="hidden md:flex items-center gap-1">
                            <li className="w-px h-6 bg-gray-200 mx-2"></li>
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
                                                px-4 py-2
                                                text-sm font-semibold
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
                    </div>

                    {/* Mobile Navigation Overlay */}
                    <div className={`
                        md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-xl transition-all duration-300 ease-in-out overflow-hidden
                        ${isMenuOpen ? 'max-h-[400px] opacity-100 py-6' : 'max-h-0 opacity-0 py-0'}
                    `}>
                        <ul className="flex flex-col items-center gap-4">
                            {navLinks.map(link => {
                                const sectionId = link.toLowerCase();
                                const isActive = activeSection === sectionId;
                                return (
                                    <li key={link} className="w-full px-8">
                                        <a
                                            href={`#${sectionId}`}
                                            onClick={(e) => handleNavClick(e, sectionId)}
                                            className={`
                                                block w-full text-center py-3 text-lg font-bold rounded-2xl transition-all
                                                ${isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}
                                            `}
                                        >
                                            {link}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto px-4 pt-24 md:pt-32 pb-16 relative z-10">
                <section id="about" className="text-center pt-8 sm:pt-16 pb-16 sm:pb-24">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tighter leading-[1.1]">
                        Kindikeri Srujan <span className="text-indigo-400 block sm:inline">Kumar Reddy</span>
                    </h1>
                    <p className="mt-6 text-sm sm:text-base font-semibold text-indigo-500 uppercase tracking-widest">Data Scientist</p>
                    <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
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
                             <div className="mt-8">
                                 <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-8">Achievements</h2>
                                 <div className="space-y-4">
                                     {achievements.map(a => (
                                         <div key={a.title} className="p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all">
                                             <div className="flex justify-between items-start">
                                                 <h4 className="font-bold">{a.title}</h4>
                                                 <span className="text-xs text-indigo-500 font-semibold uppercase tracking-wider">{a.date}</span>
                                             </div>
                                             <p className="text-sm text-gray-600 mt-2">{a.description}</p>
                                         </div>
                                     ))}
                                 </div>
                             </div>
                        </div>
                    </div>
                </section>

                <section id="resume" className="py-12 sm:py-20 lg:py-32">
                    <div className="bg-white/50 backdrop-blur-sm rounded-3xl md:rounded-[2.5rem] p-6 sm:p-12 md:p-16 border border-gray-200/80 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/50 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                        <div className="relative z-10 flex flex-col lg:flex-row items-stretch justify-between gap-12">
                            <div className="lg:max-w-xl text-center lg:text-left flex flex-col justify-center">
                                <p className="text-sm font-semibold text-indigo-500 uppercase tracking-widest mb-4">Curriculum Vitae</p>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Professional Resume</h2>
                                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                    A comprehensive overview of my technical expertise, academic background, and professional achievements in the field of Data Science and Engineering.
                                </p>
                                <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
                                    <a 
                                        href="https://drive.google.com/file/d/1nKMPMjc-ed7IqBqzAEQxbbJh1li6zXzc/view?usp=sharing" 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-grow sm:flex-grow-0 inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-700 transition-all duration-300 shadow-lg transform hover:-translate-y-1"
                                    >
                                        <ExternalLinkIcon className="w-5 h-5" />
                                        <span>View Online</span>
                                    </a>
                                    <a 
                                        href="#" 
                                        className="flex-grow sm:flex-grow-0 inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 border border-gray-200 font-bold rounded-full hover:bg-gray-50 transition-all duration-300 shadow-md transform hover:-translate-y-1"
                                    >
                                        <FileTextIcon className="w-5 h-5 text-indigo-500" />
                                        <span>Download PDF</span>
                                    </a>
                                    <a 
                                        href="https://www.linkedin.com/in/kindiekri-srujan/" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex-grow sm:flex-grow-0 inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 border border-gray-200 font-bold rounded-full hover:bg-gray-50 transition-all duration-300 shadow-md transform hover:-translate-y-1"
                                    >
                                        <LinkedInIcon className="w-5 h-5 text-blue-600" />
                                        <span>LinkedIn</span>
                                    </a>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/3 min-w-[300px]">
                                <div className="h-full bg-white p-6 sm:p-8 rounded-3xl shadow-inner border border-gray-100 space-y-6">
                                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                        <BriefcaseIcon className="w-6 h-6 text-indigo-500" />
                                        Core Highlights
                                    </h3>
                                    <ul className="space-y-4">
                                        {resumeHighlights.map((highlight, i) => (
                                            <li key={i} className="flex items-start gap-3 text-gray-600">
                                                <div className="mt-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full flex-shrink-0"></div>
                                                <span className="text-sm md:text-base font-medium">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
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
                                <p className="font-semibold mt-1 break-all">{c.value}</p>
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
