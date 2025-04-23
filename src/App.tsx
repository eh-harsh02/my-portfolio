import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'
import profileImage from './assets/profile.jpg'
import projectsData from './data/projects.json'
import newsJunctionImage from './assets/newsjunction.png'
import hotelManagementImage from './assets/hotel-management.jpg'
import { FaGithub, FaLinkedin, FaStar, FaDownload, FaExternalLinkAlt, FaMoon, FaSun, FaNetworkWired, FaPython, FaShieldAlt, FaPuzzlePiece } from 'react-icons/fa'
import { SiLeetcode, SiHackerrank, SiGoogle } from 'react-icons/si'
import LeetCodeStats from './components/LeetCodeStats.tsx'
import HackerRankStats from './components/HackerRankStats.tsx'
import './styles/HackerRankStats.css'
import Particles from './components/Particles.tsx'

type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  features: string[];
  image: string;
  github: string;
  liveDemo: string;
  date: string;
}

type SocialLinks = {
  github: string;
  linkedin: string;
  leetcode: string;
  hackerrank: string;
}

type HomeSection = {
  title: string;
  subtitle: string;
  content: string;
  socialLinks: SocialLinks;
  resumeLink: string;
}

type AboutSection = {
  title: string;
  content: string;
  skills: Record<string, string[]>;
}

