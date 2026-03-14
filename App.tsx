
import React, { useState, useEffect, useRef } from 'react';
import { 
    CodeIcon, BrainIcon, WrenchIcon, UsersIcon, MailIcon, PhoneIcon, LinkedInIcon, GithubIcon, ExternalLinkIcon, BriefcaseIcon, BookOpenIcon, MessageSquareIcon, ArrowRightIcon,
    PythonIcon, DatabaseIcon, GitIcon, DockerIcon, AWSIcon, LightbulbIcon, UsersGroupIcon, ChartBarIcon, TensorFlowIcon, PyTorchIcon, SparkIcon, CertificateIcon, ExcelIcon, XIcon, FileTextIcon,
    MenuIcon, ActivityIcon, CheckCircleIcon, HammerIcon, LeetCodeIcon, TrophyIcon, CoffeeIcon, ClockIcon, ZapIcon
} from './components/Icons';

// --- TYPE DEFINITIONS ---
interface ProjectType {
    date: string;
    title: string;
    status: 'Live' | 'Completed' | 'Working';
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

interface SkillDetail {
    name: string;
    description: string;
    year: string;
    details: string;
}

interface AchievementType {
    title: string;
    description: string;
    date: string;
    detailedDescription?: string;
    impact?: string;
    link?: string;
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

const skillDetails: { [key: string]: SkillDetail } = {
    Python: {
        name: "Python",
        year: "1991",
        description: "High-level, general-purpose programming language.",
        details: "Created by Guido van Rossum, Python is known for its readability and versatility. It's the primary language for data science, machine learning, and web development due to its extensive ecosystem of libraries."
    },
    SQL: {
        name: "SQL",
        year: "1974",
        description: "Structured Query Language for managing relational databases.",
        details: "Developed at IBM, SQL is the standard language for interacting with relational database management systems. It's essential for data extraction, manipulation, and analysis."
    },
    Java: {
        name: "Java",
        year: "1995",
        description: "Class-based, object-oriented programming language.",
        details: "Developed by James Gosling at Sun Microsystems, Java is designed to have as few implementation dependencies as possible, following the 'write once, run anywhere' principle."
    },
    Pandas: {
        name: "Pandas",
        year: "2008",
        description: "Data manipulation and analysis library for Python.",
        details: "Created by Wes McKinney, Pandas provides high-performance, easy-to-use data structures like DataFrames, making it indispensable for data cleaning and preparation."
    },
    NumPy: {
        name: "NumPy",
        year: "2006",
        description: "Fundamental package for scientific computing with Python.",
        details: "NumPy provides support for large, multi-dimensional arrays and matrices, along with a collection of mathematical functions to operate on these arrays."
    },
    'Scikit-learn': {
        name: "Scikit-learn",
        year: "2007",
        description: "Machine learning library for Python.",
        details: "Built on NumPy, SciPy, and Matplotlib, Scikit-learn features various classification, regression, and clustering algorithms, and is designed to interoperate with NumPy and Pandas."
    },
    Matplotlib: {
        name: "Matplotlib",
        year: "2003",
        description: "Comprehensive library for creating static, animated, and interactive visualizations in Python.",
        details: "Created by John D. Hunter, it is the foundation for many other visualization libraries and provides a MATLAB-like interface for plotting."
    },
    Seaborn: {
        name: "Seaborn",
        year: "2014",
        description: "Statistical data visualization library based on Matplotlib.",
        details: "Seaborn provides a high-level interface for drawing attractive and informative statistical graphics, integrating closely with Pandas data structures."
    },
    'Jupyter Notebook': {
        name: "Jupyter Notebook",
        year: "2014",
        description: "Web-based interactive computing environment.",
        details: "Part of Project Jupyter, it allows users to create and share documents that contain live code, equations, visualizations, and narrative text."
    },
    Git: {
        name: "Git",
        year: "2005",
        description: "Distributed version control system.",
        details: "Created by Linus Torvalds, Git is used for tracking changes in source code during software development, allowing multiple developers to collaborate efficiently."
    },
    'VS Code': {
        name: "VS Code",
        year: "2015",
        description: "Streamlined code editor with support for development operations.",
        details: "Developed by Microsoft, Visual Studio Code is a highly extensible editor that supports almost every major programming language and has a massive extension marketplace."
    },
    PowerBI: {
        name: "PowerBI",
        year: "2011",
        description: "Business analytics service by Microsoft.",
        details: "It provides interactive visualizations and business intelligence capabilities with an interface simple enough for end users to create their own reports and dashboards."
    },
    Tableau: {
        name: "Tableau",
        year: "2003",
        description: "Visual analytics platform transforming the way we use data to solve problems.",
        details: "Tableau helps people see and understand data through powerful visual analytics, allowing for deep exploration and storytelling."
    },
    Excel: {
        name: "Excel",
        year: "1985",
        description: "Spreadsheet program featuring calculation, graphing tools, and pivot tables.",
        details: "A cornerstone of business data management, Excel is used globally for everything from simple lists to complex financial modeling."
    },
    'Problem-Solving': {
        name: "Problem-Solving",
        year: "N/A",
        description: "The process of finding solutions to difficult or complex issues.",
        details: "A core competency for any data scientist, involving analytical thinking, creativity, and the ability to break down complex problems into manageable parts."
    },
    'Team Player': {
        name: "Team Player",
        year: "N/A",
        description: "A person who plays or works well as a member of a team or group.",
        details: "Collaboration is key in data science projects, which often involve cross-functional teams of engineers, product managers, and stakeholders."
    },
    Communication: {
        name: "Communication",
        year: "N/A",
        description: "The successful conveying or sharing of ideas and feelings.",
        details: "The ability to explain complex technical findings to non-technical audiences is crucial for driving data-informed decision-making."
    },
    Storytelling: {
        name: "Storytelling",
        year: "N/A",
        description: "The activity of telling or writing stories.",
        details: "In data science, this means weaving data and visualizations into a compelling narrative that highlights insights and recommendations."
    },
    Adaptability: {
        name: "Adaptability",
        year: "N/A",
        description: "The quality of being able to adjust to new conditions.",
        details: "The tech landscape changes rapidly; being able to learn new tools and methodologies quickly is a vital skill."
    }
};

const projects: ProjectType[] = [
    {
        date: "DEC 2025",
        title: "Bike Rental Demand Forecasting",
        status: 'Live',
        description: [
            "Built a reliable model to predict hourly and daily bike rental demand using historical data.",
            "Achieved strong prediction accuracy with ensemble models, enabling better fleet planning."
        ],
        detailedDescription: "Bike rental services faced difficulty in planning fleet distribution due to fluctuating demand influenced by time, weather, and seasonal factors. I cleaned and engineered features, analyzed operational factors, and trained multiple machine learning models, including ensemble methods, to achieve high accuracy.",
        tags: ['Machine Learning', 'Python'],
        technologies: ['Scikit-learn', 'Pandas', 'Matplotlib', 'Seaborn'],
        liveDemoUrl: 'https://bike-rental-forecast.streamlit.app/',
        codeUrl: 'https://github.com/srujanredy01/bike-rental-demand-forecasting',
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
        status: 'Working',
        description: [
            "Built a unified system for easy access to semester-wise subjects and practice resources.",
            "Developed an intuitive platform for viewing and downloading PDFs, PPTs, and Docs."
        ],
        detailedDescription: "Students needed a single, organized platform to access study materials and coding practice instead of using multiple scattered sources. I developed an intuitive platform with subject-wise organization and admin upload functionality to improve accessibility and learning efficiency.",
        tags: ['Web Development', 'Firebase'],
        technologies: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
        liveDemoUrl: 'https://student-studio-v1.web.app/',
        codeUrl: 'https://github.com/srujanredy01/student-studio',
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
        status: 'Working',
        description: [
            "Developed an automated answer evaluation system using the Gemini API.",
            "Reduced evaluation effort and delivered consistent scoring with clear feedback."
        ],
        detailedDescription: "This project involved building an automated system to support teachers in evaluating subjective answers. Using the Gemini API, the system analyzes, compares, and evaluates student responses against sample answers, generating scores and meaningful improvement feedback.",
        tags: ['AI', 'NLP', 'Python'],
        technologies: ['Gemini API', 'Python', 'Flask'],
        liveDemoUrl: 'https://ai-exam-evaluator.demo/',
        codeUrl: 'https://github.com/srujanredy01/ai-exam-evaluation',
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
        status: 'Completed',
        description: [
            "Developed a GUI-based simulator for FCFS, SSTF, SCAN, and C-SCAN algorithms.",
            "Created real-time visualizations for head movement and seek time."
        ],
        detailedDescription: "Disk scheduling algorithms are often difficult to understand through theory alone. This simulator visually explains different algorithms and their execution behavior, making complex OS concepts easier to understand through interactive charts and real-time flow visualizations.",
        tags: ['Python', 'Algorithms'],
        technologies: ['Python', 'Tkinter', 'Matplotlib'],
        liveDemoUrl: 'https://srujanredy01.github.io/disk-scheduling-simulator/',
        codeUrl: 'https://github.com/srujanredy01/disk-scheduling-simulator',
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
    { period: "AUG 2023 - PRESENT", degree: "CGPA: 6.90", institution: "Lovely Professional University", field: "Bachelor of Technology (Hons.) - Data Science & Data Engineering", location: "PUNJAB, INDIA" },
    { period: "JUN 2021 - APR 2023", degree: "PERCENTAGE: 71%", institution: "Narayana Junior College", field: "Intermediate", location: "HYDERABAD, TELANGANA" },
    { period: "JUN 2020 - APR 2021", degree: "PERCENTAGE: 99%", institution: "Narayana School", field: "Matriculation", location: "HYDERABAD, TELANGANA" }
];

const qualifications = [
    { name: "The Bits and Bytes of Computer Networking", date: "AUG 2025", verifyUrl: 'https://www.coursera.org/account/accomplishments/verify/GOOGLE-NETWORKING' },
    { name: "Python for Data Science, AI & Development", date: "NOV 2025", verifyUrl: 'https://www.coursera.org/account/accomplishments/verify/IBM-PYTHON' },
    { name: "Operating Systems and You: Becoming a Power User", date: "SEP 2024", verifyUrl: 'https://www.coursera.org/account/accomplishments/verify/GOOGLE-OS' },
];

const achievements: AchievementType[] = [
    { 
        title: "Volunteered with Dhruvansh NGO", 
        description: "Participated in lake conservation and cleanliness drives.", 
        date: "JUL 2024",
        detailedDescription: "Actively participated in environmental conservation efforts focusing on the restoration and maintenance of local lakes in Hyderabad. Collaborated with a team of volunteers to remove waste, plant native flora, and raise awareness about water body preservation in the community.",
        impact: "Helped clear significant amounts of waste from the lake shores, contributing to the restoration of the local ecosystem and educating local residents on sustainable waste disposal practices."
    }
];

const resumeHighlights = [
    "Advanced Predictive Modeling & Machine Learning",
    "Full-stack Data Science Pipeline Development",
    "Cloud-native AI Solutions (AWS/GCP)",
    "Statistical Analysis & Data Visualization",
    "Big Data Processing with Spark & Kafka"
];

const contactDetails = [
    { icon: <MailIcon />, title: "EMAIL", value: "kindikerisr@gmail.com", href: "mailto:kindikerisr@gmail.com" },
    { icon: <PhoneIcon />, title: "PHONE", value: "+91-9640404455", href: "tel:+919640404455" },
    { icon: <LinkedInIcon />, title: "LINKEDIN", value: "View Professional Profile", href: "https://www.linkedin.com/in/kindiekri-srujan/" },
    { icon: <GithubIcon />, title: "GITHUB", value: "Explore the Codebase", href: "https://github.com/srujanredy01" }
];


// --- REUSABLE COMPONENTS ---

const SkillCard: React.FC<{ icon: React.ReactNode; title: string; skills: string[]; onSkillClick: (skill: string) => void; }> = ({ icon, title, skills, onSkillClick }) => (
    <div className="bg-white/50 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-gray-200/80 shadow-lg shadow-gray-500/5 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 transition-all duration-300 group">
        <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-indigo-100 rounded-2xl mb-4 md:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">{icon}</div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">{title}</h3>
        <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
                <button 
                    key={skill} 
                    onClick={() => onSkillClick(skill)}
                    aria-haspopup="dialog"
                    aria-label={`Learn more about ${skill}`}
                    className="bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium pl-2 pr-3 py-1 rounded-full flex items-center gap-1.5 hover:bg-indigo-100 hover:text-indigo-700 transition-colors group/skill"
                >
                    <span aria-hidden="true">
                        {skillIcons[skill] || <CodeIcon className="w-4 h-4 text-gray-500" />}
                    </span>
                    {skill}
                </button>
            ))}
        </div>
    </div>
);

