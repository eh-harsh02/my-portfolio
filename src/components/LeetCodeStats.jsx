import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SiLeetcode } from 'react-icons/si';
import { FaMedal, FaTrophy, FaAward, FaCode } from 'react-icons/fa';

const LeetCodeStats = () => {
  const [stats, setStats] = useState({
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    acceptanceRate: 0,
    ranking: 0,
    contribution: 0
  });

  const [badges, setBadges] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch the user's stats
        const response = await fetch('https://leetcode-stats-api.herokuapp.com/eh_harsh02');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.status === 'success') {
          setStats({
            totalSolved: data.totalSolved || 0,
            easySolved: data.easySolved || 0,
            mediumSolved: data.mediumSolved || 0,
            hardSolved: data.hardSolved || 0,
            acceptanceRate: Math.round((data.totalSolved / (data.totalQuestions || 1)) * 100),
            ranking: data.ranking || 0,
            contribution: data.contributionPoints || 0
          });

          // Mock badges data
          setBadges([
            {
              name: "50 Days Badge",
              icon: <FaMedal />,
              description: "Solved problems for 50 consecutive days"
            },
            {
              name: "Knight Badge",
              icon: <FaTrophy />,
              description: "Reached Knight rank"
            },
            {
              name: "100 Problems Badge",
              icon: <FaAward />,
              description: "Solved 100+ problems"
            }
          ]);

          // Mock recent activities data
          const mockActivities = [
            { date: "2024-03-15", title: "Solved Two Sum", difficulty: "Easy", icon: <FaCode /> },
            { date: "2024-03-14", title: "Solved Add Two Numbers", difficulty: "Medium", icon: <FaCode /> },
            { date: "2024-03-13", title: "Solved Longest Substring Without Repeating Characters", difficulty: "Medium", icon: <FaCode /> },
            { date: "2024-03-12", title: "Solved Median of Two Sorted Arrays", difficulty: "Hard", icon: <FaCode /> },
            { date: "2024-03-11", title: "Solved Container With Most Water", difficulty: "Medium", icon: <FaCode /> }
          ];
          setRecentActivities(mockActivities);
        } else {
          throw new Error(data.message || 'Failed to fetch LeetCode stats');
        }
      } catch (err) {
        setError(err.message || 'Failed to load LeetCode stats. Please try again later.');
        console.error('Error fetching LeetCode stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeetCodeStats();
  }, []);

  if (loading) {
    return (
      <motion.div 
        className="leetcode-stats" 
        data-aos="fade-up"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="stats-header">
          <SiLeetcode className="leetcode-icon" />
          <h3>Loading LeetCode Stats...</h3>
        </div>
        <div className="loading-spinner"></div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="leetcode-stats error" 
        data-aos="fade-up"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="stats-header">
          <SiLeetcode className="leetcode-icon" />
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
      className="leetcode-stats" 
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
        <SiLeetcode className="leetcode-icon" />
        <h3>LeetCode Stats</h3>
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
          <h4>Total Solved</h4>
          <p className="stat-value">{stats.totalSolved}</p>
        </motion.div>
        <motion.div 
          className="stat-card"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <h4>Easy</h4>
          <p className="stat-value">{stats.easySolved}</p>
        </motion.div>
        <motion.div 
          className="stat-card"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <h4>Medium</h4>
          <p className="stat-value">{stats.mediumSolved}</p>
        </motion.div>
        <motion.div 
          className="stat-card"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <h4>Hard</h4>
          <p className="stat-value">{stats.hardSolved}</p>
        </motion.div>
        <motion.div 
          className="stat-card"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <h4>Acceptance Rate</h4>
          <p className="stat-value">{stats.acceptanceRate}%</p>
        </motion.div>
        <motion.div 
          className="stat-card"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <h4>Ranking</h4>
          <p className="stat-value">#{stats.ranking}</p>
        </motion.div>
      </motion.div>

      <motion.div 
        className="recent-activities"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h4>Recent Activities</h4>
        <div className="activities-grid">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={index}
              className={`activity-card ${activity.difficulty.toLowerCase()}`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="activity-icon">{activity.icon}</div>
              <div className="activity-content">
                <h5>{activity.title}</h5>
                <div className="activity-meta">
                  <span className="activity-date">{activity.date}</span>
                  <span className={`activity-difficulty ${activity.difficulty.toLowerCase()}`}>
                    {activity.difficulty}
                  </span>
                </div>
              </div>
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
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LeetCodeStats; 