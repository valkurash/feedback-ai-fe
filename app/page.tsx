"use client";

import React from "react";
import styles from "./page.module.css";

const Home = () => {
  const categories = {
    "Give Feedback": "basic-feedback",
    "Suggest an Improvement": "suggestion",
    "View Insights": "dashboard"
  };

  return (
    <main className={styles.main}>
      <div className={styles.title}>
        Help Us Improve Together
      </div>
      <div className={styles.container}>
        {Object.entries(categories).map(([name, url]) => (
          <a key={name} className={styles.category} href={`/feedback/${url}`}>
            {name}
          </a>
        ))}
      </div>
    </main>
  );
};

export default Home;