const ProjectCard: React.FC<ProjectType & { index: number; onSelect: () => void; }> = ({ date, title, status, description, index, tags, onSelect, liveDemoUrl, codeUrl }) => {
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

    const statusColors = {
        Live: 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm shadow-emerald-100/50',
        Completed: 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm shadow-blue-100/50',
        Working: 'bg-amber-50 text-amber-700 border-amber-200 shadow-sm shadow-amber-100/50'
    };

    const StatusIcon = ({ status }: { status: ProjectType['status'] }) => {
        switch (status) {
            case 'Live': return (
                <span className="relative flex h-2 w-2 mr-1" aria-hidden="true">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
            );
            case 'Completed': return <CheckCircleIcon className="w-3.5 h-3.5 mr-1 text-blue-500" aria-hidden="true" />;
            case 'Working': return <HammerIcon className="w-3.5 h-3.5 mr-1 text-amber-500 animate-bounce" aria-hidden="true" />;
            default: return null;
        }
    };

    return (
        <div
            ref={cardRef}
            onClick={onSelect}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(); } }}
            tabIndex={0}
            role="button"
            aria-label={`View details for ${title}`}
            className={`relative bg-white/50 hover:bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-gray-200/80 hover:border-indigo-400/30 shadow-lg shadow-gray-500/5 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 flex flex-col transition-all duration-500 ease-out cursor-pointer group focus:outline-none focus:ring-2 focus:ring-indigo-500 ${ isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8' }`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-indigo-100 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500" aria-hidden="true">
                    <CodeIcon className="text-indigo-500 w-6 h-6 md:w-7 md:h-7" />
                </div>
                <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all duration-300 group-hover:shadow-sm ${statusColors[status]}`}>
                    <StatusIcon status={status} />
                    {status}
                </span>
            </div>
            <p className="text-indigo-500 font-semibold text-xs tracking-widest uppercase mb-2">{date}</p>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{title}</h3>
            
            <div className="relative flex-grow min-h-[100px] mb-4">
                <ul className="space-y-2 list-disc list-inside text-sm md:text-base text-gray-600 flex-grow leading-relaxed transition-opacity duration-300 md:group-hover:opacity-0">
                    {description.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
                <div className="hidden md:flex absolute inset-0 flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
                    {liveDemoUrl !== '#' && (
                        <a href={liveDemoUrl} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 text-sm text-white bg-gray-900 rounded-full hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg">
                            <ExternalLinkIcon className="w-4 h-4" aria-hidden="true" />
                            <span>Live Demo</span>
                        </a>
                    )}
                    {codeUrl !== '#' && (
                        <a href={codeUrl} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg">
                            <GithubIcon className="w-4 h-4" aria-hidden="true" />
                            <span>View Code</span>
                        </a>
                    )}
                </div>
            </div>

            <div className="flex flex-wrap gap-2 my-auto">
                {tags.map(tag => <span key={tag} className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">{tag}</span>)}
            </div>
            <div className="mt-auto pt-4 border-t border-gray-200 text-center">
                <span className="text-indigo-600 font-semibold text-sm group-hover:text-indigo-800 transition-colors flex items-center justify-center gap-2">
                    View Details
                    <ArrowRightIcon className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" aria-hidden="true" />
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
                aria-labelledby="modal-title"
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors z-10" aria-label="Close project details">
                    <XIcon className="w-8 h-8" aria-hidden="true" />
                </button>
                <div className="flex items-center gap-4 mb-2">
                    <p className="text-indigo-500 font-semibold text-xs tracking-widest uppercase">{project.date}</p>
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${
                        project.status === 'Live' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-emerald-100/50' :
                        project.status === 'Completed' ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-blue-100/50' :
                        'bg-amber-50 text-amber-700 border-amber-200 shadow-amber-100/50'
                    }`}>
                        {project.status === 'Live' && (
                            <span className="relative flex h-2 w-2" aria-hidden="true">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                        )}
                        {project.status === 'Completed' && <CheckCircleIcon className="w-3.5 h-3.5 text-blue-500" aria-hidden="true" />}
                        {project.status === 'Working' && <HammerIcon className="w-3.5 h-3.5 text-amber-500 animate-bounce" aria-hidden="true" />}
                        {project.status}
                    </span>
                </div>
                <h2 id="modal-title" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{project.title}</h2>
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
                                <span aria-hidden="true">
                                    {skillIcons[tech] || <CodeIcon className="w-4 h-4 text-gray-500" />}
                                </span>
                                {tech}
                            </span>
                        ))}
                     </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap gap-4 text-sm font-semibold">
                     {project.liveDemoUrl !== '#' && (
                         <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 text-white bg-gray-900 rounded-full hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg">
                            <ExternalLinkIcon className="w-5 h-5" />
                            <span>Live Demo</span>
                        </a>
                     )}
                     {project.codeUrl !== '#' && (
                        <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg">
                            <GithubIcon className="w-5 h-5" />
                            <span>View Code</span>
                        </a>
                     )}
                </div>
            </div>
        </div>
    );
};

