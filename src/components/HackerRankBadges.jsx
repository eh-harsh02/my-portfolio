import { useEffect, useState } from 'react';
import { SiHackerrank } from 'react-icons/si';
import { FaJava, FaPython, FaCode, FaTrophy } from 'react-icons/fa';

const HackerRankBadges = () => {
  const [badges, setBadges] = useState([
    {
      name: "4 Star in Java",
      icon: <FaJava />,
      description: "Achieved 4-star rating in Java programming",
      level: 4,
      link: "https://www.hackerrank.com/profile/eh_harsh02"
    },
    {
      name: "Problem Solving",
      icon: <FaCode />,
      description: "Strong problem-solving skills",
      level: 4,
      link: "https://www.hackerrank.com/certificates/iframe/5aa0b233900f"
    },
    {
      name: "Python",
      icon: <FaPython />,
      description: "Certified in Python programming",
      level: 3,
      link: "https://www.hackerrank.com/certificates/iframe/53df9d8c5b45"
    }
  ]);

  return (
    <div className="hackerrank-badges" data-aos="fade-up">
      <div className="badges-header">
        <SiHackerrank className="hackerrank-icon" />
        <h3>HackerRank Achievements</h3>
      </div>
      
      <div className="badges-grid">
        {badges.map((badge, index) => (
          <a 
            key={index} 
            href={badge.link}
            target="_blank"
            rel="noopener noreferrer"
            className="badge-card"
          >
            <div className="badge-icon">{badge.icon}</div>
            <div className="badge-content">
              <h4>{badge.name}</h4>
              <p>{badge.description}</p>
              <div className="badge-stars">
                {[...Array(5)].map((_, i) => (
                  <FaTrophy 
                    key={i} 
                    className={`star ${i < badge.level ? 'filled' : ''}`}
                  />
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default HackerRankBadges; 