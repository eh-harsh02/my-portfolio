import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { SiHackerrank } from 'react-icons/si'

type Badge = {
  name: string;
  level: string;
  icon: React.ReactElement;
}

const HackerRankBadges = () => {
  const [badges] = useState<Badge[]>([
    {
      name: "Problem Solving",
      level: "Gold",
      icon: <SiHackerrank />
    },
    {
      name: "Python",
      level: "Gold",
      icon: <SiHackerrank />
    },
    {
      name: "Java",
      level: "Silver",
      icon: <SiHackerrank />
    }
  ])

  return (
    <div className="hackerrank-badges">
      <h2>HackerRank Badges</h2>
      <div className="badges-grid">
        {badges.map((badge, index) => (
          <motion.div
            key={badge.name}
            className="badge-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="badge-icon">{badge.icon}</div>
            <h3>{badge.name}</h3>
            <p>{badge.level}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default HackerRankBadges 