import React, { useState, useEffect, useRef } from 'react'
import {
  Menu,
  X,
  GithubIcon,
  LinkedinIcon,
  Mail,
  Cpu,
  Database,
  Network,
  Code,
  ExternalLink,
  ChevronDown,
  CheckCircle
} from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Import content data
import { experiences, skills, projects, education, developerStats, engineeringPrinciples } from '@/data/content'

// Import UI components
import { GridBackground, GlowingOrb, TechnicalBorder } from '@/components/ui/Effects'

// Import logo

// Custom Cursor Component
const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = () => setIsHovering(true)
    const handleMouseOut = () => setIsHovering(false)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <div
      className="custom-cursor"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      data-hovered={isHovering}
    />
  )
}

// Navbar Component
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'engineering', label: 'Engineering' },
    { id: 'terminal', label: 'Terminal' },
    { id: 'contact', label: 'Contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const scrollPosition = window.scrollY + 100
      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    setIsOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-panel py-3 shadow-lg' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        <button
          onClick={() => scrollTo('home')}
          className="hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded"
          aria-label="Home"
        >
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="Anshul Sharma Logo"
            className="h-10 w-auto object-contain"
          />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2 sm:space-x-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className={`text-sm font-medium transition-all duration-300 relative group px-2 py-1 rounded ${
                activeSection === section.id ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              {section.label}
              <span
                className={`absolute -bottom-1 left-2 right-2 h-0.5 bg-cyan-400 transition-all duration-300 ${
                  activeSection === section.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-panel border-t border-white/10 shadow-xl">
          <div className="flex flex-col p-4 space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`text-left px-4 py-3 rounded-lg transition-colors ${
                  activeSection === section.id ? 'bg-cyan-500/10 text-cyan-400 font-semibold' : 'hover:bg-white/5'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

// Hero Section
const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-24 pb-12 sm:pt-20 sm:pb-8">
      <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 sm:gap-12 items-center relative z-10">
        {/* Hero Content */}
        <div className="space-y-6 sm:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold font-display tracking-tight leading-tight">
              ANSHUL <br />
              <span className="text-gradient">SHARMA</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 font-light">
              Software Engineer <span className="mx-1 sm:mx-2">|</span> Backend Developer <span className="mx-1 sm:mx-2">|</span> Full-Stack Developer
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            <blockquote className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
              "Building scalable software, intelligent systems, and modern web experiences."
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-4"
          >
            <p className="text-gray-400 max-w-screen-sm leading-relaxed text-sm sm:text-base">
              Computer Science & Engineering graduate passionate about building reliable backend systems, full-stack applications, APIs, automation, and practical software products.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-3 sm:gap-4 pt-6 sm:pt-8"
          >
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Code size={20} />
              <span className="hidden sm:inline">View My Work</span>
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent border border-white/20 hover:border-white/40 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-white/5 text-sm sm:text-base"
            >
              Let's Connect
            </button>
          </motion.div>
        </div>

        {/* Hero Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hidden lg:block relative max-h-[500px]"
        >
          {/* Abstract technical network visualization */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-h-screen">
              {/* Outer ring */}
              <div className="absolute inset-0 border border-cyan-500/20 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-[20%] border border-violet-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-[40%] border border-amber-500/10 rounded-full animate-[spin_10s_linear_infinite]" />

              {/* Connecting nodes */}
              <div className="absolute top-0 left-1/2 w-px h-24 bg-cyan-500/30" />
              <div className="absolute bottom-0 left-1/2 w-px h-24 bg-violet-500/30" />
              <div className="absolute left-0 top-1/2 h-px w-24 bg-cyan-500/30" />
              <div className="absolute right-0 top-1/2 h-px w-24 bg-violet-500/30" />

              {/* Floating technical elements */}
              <div className="absolute top-1/4 right-1/4 w-24 h-24 border border-white/10 rounded-lg flex items-center justify-center">
                <Cpu size={32} className="text-cyan-400" />
              </div>
              <div className="absolute bottom-1/4 left-1/4 w-24 h-24 border border-white/10 rounded-lg flex items-center justify-center">
                <Database size={32} className="text-violet-400" />
              </div>
              <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-white/10 rounded-lg flex items-center justify-center">
                <Network size={32} className="text-blue-400" />
              </div>

              {/* Central technical sphere */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-violet-500/20 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center animate-pulse-slow">
                  <Code size={64} className="text-white/30" />
                </div>
              </div>

              {/* Data particles */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                  style={{
                    top: `${50 + 40 * Math.sin(i * 0.5)}%`,
                    left: `${50 + 40 * Math.cos(i * 0.5)}%`,
                    animation: `float 6s ease-in-out infinite`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <ChevronDown className="text-gray-500" />
      </motion.div>
    </section>
  )
}

// About Section
const About: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-24 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-16 text-center sm:text-left"
        >
          <span className="text-cyan-500 font-mono text-sm tracking-widest">01 / ABOUT</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-4">Engineer. Builder. Problem Solver.</h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Developer Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <TechnicalBorder className="glass-panel p-6 sm:p-8 h-full">
              <h3 className="font-mono text-cyan-400 mb-6 border-b border-white/10 pb-4">
                DEVELOPER PROFILE
              </h3>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm uppercase tracking-wider mb-1">Name</p>
                  <p className="text-lg sm:text-xl font-medium">Anshul Sharma</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm uppercase tracking-wider mb-1">Role</p>
                  <p className="text-lg sm:text-xl font-medium">Software Engineer</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm uppercase tracking-wider mb-1">Education</p>
                  <p className="text-base sm:text-lg">B.Tech in Computer Science & Engineering</p>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">Amity University</p>
                  <p className="text-cyan-400 text-xs sm:text-sm mt-1 font-medium">{education.status}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm uppercase tracking-wider mb-1">Focus</p>
                  <div className="flex flex-wrap gap-2">
                    {['Backend Systems', 'Full-Stack', 'APIs', 'Automation'].map((tag) => (
                      <span key={tag} className="px-2 sm:px-3 py-1 bg-white/5 rounded text-xs sm:text-sm text-cyan-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm uppercase tracking-wider mb-1">Current Mode</p>
                  <p className="text-base sm:text-lg">Building • Learning • Shipping</p>
                </div>
              </div>
            </TechnicalBorder>
          </motion.div>

          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="glass-panel p-6 sm:p-8 h-full">
              <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-6">
                I'm a Computer Science & Engineering graduate with a passion for building practical software systems. My focus lies in backend development, full-stack applications, and creating efficient APIs that power modern web experiences.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-6">
                What drives me is the process of turning abstract problems into concrete solutions. I enjoy architecting systems that are not just functional, but scalable, maintainable, and well-integrated. Whether it's designing database schemas, building RESTful APIs, or creating intuitive user interfaces, I approach each project with an engineering mindset.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-gray-300">
                I believe in shipping working software rather than staying in the realm of theory. Each project I work on is an opportunity to learn, improve, and create something tangible that solves real problems.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Engineering Philosophy Section
const EngineeringPhilosophy: React.FC = () => {
  return (
    <section id="engineering" className="py-20 sm:py-24 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-cyan-500 font-mono text-sm tracking-widest">HOW I BUILD</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-4">Engineering Philosophy</h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {engineeringPrinciples.map((principle, index) => (
            <motion.div
              key={principle.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-panel p-4 sm:p-6 lg:p-8 h-full hover:bg-white/5 transition-colors duration-300">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white/5 mb-4 group-hover:text-cyan-500/30 transition-colors">
                  {principle.id.toString().padStart(2, '0')}
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 text-cyan-400">{principle.title}</h3>
                <p className="text-gray-300 mb-4 text-sm sm:text-base">{principle.description}</p>
                <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-300">
                  <p className="text-xs sm:text-sm text-gray-500">{principle.details}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Experience Section
const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="experience" className="py-20 sm:py-24 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-16 text-center sm:text-left"
        >
          <span className="text-cyan-500 font-mono text-sm tracking-widest">02 / EXPERIENCE</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-4">Professional Journey</h2>
        </motion.div>

        <div className="relative" ref={containerRef}>
          {/* Timeline Line */}
          <motion.div
            className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px sm:w-px bg-gradient-to-b from-cyan-500/30 via-cyan-500 to-transparent -translate-x-1/2 sm:translate-x-0"
            style={{ scaleX }}
          />

          <div className="space-y-8 sm:space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative ${index % 2 === 0 ? 'pr-0 sm:pr-12 lg:pr-32 text-left sm:text-left' : 'pl-0 sm:pl-12 lg:pl-32 text-left sm:text-left'}`}
              >
                {/* Timeline Node */}
                <div className={`absolute left-4 sm:left-1/2 top-0 w-4 h-4 bg-cyan-500 rounded-full -translate-x-1/2 border-4 border-dark-900 z-10 sm:translate-x-0 ${index % 2 === 0 ? 'sm:left-1/2' : 'sm:left-1/2'}`} />
                <div className="ml-12 sm:ml-0 sm:ml-0 lg:ml-32">
                  <div className="glass-panel p-4 sm:p-6 md:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-semibold mb-2">{exp.company}</h3>
                        <p className="text-cyan-400 font-medium mb-3">{exp.role}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-mono mb-4">
                          <span>{exp.year}</span>
                          <span className="text-gray-700">|</span>
                          <span>{exp.tech}</span>
                        </div>
                        <p className="text-gray-300 mb-4 text-sm sm:text-base">{exp.description}</p>
                        <ul className="space-y-2 text-sm text-gray-400">
                          {exp.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle size={16} className="text-cyan-500 shrink-0 mt-0.5" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Skills Section
const Skills: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)

  const categories = Array.from(new Set(skills.map((s) => s.category)))

  return (
    <section id="skills" className="py-32 relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-cyan-500 font-mono text-sm tracking-widest">03 / TECH STACK</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">Technology Ecosystem</h2>
          <p className="text-gray-400 mt-4 max-w-2xl">
            My technical stack organized by functional areas, representing how I structure
            and approach software development.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="glass-panel p-6 mb-6">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4 border-b border-white/10 pb-2">
                  {category}
                </h3>
                <div className="space-y-3">
                  {skills
                    .filter((s) => s.category === category)
                    .map((skill) => (
                      <div
                        key={skill.id}
                        onClick={() => setSelectedSkill(skill.id)}
                        className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                          selectedSkill === skill.id
                            ? 'bg-cyan-500/10 border border-cyan-500/50'
                            : 'hover:bg-white/5 border border-white/5'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{skill.name}</span>
                          {selectedSkill === skill.id && (
                            <span className="text-cyan-500">ℹ</span>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skill Details Panel */}
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 glass-panel p-6 rounded-lg overflow-hidden"
          >
            {skills
              .filter((s) => s.id === selectedSkill)
              .map((skill) => (
                <div key={skill.id}>
                  <h3 className="text-2xl font-semibold mb-2">{skill.name}</h3>
                  <p className="text-gray-300">{skill.description}</p>
                </div>
              ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

// Projects Section
const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-32 relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-cyan-500 font-mono text-sm tracking-widest">04 / SELECTED WORK</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">Projects</h2>
        </motion.div>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-panel p-8 md:p-10 hover:border-cyan-500/30 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded text-sm text-cyan-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Highlights */}
                    <div className="mb-6">
                      <h4 className="text-sm uppercase text-gray-500 tracking-wider mb-3">
                        Technical Highlights
                      </h4>
                      <ul className="space-y-2">
                        {project.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                            <span className="text-cyan-500 mt-0.5">➜</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Links */}
                    <div className="flex gap-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded transition-colors"
                        >
                          <GithubIcon size={18} />
                          <span>GitHub</span>
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 rounded transition-colors"
                        >
                          <ExternalLink size={18} />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// System Architecture Section
const SystemArchitecture: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null)

  const architecture = [
    {
      id: 'frontend',
      name: 'React / Frontend',
      description: 'User interface layer with reactive components',
      x: 50,
      y: 10,
    },
    {
      id: 'api',
      name: 'REST API',
      description: 'Communication layer between frontend and backend',
      x: 50,
      y: 20,
    },
    {
      id: 'backend',
      name: 'FastAPI / Node.js',
      description: 'Application logic and request handling',
      x: 50,
      y: 30,
    },
    {
      id: 'auth',
      name: 'Authentication',
      description: 'User identity verification and session management',
      x: 50,
      y: 40,
    },
    {
      id: 'business',
      name: 'Application Logic',
      description: 'Core business rules and workflows',
      x: 50,
      y: 50,
    },
    {
      id: 'database',
      name: 'Database',
      description: 'Data persistence layer (MySQL/MongoDB)',
      x: 50,
      y: 60,
    },
    {
      id: 'background',
      name: 'Background Jobs',
      description: 'Asynchronous task processing',
      x: 50,
      y: 70,
    },
    {
      id: 'celery',
      name: 'Celery',
      description: 'Distributed task queue for Python',
      x: 35,
      y: 80,
    },
    {
      id: 'rabbitmq',
      name: 'RabbitMQ',
      description: 'Message brokering and async communication',
      x: 50,
      y: 80,
    },
    {
      id: 'redis',
      name: 'Redis',
      description: 'Caching and fast data access layer',
      x: 65,
      y: 80,
    },
  ]

  const descriptions: Record<string, string> = {
    frontend: 'React provides a component-based approach to building user interfaces with efficient rendering through the virtual DOM.',
    api: 'REST APIs provide a standardized way for different system components to communicate using HTTP methods and JSON data.',
    backend: 'FastAPI and Node.js serve as the application servers, handling requests, business logic, and response generation.',
    auth: 'Authentication systems verify user identities and manage secure sessions for protected resources.',
    business: 'Core application logic that implements the specific business rules and workflow requirements.',
    database: 'Relational (MySQL) and NoSQL (MongoDB) databases store persistent application data.',
    background: 'Background job processing allows time-consuming tasks to run asynchronously without blocking user requests.',
    celery: 'Celery is a distributed task queue that enables Python applications to execute tasks asynchronously.',
    rabbitmq: 'RabbitMQ serves as a message broker, enabling reliable communication between distributed system components.',
    redis: 'Redis provides in-memory caching for fast data access and supports various data structures.',
  }

  return (
    <section id="engineering" className="py-32 relative bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-500 font-mono text-sm tracking-widest">SYSTEM ARCHITECTURE</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">Inside the System</h2>
          <p className="text-gray-400 mt-4">
            A visualization of how different technologies work together in my stack
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto bg-dark-900/50 rounded-xl p-8 border border-white/10">
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(0, 243, 255, 0.3)" />
                <stop offset="50%" stopColor="rgba(0, 243, 255, 0.8)" />
                <stop offset="100%" stopColor="rgba(0, 243, 255, 0.3)" />
              </linearGradient>
            </defs>
            {/* Vertical connection line */}
            <line
              x1="50%"
              y1="100"
              x2="50%"
              y2="500"
              stroke="url(#lineGradient)"
              strokeWidth="2"
            />
          </svg>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
            {architecture.map((node) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`relative p-4 rounded-lg border transition-all cursor-pointer ${
                  activeNode === node.id
                    ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                    : 'bg-white/5 border-white/10 hover:border-cyan-500/30'
                }`}
                onClick={() => setActiveNode(node.id === activeNode ? null : node.id)}
              >
                <h4 className="font-mono font-semibold text-cyan-400">{node.name}</h4>
                <p className="text-xs text-gray-400 mt-2">{node.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Active Node Details */}
        {activeNode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 glass-panel p-6 max-w-2xl mx-auto"
          >
            <h3 className="text-xl font-mono text-cyan-400 mb-2">{descriptions[activeNode]}</h3>
          </motion.div>
        )}
      </div>
    </section>
  )
}

// Terminal Section
const TerminalSection: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<string[]>([
    'Welcome to Anshul Sharma\'s Developer Terminal',
    '',
    'Type "help" for available commands',
    '',
  ])
  const [showCursor, setShowCursor] = useState(true)
  const terminalEndRef = useRef<HTMLDivElement>(null)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [currentCommandIndex, setCurrentCommandIndex] = useState(-1)

  useEffect(() => {
    const timer = setInterval(() => setShowCursor((prev) => !prev), 500)
    return () => clearInterval(timer)
  }, [])


  const commands: Record<string, string> = {
    help: `Available Commands:
  help       - Show this help message
  about      - Brief introduction
  skills     - Display technical stack
  projects   - Show selected projects
  experience - View work history
  contact    - Contact information
  clear      - Clear terminal`,
    about: `Name: Anshul Sharma
Role: Software Engineer
Education: B.Tech in Computer Science & Engineering, Amity University
Focus: Backend Systems, Full-Stack Development, APIs, Automation
For more details visit the About section.`,
    skills: `Python | FastAPI | React | Node.js | Express.js
MySQL | MongoDB
RabbitMQ | Redis | Celery
Docker | Git | Render
REST APIs | Authentication | Testing
For more details visit the Skills section.`,
    projects: `1. Rental Application - Full-stack rental platform
2. MERN Task Management System - Productivity app
3. Python Utilities - Automation tools and utilities
For more details visit the Projects section.`,
    experience: `GlobalLogic India Limited - Software Engineer Intern (2025)
Syncglob Private Limited - MERN Stack Development Intern (2024)
CodSoft - Python Programming Intern (2024)
For more details visit the Experience section.`,
    contact: `Email: anshulsh012@gmail.com
GitHub: https://github.com/anshulsh012
LinkedIn: https://www.linkedin.com/in/anshul-sharma0001/
For more details visit the Contact section.`,
    clear: '',
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (input.trim().toLowerCase() === 'clear') {
        setOutput([''])
        setInput('')
        return
      }

      const command = input.trim().toLowerCase()
      const response = commands[command] || `Command not found: ${command}. Type "help" for available commands.`

      setOutput((prev) => [...prev, `> ${input}`, response, ''])
      setCommandHistory((prev) => [...prev, input])
      setCurrentCommandIndex(commandHistory.length)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0 && currentCommandIndex > 0) {
        const newIndex = currentCommandIndex - 1
        setCurrentCommandIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (currentCommandIndex < commandHistory.length - 1) {
        const newIndex = currentCommandIndex + 1
        setCurrentCommandIndex(newIndex)
        setInput(commandHistory[newIndex])
      } else {
        setCurrentCommandIndex(commandHistory.length)
        setInput('')
      }
    }
  }

  return (
    <section id="terminal" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 TERMINAL-ACCESS-HEADING">
          <span className="text-cyan-500 font-mono text-sm tracking-widest">TERMINAL ACCESS</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">Developer Console</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="glass-panel rounded-lg overflow-hidden border border-white/10">
            {/* Terminal Header */}
            <div className="bg-dark-900 px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code size={18} className="text-cyan-400" />
                <span className="font-mono text-sm text-gray-300">
                  anshul@portfolio:~$
                </span>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
            </div>

            {/* Terminal Input */}
            <div className="p-4 bg-dark-900 border-b border-white/10">
              <div className="flex font-mono text-sm">
                <span className="text-cyan-400 mr-2">anshul@portfolio:~$</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none text-white font-mono caret-cyan-400"
                  placeholder="Type a command..."
                />
                {showCursor && <span className="text-cyan-400 animate-pulse">|</span>}
              </div>
            </div>

            {/* Terminal Output */}
            <div className="p-6 font-mono text-sm min-h-[300px] bg-dark-950/50 text-gray-300 whitespace-pre-wrap">
              {output.map((line, i) => (
                <div key={i} className="mb-1">
                  {line}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Statistics Section
const Statistics: React.FC = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Object.values(developerStats).map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-panel p-6 text-center"
            >
              <div className="text-5xl md:text-6xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 mb-2">
                {stat.number}
              </div>
              <div className="text-cyan-400 font-mono text-sm uppercase tracking-wider mb-1">
                {stat.label}
              </div>
              <div className="text-gray-400 text-sm">{stat.value}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Education Section
const Education: React.FC = () => {
  return (
    <section id="education" className="py-32 relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-cyan-500 font-mono text-sm tracking-widest">05 / EDUCATION</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">Academic Background</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <TechnicalBorder className="glass-panel p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h3 className="text-3xl font-bold mb-2">{education.institution}</h3>
                <p className="text-xl text-cyan-400 mb-4">{education.degree} in {education.field}</p>
                <div className="space-y-2">
                  <h4 className="text-sm uppercase text-gray-500 tracking-wider">Relevant Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {education.interests.map((interest) => (
                      <span key={interest} className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-sm text-cyan-300">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-end">
                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-2">Status</p>
                  <div className="text-2xl font-semibold text-cyan-400">{education.status}</div>
                </div>
              </div>
            </div>
          </TechnicalBorder>
        </motion.div>
      </div>
    </section>
  )
}

// Contact Section
const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('https://formspree.io/f/mnpqavka', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: new URLSearchParams({
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
      // Reset status after a few seconds
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="py-32 relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-500 font-mono text-sm tracking-widest">06 / ESTABLISH CONNECTION</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">Let's build something useful.</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Interested in software engineering, backend systems, full-stack development, or building something ambitious? Let's connect.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-panel p-8">
              <h3 className="text-xl font-semibold mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-500 mb-2">Name</label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-dark-900/50 border border-white/10 rounded focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-2">Email</label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-dark-900/50 border border-white/10 rounded focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-2">Message</label>
                  <textarea
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-dark-900/50 border border-white/10 rounded focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className={`w-full py-4 rounded-lg font-semibold transition-all duration-300 ${
                    status === 'success'
                      ? 'bg-green-500 text-white'
                      : status === 'error'
                      ? 'bg-red-500 text-white'
                      : 'bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-white'
                  }`}
                >
                  {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="glass-panel p-8">
              <h3 className="text-xl font-semibold mb-6">Other Ways to Connect</h3>

              <div className="space-y-4">
                <a
                  href="mailto:anshulsh012@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <div className="p-3 bg-cyan-500/10 rounded-full group-hover:bg-cyan-500/20 transition-colors">
                    <Mail size={20} className="text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="text-gray-300 group-hover:text-cyan-400 transition-colors">
                      anshulsh012@gmail.com
                    </div>
                  </div>
                </a>

                <a
                  href="https://github.com/anshulsh012"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <div className="p-3 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
                    <GithubIcon size={20} className="text-gray-300" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">GitHub</div>
                    <div className="text-gray-300 group-hover:text-cyan-400 transition-colors">
                      github.com/anshulsh012
                    </div>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/anshul-sharma0001/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <div className="p-3 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
                    <LinkedinIcon size={20} className="text-gray-300" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">LinkedIn</div>
                    <div className="text-gray-300 group-hover:text-cyan-400 transition-colors">
                      linkedin.com/in/anshul-sharma0001
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="glass-panel p-8">
              <h3 className="text-lg font-semibold mb-4">Quick Facts</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Location</span>
                  <span className="text-gray-300">Global</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Availability</span>
                  <span className="text-cyan-400">Open to Work</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Response Time</span>
                  <span className="text-gray-300">&lt; 24 hours</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Footer
const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-white/10 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold font-display">ANSHUL SHARMA</h3>
            <p className="text-gray-500 mt-1">Software Engineer / Builder</p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-gray-500 text-sm">© 2026 Anshul Sharma</p>
            <p className="text-cyan-500/70 text-sm mt-1">Built with curiosity & code.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main Portfolio Component
const Portfolio: React.FC = () => {
  useEffect(() => {
    // Scroll to terminal section title on page load
    const terminalTitle = document.querySelector('.TERMINAL-ACCESS-HEADING')
    if (terminalTitle) {
      terminalTitle.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Background Effects */}
      <GridBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <EngineeringPhilosophy />
        <Experience />
        <Skills />
        <Projects />
        <SystemArchitecture />
        <TerminalSection />
        <Statistics />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating technical elements */}
      <GlowingOrb
        className="top-1/4 left-1/4 w-96 h-96"
        color="cyan"
        delay={0}
      />
      <GlowingOrb
        className="bottom-1/4 right-1/4 w-96 h-96"
        color="violet"
        delay={2}
      />
    </div>
  )
}

export default Portfolio
