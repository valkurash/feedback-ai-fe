import React from 'react';
import styles from "./evaluation.module.css";

const EvaluationWidget = ({ evaluation }) => {
    return (
      <div className={styles.widget}>
        {evaluation.pending ? (
          <div className={styles.skeleton}>
            <div className={styles.skeletonHeader}></div>
            <div className={styles.skeletonLine}></div>
            <div className={styles.skeletonLine}></div>
            <div className={styles.skeletonLine}></div>
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <span
                className={`${styles.priority} ${
                  styles[evaluation.Priority.toLowerCase()]
                }`}
              >
                {evaluation.Priority} Priority
              </span>
            </div>
            <div className={styles.content}>
              <h3>Key Concern</h3>
              <p className={styles.text}>{evaluation.KeyConcern}</p>
              <h3>Recommended Action</h3>
              <p className={styles.text}>{evaluation.RecommendedAction}</p>
            </div>
          </>
        )}
      </div>
    );
  };
  
  export default EvaluationWidget;