type AchievementsSection = {
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

type CertificationsSection = {
  title: string;
  items: Array<{
    name: string;
    issuer: string;
    link: string | null;
    icon: React.ReactNode;
    issuerIcon?: React.ReactNode;
  }>;
}

type ProjectsSection = {
  title: string;
  content: Project[];
}

type ContactSection = {
  title: string;
  content: React.ReactNode;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

type Sections = {
  home: HomeSection;
  about: AboutSection;
  achievements: AchievementsSection;
  certifications: CertificationsSection;
  projects: ProjectsSection;
  contact: ContactSection;
  [key: string]: HomeSection | AboutSection | AchievementsSection | CertificationsSection | ProjectsSection | ContactSection;
}

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme || 'light'
  })

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    })
  }, [])

  const sections: Sections = {
    home: {
      title: "Harsh Raj",
      subtitle: "Full Stack Developer",
      content: "I'm a passionate developer with expertise in building modern web applications.",
      socialLinks: {
        github: "https://github.com/eh-harsh02",
        linkedin: "https://www.linkedin.com/in/harsh-raj-a2b6b4227/",
        leetcode: "https://leetcode.com/harsh_raj02/",
        hackerrank: "https://www.hackerrank.com/profile/harsh_raj02"
      },
      resumeLink: "https://drive.google.com/file/d/1-2Q3Q4R5T6Y7U8I9O0P1A2B3C4D5E6F7/view"
    },
    about: {
      title: "About Me",
      content: "I am a dedicated developer with strong problem-solving skills and a passion for creating efficient solutions. My technical expertise spans across multiple programming languages and frameworks, with a focus on building robust and scalable applications. I am a team player with excellent project management skills and adaptability to new technologies.",
      skills: {
        languages: ["Java", "C", "Python", "JavaScript", "PHP"],
        frameworks: ["React", "Bootstrap", "Node.js", "Spring Boot"],
        tools: ["MongoDB", "MySQL"],
        softSkills: ["Problem-Solving", "Team Player", "Project Management", "Adaptability"]
      }
    },
    achievements: {
      title: "Achievements",
      icon: <FaStar />,
      content: (
        <div className="achievements-content">
          <LeetCodeStats />
          <HackerRankStats />
        </div>
      )
    },
    certifications: {
      title: "Certifications",
      items: [
        {
          name: "Ethical Hacking",
          issuer: "NPTEL",
          issuerIcon: null,
          link: "https://archive.nptel.ac.in/content/noc/NOC24/SEM2/Ecertificates/106/noc24-cs94/Course/NPTEL24CS94S45690040604041615.pdf",
          icon: <FaShieldAlt className="certification-icon" />
        },
        {
          name: "Foundations of Cybersecurity",
          issuer: "Google",
          issuerIcon: <SiGoogle className="issuer-icon" />,
          link: null,
          icon: <FaShieldAlt className="certification-icon" />
        },
        {
          name: "The Bits and Bytes of Computer Networking",
          issuer: "Google",
          issuerIcon: <SiGoogle className="issuer-icon" />,
          link: null,
          icon: <FaNetworkWired className="certification-icon" />
        },
        {
          name: "Python",
          issuer: "HackerRank",
          issuerIcon: <SiHackerrank className="issuer-icon" />,
          link: "https://www.hackerrank.com/certificates/iframe/53df9d8c5b45",
          icon: <FaPython className="certification-icon" />
        },
        {
          name: "Problem Solving",
          issuer: "HackerRank",
          issuerIcon: <SiHackerrank className="issuer-icon" />,
          link: "https://www.hackerrank.com/certificates/iframe/5aa0b233900f",
          icon: <FaPuzzlePiece className="certification-icon" />
        }
      ]
    },
    projects: {
      title: "My Projects",
      content: projectsData.projects
    },
    contact: {
      title: "Get in Touch",
      content: "Feel free to reach out to me for any opportunities or collaborations!",
      email: "harshraj0381@gmail.com",
      phone: "+91 8804055864",
      linkedin: "http://www.linkedin.com/in/-harsh-raj-",
      github: "https://github.com/eh-harsh02"
    }
  }

  return (
    <div className="portfolio">
      <Particles />
      <motion.div 
        className="theme-toggle" 
        onClick={toggleTheme} 
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {theme === 'light' ? <FaMoon /> : <FaSun />}
      </motion.div>

      <motion.nav 
        className="navbar" 
        data-aos="fade-down"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="nav-brand"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          HR
        </motion.div>
        <div className="nav-links">
          {Object.keys(sections).map((section) => (
            <motion.a
              key={section}
              href={`#${section}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {sections[section].title}
            </motion.a>
          ))}
        </div>
      </motion.nav>

      <main className="content">
        <AnimatePresence mode="wait">
          <motion.section 
            id="home" 
            className="section home-section" 
            data-aos="fade-up"
            variants={itemVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="home-content">
              <motion.div 
                className="text-content"
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1>{sections.home.title}</h1>
                <h2>{sections.home.subtitle}</h2>
                <p>{sections.home.content}</p>
                <div className="social-links">
                  {Object.entries(sections.home.socialLinks).map(([platform, link]) => (
                    <motion.a
                      key={platform}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {platform === 'github' && <FaGithub />}
                      {platform === 'linkedin' && <FaLinkedin />}
                      {platform === 'leetcode' && <SiLeetcode />}
                      {platform === 'hackerrank' && <SiHackerrank />}
                    </motion.a>
                  ))}
                </div>
                <motion.a
                  href={sections.home.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaDownload /> Download Resume
                </motion.a>
              </motion.div>
              <motion.div 
                className="profile-image-container"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.img 
                  src={profileImage} 
                  alt="Harsh Raj" 
                  className="profile-image"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </div>
          </motion.section>

          <motion.section 
            id="about" 
            className="section" 
            data-aos="fade-up"
            variants={itemVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.h1 variants={itemVariants}>{sections.about.title}</motion.h1>
            <motion.div className="about-content" variants={itemVariants}>
              <motion.p variants={itemVariants}>{sections.about.content}</motion.p>
              <motion.div className="skills-section" variants={itemVariants}>
                <motion.h3 variants={itemVariants}>Skills</motion.h3>
                <motion.div className="skills-grid" variants={itemVariants}>
                  {Object.entries(sections.about.skills).map(([category, skills], index) => (
                    <motion.div 
                      key={category}
                      className="skill-category"
                      variants={itemVariants}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <motion.h4 variants={itemVariants}>{category}</motion.h4>
                      <motion.div className="skill-tags" variants={itemVariants}>
                        {skills.map((skill, skillIndex) => (
                          <motion.span
                            key={skill}
                            className="skill-tag"
                            variants={itemVariants}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: skillIndex * 0.05 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.section>

          <motion.section 
            id="achievements" 
            className="section" 
            data-aos="fade-up"
            variants={itemVariants}
          >
            <h1>{sections.achievements.title}</h1>
            <div className="achievements-grid">
              {sections.achievements.content}
            </div>
          </motion.section>

          <motion.section 
            id="certifications" 
            className="section" 
            data-aos="fade-up"
            variants={itemVariants}
          >
            <h1>{sections.certifications.title}</h1>
            <div className="certifications-grid">
              {sections.certifications.items.map((cert, index) => (
                <div 
                  key={index} 
                  className={`certification-card ${cert.link ? 'has-link' : ''}`}
                  data-aos="fade-up" 
                  data-aos-delay={index * 100}
                  onClick={() => cert.link && window.open(cert.link, '_blank')}
                >
                  <div className="certification-content">
                    {cert.icon}
                    <h3>{cert.name}</h3>
                    <div className="issuer">
                      {cert.issuerIcon && cert.issuerIcon}
                      <span>{cert.issuer}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section 
            id="projects" 
            className="section" 
            data-aos="fade-up"
            variants={itemVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.h1 variants={itemVariants}>{sections.projects.title}</motion.h1>
            <motion.div className="projects-grid" variants={itemVariants}>
              {sections.projects.content.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="project-card"
                  variants={itemVariants}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div className="project-image" variants={itemVariants}>
                    {project.id === 1 ? (
                      <motion.img 
                        src={newsJunctionImage} 
                        alt={project.title}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    ) : (
                      <motion.img 
                        src={hotelManagementImage} 
                        alt={project.title}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>
                  <motion.h3 variants={itemVariants}>{project.title}</motion.h3>
                  <motion.p variants={itemVariants}>{project.description}</motion.p>
                  <motion.div className="project-technologies" variants={itemVariants}>
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        className="tech-tag"
                        variants={itemVariants}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: techIndex * 0.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                  <motion.div className="project-features" variants={itemVariants}>
                    <motion.h4 variants={itemVariants}>Key Features:</motion.h4>
                    <motion.ul variants={itemVariants}>
                      {project.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          variants={itemVariants}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.05 }}
                        >
                          {feature}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                  <motion.div className="project-links" variants={itemVariants}>
                    <motion.a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </motion.a>
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaGithub /> GitHub
                    </motion.a>
                  </motion.div>
                  <motion.span className="project-date" variants={itemVariants}>
                    {project.date}
                  </motion.span>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          <motion.section 
            id="contact" 
            className="section" 
            data-aos="fade-up"
            variants={itemVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.h1 variants={itemVariants}>{sections.contact.title}</motion.h1>
            <motion.div className="contact-form" variants={itemVariants}>
              <motion.p variants={itemVariants}>{sections.contact.content}</motion.p>
              <motion.div className="contact-info" variants={itemVariants}>
                <motion.p variants={itemVariants}>
                  <strong>Email:</strong> <a href={`mailto:${sections.contact.email}`}>{sections.contact.email}</a>
                </motion.p>
                <motion.p variants={itemVariants}>
                  <strong>Phone:</strong> {sections.contact.phone}
                </motion.p>
                <motion.p variants={itemVariants}>
                  <strong>LinkedIn:</strong> <a href={sections.contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
                </motion.p>
                <motion.p variants={itemVariants}>
                  <strong>GitHub:</strong> <a href={sections.contact.github} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
                </motion.p>
              </motion.div>
              <motion.form variants={itemVariants}>
                <motion.input 
                  type="text" 
                  placeholder="Your Name"
                  variants={itemVariants}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                />
                <motion.input 
                  type="email" 
                  placeholder="Your Email"
                  variants={itemVariants}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                />
                <motion.textarea 
                  placeholder="Your Message"
                  variants={itemVariants}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                />
                <motion.button 
                  type="submit"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message
                </motion.button>
              </motion.form>
            </motion.div>
          </motion.section>
        </AnimatePresence>
      </main>

      <motion.footer 
        className="footer" 
        data-aos="fade-up"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p>&copy; 2025 Harsh Raj. All rights reserved.</p>
      </motion.footer>
    </div>
  )
}

export default App 