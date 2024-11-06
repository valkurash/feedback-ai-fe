"use client";

import React from "react";
import styles from "./page.module.css"; // use simple styles for demonstration purposes
import Chat from "../../components/chat";

const Home = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Chat firstPrompt="Thank you for sharing your thoughts! Could you tell me a bit about your experience? Feel free to share what’s going well, any challenges you’re facing, or areas where we could improve."/>
      </div>
    </main>
  );
};

export default Home;