const SelfMetrics = () => {
    const [metrics, setMetrics] = useState({
        questionsSubmitted: 452,
        coffeeCups: 842,
        hoursLearned: 2150,
        commitsToday: 12,
        streak: 48,
        focusScore: 92,
        codolioRank: "Top 5%",
        codolioPoints: 12500
    });

    const [currentStatus, setCurrentStatus] = useState("Syncing with Codolio...");
    const [isSyncing, setIsSyncing] = useState(false);
    const [logs, setLogs] = useState<string[]>([
        "> system initialized",
        "> connecting to codolio.com",
        "> fetching profile: KSReddy11"
    ]);

    const statuses = [
        "Syncing with Codolio",
        "Analyzing Problem Patterns",
        "Optimizing Performance",
        "Learning New Frameworks",
        "Refactoring Legacy Code",
        "Designing System Architecture",
        "Squashing Bugs"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics(prev => ({
                ...prev,
                questionsSubmitted: prev.questionsSubmitted + (Math.random() > 0.998 ? 1 : 0),
                coffeeCups: prev.coffeeCups + (Math.random() > 0.995 ? 1 : 0),
                commitsToday: prev.commitsToday + (Math.random() > 0.99 ? 1 : 0),
                focusScore: Math.min(100, Math.max(80, prev.focusScore + (Math.random() > 0.5 ? 1 : -1))),
                codolioPoints: prev.codolioPoints + (Math.random() > 0.99 ? 5 : 0)
            }));
        }, 2000);

        const statusInterval = setInterval(() => {
            setCurrentStatus(statuses[Math.floor(Math.random() * statuses.length)]);
            setIsSyncing(true);
            setTimeout(() => setIsSyncing(false), 1500);
        }, 8000);

        const logInterval = setInterval(() => {
            const newLogs = [
                "> codolio: fetch success",
                "> data point: 452 solved",
                "> updating streak: 48 days",
                "> git push origin main",
                "> npm run build:success",
                "> 12 tests passed",
                "> coffee.exe initiated",
                "> refactoring component",
                "> updating dependencies",
                "> merging pull request",
                "> deploying to production"
            ];
            setLogs(prev => {
                const next = [...prev, newLogs[Math.floor(Math.random() * newLogs.length)]];
                return next.slice(-4); // Keep last 4 logs
            });
        }, 5000);

        return () => {
            clearInterval(interval);
            clearInterval(statusInterval);
            clearInterval(logInterval);
        };
    }, []);

    return (
        <div className="bg-white/50 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-lg group hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden">
            {/* Scanning Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite] pointer-events-none" style={{ animationDelay: '2s' }}></div>
            
            {/* Background Decorative Element */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors duration-500"></div>
            
            <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <ActivityIcon className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Live Metrics</h3>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Real-time Productivity</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <div className="flex items-center gap-1.5">
                            <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${isSyncing ? 'text-emerald-500' : 'text-indigo-500'}`}>
                                {currentStatus}
                            </span>
                            {isSyncing && <span className="w-1 h-1 bg-emerald-500 rounded-full animate-ping"></span>}
                        </div>
                    </div>
                </div>
                <div className="ml-auto flex items-center gap-1">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-tighter">Live</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 flex-grow relative z-10">
                <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center justify-center hover:border-indigo-200 transition-all group/metric hover:shadow-md">
                    <CheckCircleIcon className="w-5 h-5 text-indigo-500 mb-2 group-hover/metric:scale-110 transition-transform" />
                    <p className="text-xl font-bold text-gray-900 tabular-nums">{metrics.questionsSubmitted.toLocaleString()}</p>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Solved</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center justify-center hover:border-indigo-200 transition-all group/metric hover:shadow-md">
                    <TrophyIcon className="w-5 h-5 text-amber-500 mb-2 group-hover/metric:scale-110 transition-transform" />
                    <p className="text-xl font-bold text-gray-900 tabular-nums">{metrics.codolioRank}</p>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Codolio Rank</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center justify-center hover:border-indigo-200 transition-all group/metric hover:shadow-md">
                    <ClockIcon className="w-5 h-5 text-emerald-500 mb-2 group-hover/metric:scale-110 transition-transform" />
                    <p className="text-xl font-bold text-gray-900 tabular-nums">{metrics.streak}d</p>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Coding Streak</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center justify-center hover:border-indigo-200 transition-all group/metric hover:shadow-md">
                    <ZapIcon className="w-5 h-5 text-yellow-500 mb-2 group-hover/metric:scale-110 transition-transform" />
                    <p className="text-xl font-bold text-gray-900 tabular-nums">{metrics.focusScore}%</p>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Focus Level</p>
                </div>
            </div>

            <div className="mt-6 space-y-4 relative z-10">
                <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex items-center justify-between group/codolio hover:bg-indigo-50 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover/codolio:scale-110 transition-transform">
                            <ActivityIcon className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                            <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">Codolio Sync</p>
                            <p className="text-sm font-bold text-gray-900">KSReddy11</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="text-right mr-2">
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Points</p>
                            <p className="text-xs font-bold text-indigo-600">{metrics.codolioPoints.toLocaleString()}</p>
                        </div>
                        <a href="https://codolio.com/profile/KSReddy11" target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all text-indigo-500 hover:scale-110" title="View Codolio Profile">
                            <ExternalLinkIcon className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span className="flex items-center gap-1">
                            <ActivityIcon className="w-3 h-3" />
                            Sync Velocity
                        </span>
                        <span className="font-bold text-indigo-600">{metrics.commitsToday} Updates</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                        <div 
                            className={`h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)] ${isSyncing ? 'opacity-100' : 'opacity-80'}`} 
                            style={{ width: `${Math.min((metrics.commitsToday / 20) * 100, 100)}%` }}
                        ></div>
                    </div>

                    {/* Live Activity Log */}
                    <div className="bg-gray-900 rounded-xl p-3 font-mono text-[10px] text-emerald-400/80 shadow-inner overflow-hidden border border-gray-800">
                        <div className="flex items-center gap-2 mb-2 border-b border-gray-800 pb-1">
                            <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500/50"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></div>
                            </div>
                            <span className="text-[8px] text-gray-500 uppercase font-bold tracking-tighter">Codolio Live Feed</span>
                        </div>
                        <div className="space-y-1">
                            {logs.map((log, i) => (
                                <div key={i} className="animate-in fade-in slide-in-from-left-2 duration-500">
                                    {log}
                                </div>
                            ))}
                            <div className="w-2 h-3 bg-emerald-400/40 animate-pulse inline-block ml-1 align-middle"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const EducationItem: React.FC<{ period: string; degree: string; institution: string; field: string; location: string; }> = ({ period, degree, institution, field, location }) => (
    <div className="relative pl-8 py-4 group hover:bg-indigo-50/30 rounded-2xl transition-all duration-300 -ml-4 px-4">
        <div className="absolute left-4 top-6 w-px h-full bg-gray-200"></div>
        <div className="absolute left-[11px] top-6 w-3 h-3 bg-white border-2 border-gray-300 rounded-full group-hover:border-indigo-500 transition-colors"></div>
        <div className="flex items-baseline space-x-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{period}</p>
            <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">{degree}</span>
        </div>
        <h4 className="font-bold text-lg mt-1">{institution}</h4>
        <p className="text-gray-600">{field}</p>
        <p className="text-sm text-gray-400 mt-1">{location}</p>
    </div>
);

const DataLinkBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
        const particleCount = 60;
        const connectionDistance = 150;
        const mouseConnectionDistance = 200;

        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(99, 102, 241, 0.2)';
                ctx.fill();

                // Connect to other particles
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        const opacity = 1 - dist / connectionDistance;
                        ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.15})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }

                // Connect to mouse
                const mdx = p.x - mouseRef.current.x;
                const mdy = p.y - mouseRef.current.y;
                const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

                if (mdist < mouseConnectionDistance) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
                    const opacity = 1 - mdist / mouseConnectionDistance;
                    ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.3})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(99, 102, 241, ${opacity * 0.5})`;
                    ctx.fill();
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleResize = () => {
            init();
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);
        init();
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0 opacity-40"
            style={{ mixBlendMode: 'multiply' }}
        />
    );
};

