"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";

const SummaryPanel = ({ data }) => {
  const groupedBySentiment = data.reduce((acc, feedback: Record<string, string>) => {
    const sentiment = feedback["Sentiment Summary"].toLowerCase() === 'negative' ? "Negative" : "Positive/Neutral";
    const priority = feedback["Priority"];
    const followUp = feedback["Follow-up Required"];

    if (!acc[sentiment]) {
      acc[sentiment] = {
        high: 0,
        medium: 0,
        low: 0,
        followUpRequired: 0,
        count: 0,
      };
    }
    acc[sentiment].count += 1;
    if (priority === "High") acc[sentiment].high += 1;
    if (priority === "Medium") acc[sentiment].medium += 1;
    if (priority === "Low") acc[sentiment].low += 1;
    if (followUp === "Yes") acc[sentiment].followUpRequired += 1;

    return acc;
  }, {});

  return (
    <div className={styles.summaryPanel}>
      {Object.entries(groupedBySentiment).map(([sentiment, counts]: any) => (
        <div key={sentiment} className={styles.card}>
          <h2 className={`${styles.cardTitle} ${sentiment === 'Negative' ? styles.high : styles.low}`}>{sentiment}:&nbsp;{counts.count}</h2>
          <p className={styles.cardItem}><strong>High Priority:</strong> {counts.high}</p>
          <p className={styles.cardItem}><strong>Medium Priority:</strong> {counts.medium}</p>
          <p className={styles.cardItem}><strong>Low Priority:</strong> {counts.low}</p>
          <p className={styles.cardItem}><strong>Follow-up Required:</strong> {counts.followUpRequired}</p>
        </div>
      ))}
    </div>
  );
};

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
        {!!feedbackSummary && <div className={styles.summary}><SummaryPanel data={feedbackList} /><div dangerouslySetInnerHTML={{ __html: feedbackSummary }} /></div>}
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
