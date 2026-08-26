// Data definitions for Anshul Sharma's portfolio

export interface Experience {
  id: number
  company: string
  role: string
  year: string
  tech: string
  description: string
  details: string[]
}

export const experiences: Experience[] = [
  {
    id: 1,
    company: 'GlobalLogic India Limited',
    role: 'Software Engineer Intern',
    year: '2025',
    tech: 'Backend Systems, APIs',
    description: 'Working on scalable backend services and API development.',
    details: [
      'Contributed to backend service development using modern frameworks',
      'Worked on API design and implementation for enterprise applications',
      'Collaborated with cross-functional teams on software delivery'
    ]
  },
  {
    id: 2,
    company: 'Syncglob Private Limited',
    role: 'MERN Stack Development Intern',
    year: '2024',
    tech: 'MongoDB, Express.js, React, Node.js',
    description: 'Full-stack development experience using the MERN stack.',
    details: [
      'Developed full-stack web applications with React frontend',
      'Built RESTful APIs using Node.js and Express.js',
      'Implemented database solutions with MongoDB',
      'Worked on authentication and data management systems'
    ]
  },
  {
    id: 3,
    company: 'CodSoft',
    role: 'Python Programming Intern',
    year: '2024',
    tech: 'Python, Automation, Utilities',
    description: 'Python programming focused on automation and practical tools.',
    details: [
      'Developed Python utilities and automation scripts',
      'Created reusable code libraries for common tasks',
      'Solved practical problems using Python programming',
      'Implemented data processing and workflow automation'
    ]
  }
]

export interface Skill {
  id: string
  name: string
  category: string
  description: string
}

export const skills: Skill[] = [
  // Programming & Backend
  { id: 'python', name: 'Python', category: 'Programming & Backend', description: 'Building backend systems, automation scripts, and practical utilities' },
  { id: 'fastapi', name: 'FastAPI', category: 'Programming & Backend', description: 'Creating modern REST APIs with async support' },
  { id: 'nodejs', name: 'Node.js', category: 'Programming & Backend', description: 'Server-side JavaScript for scalable applications' },
  { id: 'express', name: 'Express.js', category: 'Programming & Backend', description: 'Minimal web framework for Node.js applications' },
  { id: 'rest', name: 'REST APIs', category: 'Programming & Backend', description: 'Designing and implementing RESTful web services' },

  // Frontend
  { id: 'react', name: 'React', category: 'Frontend', description: 'Building interactive user interfaces with component architecture' },

  // Databases
  { id: 'mysql', name: 'MySQL', category: 'Databases', description: 'Relational database management and query optimization' },
  { id: 'mongodb', name: 'MongoDB', category: 'Databases', description: 'NoSQL document database for flexible data modeling' },

  // Distributed Systems
  { id: 'rabbitmq', name: 'RabbitMQ', category: 'Distributed Systems & Background Processing', description: 'Message brokering for asynchronous communication' },
  { id: 'redis', name: 'Redis', category: 'Distributed Systems & Background Processing', description: 'Caching and fast data access layer' },
  { id: 'celery', name: 'Celery', category: 'Distributed Systems & Background Processing', description: 'Distributed task queue for Python' },

  // Infrastructure & Tools
  { id: 'docker', name: 'Docker', category: 'Infrastructure & Tools', description: 'Containerization and deployment' },
  { id: 'git', name: 'Git', category: 'Infrastructure & Tools', description: 'Version control and collaboration' },
  { id: 'render', name: 'Render', category: 'Infrastructure & Tools', description: 'Cloud platform for deploying applications' },

  // Engineering Practices
  { id: 'auth', name: 'Authentication', category: 'Engineering Practices', description: 'Implementing secure authentication systems' },
  { id: 'unit-testing', name: 'Unit Testing', category: 'Engineering Practices', description: 'Writing comprehensive unit tests' },
  { id: 'integration-testing', name: 'Integration Testing', category: 'Engineering Practices', description: 'Testing system integrations and workflows' },
  { id: 'api-dev', name: 'API Development', category: 'Engineering Practices', description: 'Full lifecycle API design and implementation' },
]

export interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  highlights: string[]
  github?: string
  demo?: string
  fullDescription: string
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Rental Application',
    description: 'A full-stack rental application for managing property listings and bookings.',
    tags: ['React', 'FastAPI', 'MySQL', 'REST'],
    highlights: [
      'Full-stack architecture with React frontend and FastAPI backend',
      'RESTful API design with proper separation of concerns',
      'Database integration with MySQL for persistent data storage',
      'User authentication and authorization system',
      'Responsive frontend with modern UI components'
    ],
    github: 'https://github.com/yourusername/rental-application',
    fullDescription: 'A comprehensive rental application that enables users to browse properties, manage listings, and handle bookings. The system features a React-based frontend with a clean, responsive interface, coupled with a robust FastAPI backend for handling business logic. MySQL serves as the primary database, storing property information, user accounts, and booking records. The application follows REST API best practices with proper error handling, validation, and authentication middleware.'
  },
  {
    id: 2,
    title: 'MERN Task Management System',
    description: 'A task management application built with the MERN stack for efficient productivity.',
    tags: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    highlights: [
      'Complete MERN stack implementation',
      'RESTful API with Express.js and Node.js',
      'MongoDB database for flexible document storage',
      'User authentication and session management',
      'Task CRUD operations with frontend state management',
      'Real-time updates and notifications'
    ],
    github: 'https://github.com/yourusername/task-management',
    fullDescription: 'A full-stack task management application enabling users to organize their tasks efficiently. Built entirely on the MERN stack, this application features a React frontend with intuitive UI components, Express.js for RESTful API endpoints, Node.js for server-side logic, and MongoDB for data persistence. The system supports user authentication, task creation and management, category organization, and status tracking with real-time updates.'
  },
  {
    id: 3,
    title: 'Python Utilities',
    description: 'A collection of practical Python utilities and automation tools.',
    tags: ['Python', 'Automation', 'Scripting'],
    highlights: [
      'Reusable utility functions for common tasks',
      'Automation scripts for workflow optimization',
      'Data processing and transformation tools',
      'System administration utilities',
      'Command-line interface tools'
    ],
    fullDescription: 'A collection of practical Python utilities designed to solve everyday programming challenges. This project demonstrates Python programming skills through various tools including file manipulation utilities, data processing scripts, system automation tools, and command-line utilities. Each utility is well-documented and follows Python best practices for code organization and maintainability.'
  }
]

export const education = {
  institution: 'Amity University',
  degree: 'Bachelor of Technology (B.Tech)',
  field: 'Computer Science & Engineering',
  status: 'Graduated',
  interests: [
    'Software Engineering',
    'Backend Systems Architecture',
    'Distributed Systems',
    'API Design',
    'Database Systems'
  ]
}

export const developerStats = {
  degree: {
    number: '01',
    label: 'Degree',
    value: 'Computer Science & Engineering'
  },
  internships: {
    number: '03',
    label: 'Internships',
    value: 'Software Engineering / MERN / Python'
  },
  projects: {
    number: '03+',
    label: 'Major Projects',
    value: 'Applications & Utilities'
  },
  curiosity: {
    number: '∞',
    label: 'Curiosity',
    value: 'Always Learning'
  }
}

export const engineeringPrinciples = [
  {
    id: 1,
    title: 'Understand',
    description: 'Understand the problem before writing unnecessary code.',
    details: 'Take time to fully comprehend the requirements and constraints before implementing. Avoid solving hypothetical problems that don\'t exist. This principle helps prevent over-engineering and keeps solutions focused on actual needs.'
  },
  {
    id: 2,
    title: 'Architect',
    description: 'Think about APIs, data flow, scalability, reliability, and maintainability.',
    details: 'Design systems with consideration for how components interact. Plan the data flow between services, anticipate growth patterns, and build for maintainability. Good architecture is the foundation that allows software to evolve gracefully over time.'
  },
  {
    id: 3,
    title: 'Build',
    description: 'Turn ideas into working software instead of stopping at theory.',
    details: 'Translation of concepts into functional code. There\'s immense value in seeing something work in practice. Building produces tangible results that can be tested, improved, and deployed to create real value.'
  },
  {
    id: 4,
    title: 'Improve',
    description: 'Test, debug, optimize, refactor, and continuously improve the system.',
    details: 'Software development is iterative. Testing catches issues early, debugging reveals hidden problems, optimization enhances performance, and refactoring maintains code quality. Continuous improvement keeps systems robust and efficient.'
  }
]
