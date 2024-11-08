"use client";

import React, { useEffect } from "react";
import styles from "./page.module.css";

const FunctionCalling = () => {
  useEffect(() => {
    const deleteFeedbacks = async () => {
      const res = await fetch(`/api/assistants/feedback`, {
        method: "DELETE",
      });
    };
    deleteFeedbacks();
  }, []);

  return (
    <main className={styles.main}>
      Feedback system is cleared!
    </main>
  );
};

export default FunctionCalling;
