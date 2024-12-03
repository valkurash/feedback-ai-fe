"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";

const FunctionCalling = () => {
  const [feedbackSummary, setFeedbackSummary] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getFeedbacks = async () => {
      const res = await fetch(`/api/assistants/feedback`, {
        method: "GET",
      });
      const data = await res.json();
      setFeedbackList(data.sortedFeedback);
      setFeedbackSummary(data.summary)
      setIsLoading(false);
    };
    getFeedbacks();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.title}>Feedback Highlights</div>
      <div className={styles.container}>
        {!!feedbackSummary && <div dangerouslySetInnerHTML={{ __html: feedbackSummary }} />}
        {isLoading ? (
          <div className="loading">Loading feedbacks...</div>
        ) : (
          feedbackList.map((feedback, index) => (
            <div
              key={index}
              className={`${styles.feedback} ${styles[feedback["Priority"]]}`}
            >
              {Object.entries(feedback).map(([k, v]) => <p><strong>{k}:&nbsp;</strong>{v as string}</p>)}
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default FunctionCalling;
