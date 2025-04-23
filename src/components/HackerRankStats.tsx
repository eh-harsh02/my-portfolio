import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SiHackerrank } from 'react-icons/si';
import { FaCode, FaStar, FaTrophy, FaAward, FaMedal, FaCertificate } from 'react-icons/fa';

type Badge = {
  name: string;
  icon: React.ReactElement;
  description: string;
  category: string;
}

type Skill = {
  name: string;
  level: number;
  stars: number;
}

const HackerRankStats = () => {
  const [stats, setStats] = useState({
    badges: 0,
    skills: 0,
    contests: 0,
    certificates: 0
  });

  const [badges, setBadges] = useState<Badge[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: unknown) => {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    setError(errorMessage);
  };

  useEffect(() => {
    const fetchHackerRankStats = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Mock data for demonstration
        // In a real implementation, you would fetch this from HackerRank's API
        const mockData = {
          badges: 12,
          skills: 8,
          contests: 5,
          certificates: 3
        };
        
        setStats(mockData);

        // Mock badges data
        const mockBadges: Badge[] = [
          {
            name: "Problem Solving",
            icon: <FaCode />,
            description: "Mastered problem-solving skills",
            category: "Skills"
          },
          {
            name: "Python Expert",
            icon: <FaStar />,
            description: "Achieved 5 stars in Python",
            category: "Languages"
          },
          {
            name: "SQL Master",
            icon: <FaMedal />,
            description: "Completed all SQL challenges",
            category: "Databases"
          },
          {
            name: "Contest Champion",
            icon: <FaTrophy />,
            description: "Won a coding contest",
            category: "Contests"
          },
          {
            name: "Rest API",
            icon: <FaCertificate />,
            description: "Certified in REST API development",
            category: "Certificates"
          },
          {
            name: "Data Structures",
            icon: <FaAward />,
            description: "Mastered data structures",
            category: "Skills"
          }
        ];

        setBadges(mockBadges);

        // Mock skills data
        const mockSkills: Skill[] = [
          { name: "Python", level: 5, stars: 5 },
          { name: "SQL", level: 4, stars: 4 },
          { name: "Problem Solving", level: 5, stars: 5 },
          { name: "Data Structures", level: 4, stars: 4 },
          { name: "Algorithms", level: 4, stars: 4 },
          { name: "Java", level: 3, stars: 3 }
        ];

        setSkills(mockSkills);
      } catch (err) {
        handleError(err);
        console.error('Error fetching HackerRank stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHackerRankStats();
  }, []);

  if (loading) {
    return (
      <motion.div 
        className="hackerrank-stats" 
        data-aos="fade-up"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="stats-header">
          <SiHackerrank className="hackerrank-icon" />
          <h3>Loading HackerRank Stats...</h3>
        </div>
        <div className="loading-spinner"></div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="hackerrank-stats error" 
        data-aos="fade-up"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="stats-header">
          <SiHackerrank className="hackerrank-icon" />
          <h3>{error}</h3>
        </div>
        <button 
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="hackerrank-stats" 
      data-aos="fade-up"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="stats-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <SiHackerrank className="hackerrank-icon" />
        <h3>HackerRank Stats</h3>
      </motion.div>
      
      <motion.div 
        className="stats-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div 
          className="stat-card"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <h4>Badges</h4>
          <p className="stat-value">{stats.badges}</p>
        </motion.div>
        <motion.div 
          className="stat-card"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <h4>Skills</h4>
          <p className="stat-value">{stats.skills}</p>
        </motion.div>
        <motion.div 
          className="stat-card"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <h4>Contests</h4>
          <p className="stat-value">{stats.contests}</p>
        </motion.div>
        <motion.div 
          className="stat-card"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <h4>Certificates</h4>
          <p className="stat-value">{stats.certificates}</p>
        </motion.div>
      </motion.div>

      <motion.div 
        className="skills-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h4>Skills</h4>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="skill-card"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h5>{skill.name}</h5>
              <div className="skill-stars">
                {Array.from({ length: skill.stars }).map((_, i) => (
                  <FaStar key={i} className="star-icon" />
                ))}
              </div>
              <p>Level {skill.level}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        className="badges-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h4>Achievements</h4>
        <div className="badges-grid">
          {badges.map((badge, index) => (
            <motion.div 
              key={index}
              className="badge-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="badge-icon">{badge.icon}</div>
              <h5>{badge.name}</h5>
              <p>{badge.description}</p>
              <span className="badge-category">{badge.category}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HackerRankStats; 