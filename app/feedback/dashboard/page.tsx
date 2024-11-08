"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";

const FunctionCalling = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getFeedbacks = async () => {
      const res = await fetch(`/api/assistants/feedback`, {
        method: "GET",
      });
      const data = await res.json();
      setFeedbackList(data);
      setIsLoading(false);
    };
    getFeedbacks();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.title}>Feedback Highlights</div>
      <div className={styles.container}>
        {isLoading ? (
          <div className="loading">Loading feedbacks...</div>
        ) : (
          feedbackList.map((feedback, index) => (
            <div
              key={index}
              className={`${styles.feedback} ${
                feedback["Follow-up Required"] === "Yes"
                  ? `${styles.highPriority}`
                  : `${styles.normalPriority}`
              }`}
            >
              <h3>{feedback["Feedback Theme"]}</h3>
              <p>
                <strong>Sentiment Summary:</strong>{" "}
                {feedback["Sentiment Summary"]}
              </p>
              <p>
                <strong>Detailed Feedback:</strong>{" "}
                {feedback["Detailed Feedback"]}
              </p>
              <p>
                <strong>Submission Date:</strong> {feedback["Submission Date"]}
              </p>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default FunctionCalling;
