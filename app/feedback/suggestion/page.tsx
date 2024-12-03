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
          firstPrompt="We’re excited to hear your ideas! What’s something you think could make our workplace even better? Please share your suggestion and how you think it might help the team or the company."
        />
      </div>
      <EvaluationWidget evaluation={evaluation}/>
    </main>
  );
};

export default Home;