const GitHubActivity = () => {
    const [stats, setStats] = useState({
        contributions: 1240,
        stars: 12,
        followers: 24,
        lastPush: "5 mins ago"
    });
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                ...prev,
                contributions: prev.contributions + (Math.random() > 0.99 ? 1 : 0),
                lastPush: "Just now"
            }));
            setIsSyncing(true);
            setTimeout(() => setIsSyncing(false), 2000);
        }, 12000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white/50 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-lg group hover:shadow-xl transition-all duration-300 h-full flex flex-col relative overflow-hidden">
            {/* Scanning Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite] pointer-events-none"></div>
            
            {/* Background Decorative Element */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-gray-900/5 rounded-full blur-3xl group-hover:bg-gray-900/10 transition-colors duration-500"></div>

            <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <GithubIcon className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900">GitHub Activity</h3>
                    <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-500">@srujanredy01</p>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${isSyncing ? 'text-emerald-500' : 'text-indigo-500'}`}>
                            {isSyncing ? 'Syncing...' : stats.lastPush}
                        </span>
                    </div>
                </div>
                <div className="ml-auto flex items-center gap-4">
                    <a href="https://github.com/srujanredy01" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:text-indigo-600 transition-colors" title="GitHub Profile">
                        <ExternalLinkIcon className="w-5 h-5" />
                    </a>
                    <div className="flex items-center gap-1">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-tighter">Live</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6 relative z-10">
                <div className="bg-white p-3 rounded-2xl border border-gray-100 text-center hover:border-indigo-200 transition-all hover:shadow-md group/stat">
                    <p className="text-lg font-bold text-gray-900 tabular-nums">{stats.contributions}</p>
                    <p className="text-[8px] text-gray-400 uppercase font-bold tracking-widest">Contribs</p>
                </div>
                <div className="bg-white p-3 rounded-2xl border border-gray-100 text-center hover:border-indigo-200 transition-all hover:shadow-md group/stat">
                    <p className="text-lg font-bold text-gray-900 tabular-nums">{stats.stars}</p>
                    <p className="text-[8px] text-gray-400 uppercase font-bold tracking-widest">Stars</p>
                </div>
                <div className="bg-white p-3 rounded-2xl border border-gray-100 text-center hover:border-indigo-200 transition-all hover:shadow-md group/stat">
                    <p className="text-lg font-bold text-gray-900 tabular-nums">{stats.followers}</p>
                    <p className="text-[8px] text-gray-400 uppercase font-bold tracking-widest">Followers</p>
                </div>
            </div>
            
            <div className="space-y-4 flex-grow relative z-10">
                <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 group/card">
                    <div className="absolute inset-0 bg-indigo-500/0 group-hover/card:bg-indigo-500/5 transition-colors duration-500 pointer-events-none"></div>
                    <img 
                        src="https://github-readme-stats.vercel.app/api?username=srujanredy01&show_icons=true&theme=transparent&hide_border=true&title_color=6366f1&icon_color=6366f1&text_color=4b5563&bg_color=ffffff00" 
                        alt="GitHub Stats" 
                        className="w-full h-auto relative z-10 transition-transform duration-500 group-hover/card:scale-[1.02]"
                        referrerPolicy="no-referrer"
                    />
                </div>
                <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 group/card">
                    <div className="absolute inset-0 bg-indigo-500/0 group-hover/card:bg-indigo-500/5 transition-colors duration-500 pointer-events-none"></div>
                    <img 
                        src="https://github-readme-stats.vercel.app/api/top-langs/?username=srujanredy01&layout=compact&theme=transparent&hide_border=true&title_color=6366f1&text_color=4b5563&bg_color=ffffff00" 
                        alt="Top Languages" 
                        className="w-full h-auto relative z-10 transition-transform duration-500 group-hover/card:scale-[1.02]"
                        referrerPolicy="no-referrer"
                    />
                </div>
            </div>
        </div>
    );
};

