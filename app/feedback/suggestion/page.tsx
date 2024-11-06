"use client";

import React from "react";
import styles from "./page.module.css"; // use simple styles for demonstration purposes
import Chat from "../../components/chat";

const Home = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Chat firstPrompt="We’re excited to hear your ideas! What’s something you think could make our workplace even better? Please share your suggestion and how you think it might help the team or the company."/>
      </div>
    </main>
  );
};

export default Home;
