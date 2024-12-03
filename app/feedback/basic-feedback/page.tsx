"use client";

import React, { useState } from "react";
import styles from "./page.module.css"; // use simple styles for demonstration purposes
import Chat from "../../components/chat";
import EvaluationWidget from "../../components/evaluation";

const Home = () => {
  const [evaluation, setEvaluation] = useState({
    pending: false,
    Priority: "Low",
    KeyConcern: "-",
    RecommendedAction: "-",
  });
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Chat
          setEvaluation={setEvaluation}
          firstPrompt="Thank you for sharing your thoughts! Could you tell me a bit about your experience? Feel free to share what’s going well, any challenges you’re facing, or areas where we could improve."
        />
      </div>
      <EvaluationWidget evaluation={evaluation}/>
    </main>
  );
};

export default Home;