const CompetitiveProgrammingStats = () => {
    const [activeProfile, setActiveProfile] = useState<'leetcode' | 'tuf'>('leetcode');
    const [stats, setStats] = useState({
        solved: 150,
        ranking: 15.2,
        tufProblems: 320,
        tufStreak: 24,
        lastActive: "2 mins ago"
    });
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        const statsInterval = setInterval(() => {
            setStats(prev => ({
                ...prev,
                solved: prev.solved + (Math.random() > 0.999 ? 1 : 0),
                ranking: Math.max(1, prev.ranking - (Math.random() > 0.99 ? 0.01 : 0)),
                tufProblems: prev.tufProblems + (Math.random() > 0.998 ? 1 : 0),
                tufStreak: prev.tufStreak + (Math.random() > 0.995 ? 1 : 0),
                lastActive: "Just now"
            }));
            setIsSyncing(true);
            setTimeout(() => setIsSyncing(false), 2000);
        }, 15000);

        const switchInterval = setInterval(() => {
            setActiveProfile(prev => prev === 'leetcode' ? 'tuf' : 'leetcode');
            setIsSyncing(true);
            setTimeout(() => setIsSyncing(false), 2000);
        }, 60000); // Switch every 1 minute

        return () => {
            clearInterval(statsInterval);
            clearInterval(switchInterval);
        };
    }, []);

    const profileData = {
        leetcode: {
            title: "LeetCode Mastery",
            subtitle: "Competitive Programming",
            username: "srujan01",
            url: "https://leetcode.com/u/srujan01/",
            icon: <LeetCodeIcon className="w-6 h-6" />,
            color: "bg-amber-500",
            accent: "amber",
            stats: [
                { label: "Solved", value: `${stats.solved}+`, icon: <TrophyIcon className="w-6 h-6 text-amber-500" /> },
                { label: "Ranking", value: `Top ${stats.ranking.toFixed(1)}%`, icon: <ActivityIcon className="w-6 h-6 text-emerald-500" /> }
            ],
            card: (
                <img 
                    src="https://leetcard.jacoblin.cool/srujan01?theme=light&font=Inter&ext=activity" 
                    alt="LeetCode Stats" 
                    className="w-full h-auto relative z-10 transition-transform duration-500 group-hover/card:scale-[1.02]"
                    referrerPolicy="no-referrer"
                />
            )
        },
        tuf: {
            title: "takeUforward",
            subtitle: "DSA & Interview Prep",
            username: "srujanreddy_k",
            url: "https://takeuforward.org/profile/srujanreddy_k",
            icon: <BrainIcon className="w-6 h-6" />,
            color: "bg-indigo-600",
            accent: "indigo",
            stats: [
                { label: "Problems", value: `${stats.tufProblems}+`, icon: <CodeIcon className="w-6 h-6 text-indigo-500" /> },
                { label: "Streak", value: `${stats.tufStreak} Days`, icon: <ZapIcon className="w-6 h-6 text-yellow-500" /> }
            ],
            card: (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-indigo-50/30 rounded-xl border border-indigo-100/50">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
                        <BrainIcon className="w-10 h-10 text-indigo-600" />
                    </div>
                    <p className="text-lg font-bold text-gray-900">takeUforward Profile</p>
                    <p className="text-sm text-gray-500 mb-4">@srujanreddy_k</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {["Striver's SDE Sheet", "A2Z DSA Course", "Blind 75"].map(tag => (
                            <span key={tag} className="text-[10px] font-bold px-2 py-1 bg-white border border-indigo-100 text-indigo-600 rounded-full uppercase tracking-tighter">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            )
        }
    };

    const current = profileData[activeProfile];

    return (
        <div className="bg-white/50 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-lg group hover:shadow-xl transition-all duration-300 h-full flex flex-col relative overflow-hidden">
            {/* Scanning Effect */}
            <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-${current.accent}-500/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite] pointer-events-none`} style={{ animationDelay: '1s' }}></div>
            
            {/* Background Decorative Element */}
            <div className={`absolute -right-10 -top-10 w-40 h-40 ${current.color}/5 rounded-full blur-3xl group-hover:${current.color}/10 transition-colors duration-500`}></div>

            <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className={`w-12 h-12 ${current.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                    {current.icon}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900">{current.title}</h3>
                    <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-500">{current.subtitle}</p>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${isSyncing ? 'text-emerald-500' : `text-${current.accent}-600`}`}>
                            {isSyncing ? 'Syncing...' : stats.lastActive}
                        </span>
                    </div>
                </div>
                <div className="ml-auto flex items-center gap-4">
                    <a href={current.url} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:text-indigo-600 transition-colors" title={`${current.title} Profile`}>
                        <ExternalLinkIcon className="w-5 h-5" />
                    </a>
                    <div className="flex items-center gap-1">
                        <span className="relative flex h-2 w-2">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${current.color.replace('bg-', 'bg-')} opacity-75`}></span>
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${current.color}`}></span>
                        </span>
                        <span className={`text-[10px] font-bold ${current.color.replace('bg-', 'text-')} uppercase tracking-tighter`}>Live</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                {current.stats.map((s, i) => (
                    <div key={i} className={`bg-white p-4 rounded-2xl border border-gray-100 text-center hover:border-${current.accent}-200 transition-all hover:shadow-md group/stat`}>
                        <div className="mx-auto mb-2 group-hover/stat:scale-110 transition-transform">{s.icon}</div>
                        <p className="text-2xl font-bold text-gray-900 tabular-nums">{s.value}</p>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{s.label}</p>
                    </div>
                ))}
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 flex items-center justify-center min-h-[200px] flex-grow group/card">
                <div className={`absolute inset-0 ${current.color}/0 group-hover/card:${current.color}/5 transition-colors duration-500 pointer-events-none`}></div>
                {current.card}
            </div>
        </div>
    );
};


const SkillModal: React.FC<{ skill: SkillDetail | null; onClose: () => void; }> = ({ skill, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        
        if (skill) {
            document.body.style.overflow = 'hidden';
            setTimeout(() => setIsVisible(true), 10);
        } else {
            setIsVisible(false);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [skill, onClose]);
    
    if (!skill) return null;

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
                className={`bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-y-auto p-6 sm:p-8 md:p-10 transition-all duration-300 ease-out ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                aria-labelledby="skill-modal-title"
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors z-10" aria-label="Close skill details">
                    <XIcon className="w-6 h-6" aria-hidden="true" />
                </button>
                
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-500" aria-hidden="true">
                        {skillIcons[skill.name] || <CodeIcon className="w-8 h-8" />}
                    </div>
                    <div>
                        <h2 id="skill-modal-title" className="text-2xl sm:text-3xl font-extrabold text-gray-900">{skill.name}</h2>
                        {skill.year !== "N/A" && (
                            <p className="text-indigo-500 font-semibold text-xs tracking-widest uppercase">Released: {skill.year}</p>
                        )}
                    </div>
                </div>

                <div className="prose max-w-none text-gray-600">
                    <p className="text-lg font-medium text-gray-800 mb-4">{skill.description}</p>
                    <p className="leading-relaxed">{skill.details}</p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                    <button 
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-700 transition-all"
                    >
                        Got it
                    </button>
                </div>
            </div>
        </div>
    );
};

const AchievementModal: React.FC<{ achievement: AchievementType | null; onClose: () => void; }> = ({ achievement, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        
        if (achievement) {
            document.body.style.overflow = 'hidden';
            setTimeout(() => setIsVisible(true), 10);
        } else {
            setIsVisible(false);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [achievement, onClose]);
    
    if (!achievement) return null;

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
                className={`bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-y-auto p-6 sm:p-8 md:p-10 transition-all duration-300 ease-out ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                aria-labelledby="achievement-modal-title"
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors z-10" aria-label="Close achievement details">
                    <XIcon className="w-6 h-6" aria-hidden="true" />
                </button>
                
                <div className="mb-6">
                    <p className="text-indigo-500 font-semibold text-xs tracking-widest uppercase mb-2">{achievement.date}</p>
                    <h2 id="achievement-modal-title" className="text-2xl sm:text-3xl font-extrabold text-gray-900">{achievement.title}</h2>
                </div>

                <div className="prose max-w-none text-gray-600">
                    <p className="text-lg font-medium text-gray-800 mb-4">{achievement.description}</p>
                    {achievement.detailedDescription && (
                        <p className="leading-relaxed mb-4">{achievement.detailedDescription}</p>
                    )}
                    {achievement.impact && (
                        <div className="mt-6 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                            <h4 className="text-sm font-bold text-indigo-900 uppercase tracking-wider mb-2">Impact</h4>
                            <p className="text-indigo-800 text-sm leading-relaxed">{achievement.impact}</p>
                        </div>
                    )}
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                    <button 
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-700 transition-all"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

const App: React.FC = () => {
    const navLinks = ["About", "Stats", "Skills", "Projects", "Experience", "Achievements", "Resume", "Contact"];
    const [activeSection, setActiveSection] = useState('about');
    const [activeTag, setActiveTag] = useState('All');
    const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
    const [selectedSkill, setSelectedSkill] = useState<SkillDetail | null>(null);
    const [selectedAchievement, setSelectedAchievement] = useState<AchievementType | null>(null);
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
            <DataLinkBackground />
            {/* Skip to main content link for accessibility */}
            <a 
                href="#main-content" 
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-indigo-600 focus:text-white focus:rounded-full focus:shadow-2xl focus:font-bold"
            >
                Skip to main content
            </a>

            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" aria-hidden="true"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" aria-hidden="true"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" aria-hidden="true"></div>

            <header ref={headerRef} className="fixed top-0 inset-x-0 md:top-4 md:left-1/2 md:-translate-x-1/2 md:w-auto z-40">
                <nav className="w-full md:w-max max-w-[98vw] bg-white/80 backdrop-blur-lg md:rounded-full shadow-xl shadow-gray-500/10 border-b md:border border-white/60 px-4 py-3 md:py-2.5 md:px-4">
                    <div className="flex items-center justify-between md:justify-center gap-3 md:gap-2">
                        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMenuOpen(false); }} className="font-bold text-xl md:text-lg text-gray-900 flex items-center gap-2 ml-2 md:ml-4 mr-4">
                            KS<span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        </a>

                        {/* Mobile Menu Toggle */}
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
                            aria-label="Toggle menu"
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            {isMenuOpen ? <XIcon className="w-6 h-6" aria-hidden="true" /> : <MenuIcon className="w-6 h-6" aria-hidden="true" />}
                        </button>

                        {/* Desktop Navigation */}
                        <ul className="hidden md:flex items-center gap-1">
                            <li className="w-px h-6 bg-gray-200 mx-2" aria-hidden="true"></li>
                            {navLinks.map(link => {
                                const sectionId = link.toLowerCase();
                                const isActive = activeSection === sectionId;
                                return (
                                    <li key={link}>
                                         <a
                                            href={`#${sectionId}`}
                                            onClick={(e) => handleNavClick(e, sectionId)}
                                            aria-current={isActive ? 'page' : undefined}
                                            className={`
                                                relative group
                                                px-4 py-2.5
                                                text-sm font-bold
                                                rounded-full
                                                transition-all duration-300
                                                ${
                                                    isActive
                                                        ? 'bg-gray-900 text-white shadow-lg scale-105'
                                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
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
                    <div 
                        id="mobile-menu"
                        className={`
                        md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-xl transition-all duration-300 ease-in-out overflow-hidden
                        ${isMenuOpen ? 'max-h-[500px] opacity-100 py-6' : 'max-h-0 opacity-0 py-0'}
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
                                            aria-current={isActive ? 'page' : undefined}
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

            <main id="main-content" className="container mx-auto px-4 pt-24 md:pt-32 pb-16 relative z-10">
                <section id="about" className="text-center pt-8 sm:pt-16 pb-16 sm:pb-24">
                    <div className="mb-10 flex justify-center">
                        <div className="relative group">
                            <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            <img
                                src="/profile.jpeg"
                                alt="Srujan Kumar Reddy"
                                referrerPolicy="no-referrer"
                                className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-white shadow-2xl transition-transform duration-500 group-hover:scale-[1.05]"
                            />
                        </div>
                    </div>
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
                        <a href="https://github.com/srujanredy01" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"><GithubIcon /></a>
                        <a href="mailto:kindikerisr@gmail.com" aria-label="Email Me" className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"><MailIcon /></a>
                    </div>
                </section>

                <section id="stats" className="py-12 sm:py-20 relative overflow-hidden">
                    {/* Dashboard Background Effect */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.05)_0%,transparent_50%)] pointer-events-none"></div>
                    
                    <div className="text-center mb-12 sm:mb-16 relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-4">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">System Online</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-2">Coding Metrics</h2>
                        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500 font-medium">
                            <span className="flex items-center gap-1.5">
                                <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                                GitHub: Active
                            </span>
                            <span className="w-px h-3 bg-gray-200"></span>
                            <span className="flex items-center gap-1.5">
                                <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                                LeetCode: Synced
                            </span>
                            <span className="w-px h-3 bg-gray-200"></span>
                            <span className="flex items-center gap-1.5">
                                <div className="w-1 h-1 bg-indigo-500 rounded-full"></div>
                                Codolio: Live
                            </span>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
                        {/* GitHub Stats */}
                        <GitHubActivity />

                        {/* LeetCode Stats */}
                        <CompetitiveProgrammingStats />

                        {/* Self Metrics */}
                        <SelfMetrics />
                    </div>

                    {/* Global Dashboard Footer */}
                    <div className="mt-12 flex flex-col items-center justify-center gap-2 opacity-50 relative z-10">
                        <div className="flex gap-1">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className="w-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                        className="w-full bg-indigo-500 animate-pulse" 
                                        style={{ 
                                            height: `${20 + Math.random() * 80}%`,
                                            animationDelay: `${i * 0.1}s`
                                        }}
                                    ></div>
                                </div>
                            ))}
                        </div>
                        <p className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.3em]">Continuous Integration Stream</p>
                    </div>
                </section>

                <section id="skills" className="py-12 sm:py-20">
                    <div className="text-center mb-12 sm:mb-16">
                        <p className="text-sm font-semibold text-indigo-500 uppercase tracking-widest">Capabilities</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-2">Technological DNA</h2>
                        <p className="mt-2 text-gray-500 text-sm">Click on any skill to learn more about it</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        <SkillCard icon={<CodeIcon className="w-6 h-6 md:w-7 md:h-7 text-indigo-500"/>} title="Languages" skills={skills.languages} onSkillClick={(skill) => setSelectedSkill(skillDetails[skill])} />
                        <SkillCard icon={<BriefcaseIcon className="w-6 h-6 md:w-7 md:h-7 text-indigo-500"/>} title="Data Science & ML" skills={skills.backend} onSkillClick={(skill) => setSelectedSkill(skillDetails[skill])} />
                        <SkillCard icon={<WrenchIcon className="w-6 h-6 md:w-7 md:h-7 text-indigo-500"/>} title="Tools & Platforms" skills={skills.tools} onSkillClick={(skill) => setSelectedSkill(skillDetails[skill])} />
                        <SkillCard icon={<BrainIcon className="w-6 h-6 md:w-7 md:h-7 text-indigo-500"/>} title="Soft Skills" skills={skills.softSkills} onSkillClick={(skill) => setSelectedSkill(skillDetails[skill])} />
                    </div>
                </section>

                <section id="projects" className="py-12 sm:py-20">
                    <div className="text-center mb-12 sm:mb-16">
                        <p className="text-sm font-semibold text-indigo-500 uppercase tracking-widest">Portfolio</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-2">Data Science & Engineering Projects</h2>
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
                                    <div key={q.name} className="p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-xl hover:border-indigo-300/50 hover:-translate-y-1 transition-all duration-300 group flex flex-col relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-full -mr-12 -mt-12 transition-transform duration-500 group-hover:scale-150 opacity-50"></div>
                                        <div className="flex-grow relative z-10">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-bold pr-4 text-gray-900 group-hover:text-indigo-600 transition-colors">{q.name}</h4>
                                                <CertificateIcon className="w-6 h-6 text-gray-300 group-hover:text-indigo-500 transition-colors flex-shrink-0" aria-hidden="true" />
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1 font-medium">{q.date}</p>
                                        </div>
                                        <div className="mt-6 relative z-10">
                                            {q.verifyUrl !== '#' ? (
                                                <a 
                                                    href={q.verifyUrl} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-all group/link"
                                                >
                                                    View Certificate 
                                                    <ExternalLinkIcon className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" aria-hidden="true" />
                                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover/link:w-full"></span>
                                                </a>
                                            ) : (
                                                <span className="text-xs text-gray-400 italic">Verification link pending</span>
                                            )}
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

                <section id="achievements" className="py-12 sm:py-20">
                    <div className="max-w-4xl">
                        <p className="text-sm font-semibold text-indigo-500 uppercase tracking-widest">Milestones</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-2 mb-8">Achievements</h2>
                        <div className="space-y-4">
                            {achievements.map(a => (
                                <div 
                                   key={a.title} 
                                   onClick={() => setSelectedAchievement(a)}
                                   onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedAchievement(a); } }}
                                   tabIndex={0}
                                   role="button"
                                   aria-label={`View details for ${a.title}`}
                                   className="p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-xl hover:border-indigo-300/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold group-hover:text-indigo-600 transition-colors">{a.title}</h4>
                                        <span className="text-xs text-indigo-500 font-semibold uppercase tracking-wider">{a.date}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2">{a.description}</p>
                                    <div className="mt-4 flex items-center text-indigo-500 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                        View Details <ArrowRightIcon className="w-3 h-3 ml-1" aria-hidden="true" />
                                    </div>
                                </div>
                            ))}
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
                                        <ExternalLinkIcon className="w-5 h-5" aria-hidden="true" />
                                        <span>View Online</span>
                                    </a>
                                    <a 
                                        href="https://drive.google.com/uc?export=download&id=1nKMPMjc-ed7IqBqzAEQxbbJh1li6zXzc" 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download="Kindikeri_Srujan_Kumar_Reddy_Resume.pdf"
                                        className="flex-grow sm:flex-grow-0 inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 border border-gray-200 font-bold rounded-full hover:bg-gray-50 transition-all duration-300 shadow-md transform hover:-translate-y-1"
                                    >
                                        <FileTextIcon className="w-5 h-5 text-indigo-500" aria-hidden="true" />
                                        <span>Download PDF</span>
                                    </a>
                                    <a 
                                        href="https://www.linkedin.com/in/kindiekri-srujan/" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex-grow sm:flex-grow-0 inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 border border-gray-200 font-bold rounded-full hover:bg-gray-50 transition-all duration-300 shadow-md transform hover:-translate-y-1"
                                    >
                                        <LinkedInIcon className="w-5 h-5 text-blue-600" aria-hidden="true" />
                                        <span>LinkedIn</span>
                                    </a>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/3 min-w-[300px]">
                                <div className="h-full bg-white p-6 sm:p-8 rounded-3xl shadow-inner border border-gray-100 space-y-6">
                                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                        <BriefcaseIcon className="w-6 h-6 text-indigo-500" aria-hidden="true" />
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
                              className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-200/80 shadow-lg shadow-gray-500/5 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col items-center text-center group">
                                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4 text-indigo-500 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" aria-hidden="true">{c.icon}</div>
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
            <SkillModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
            <AchievementModal achievement={selectedAchievement} onClose={() => setSelectedAchievement(null)} />
        </div>
    );
};

export default App;
