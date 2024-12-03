# OpenAI Feedback system

## 1. System Design:
### Task:
The system automates the process of collecting, analyzing, prioritizing, and summarizing employee feedback within an organization to improve workplace conditions and address critical concerns.

### Agent Workflow:

**Agent 1: Feedback Collector (Creator Agent)**
This agent collects feedback from employees. It interacts with employees, prompting them to provide structured feedback on various aspects like job satisfaction, work-life balance, etc. It organizes the feedback and prepares it for the next stage.
Inputs: Employee feedback (via forms, messages).
Outputs: Organized feedback ready for analysis.

**Agent 2: Feedback Evaluator (Evaluator Agent)**
The Evaluator Agent processes the feedback collected by the creator, assigning priorities, summarizing key concerns, and recommending actions based on the severity of the feedback. This agent reviews the entire feedback history and evaluates each message's importance.
Inputs: Organized feedback from the Creator Agent.
Outputs: Priority level (High/Medium/Low), key concern summary, and recommended action.

**Agent 3: Trend Analyzer**
This agent evaluates the feedback over time, detecting recurring themes and patterns, and summarizes trends for HR or management to focus on. It analyzes feedback across different time periods and identifies the most pressing concerns based on trends.
Inputs: Feedback history (from multiple feedback sessions).
Outputs: Trend reports, identifying major areas needing attention (e.g., workload, communication issues, etc.).

### Information Flow:

Employee submits feedback → Creator Agent collects and organizes it.
Creator Agent passes feedback to the Evaluator Agent for prioritization.
Evaluator Agent outputs prioritized feedback to both the employee and HR.
Trend Analyzer continually analyzes feedback over time to identify long-term trends and patterns.
Results are shared with HR or management for action.

## 2. Agent Roles & Descriptions:
**Feedback Collector (Creator Agent):**
Collects feedback from employees, categorizes it into predefined themes (e.g., satisfaction, team dynamics, etc.), and passes it to the next agent for evaluation. The creator prompts employees for feedback and encourages constructive responses.

**Feedback Evaluator (Evaluator Agent):**
Reviews feedback and assigns priority levels based on urgency and severity. Summarizes key concerns and provides actionable recommendations. It evaluates feedback history, detects important concerns, and provides solutions or actions.

**Trend Analyzer:**
When a user navigates to the Dashboard page, this agent automatically analyzes the aggregated feedback, sorting it by criticality and identifying patterns or trends in employee concerns. It compares the feedback based on severity, frequency, and recurring themes, effectively identifying high-priority issues that may require immediate attention as well as emerging long-term trends. The agent generates a comprehensive summary for HR, highlighting both urgent concerns and systemic issues that may require strategic or long-term interventions. This proactive approach helps HR and management address widespread or recurring problems, improve workplace conditions, and implement data-driven changes effectively.

# 3. System Prompts:
**Creator Agent Prompt:**
 [Feedback Creator Assistant instruction](./feedback-collector.md)

**Evaluator Agent Prompt:**
[Feedback Evaluator Assistant instruction](./feedback-prioritization.md)

**Trend Analyzer Prompt:**
"You are a feedback analyzer. Based on the following feedback, assign a criticality score from 1 to 10, where 1 is least critical and 10 is most critical.
Consider both the importance of the issue and the urgency for resolution.

Feedback: 
```"${feedback}"```

Criticality score (1-10):"

...

"You are an HR analyst. Given the following feedback entries, generate a summary that will help HR teams identify and address employee concerns. Focus on the following:
  1. General sentiment of employees.
  2. Critical issues or concerns raised.
  3. Any action that HR should take, including follow-up or training needs.
  4. Recommendations for improving workplace satisfaction or resolving conflicts.
  
  Provide a concise overview for HR:
  
  Feedback Entries:
  ```${feedbackContents}```

Summarize and present as html code to display it in browser and to be useful for HR department for further actions"

---


# [DEV INFO] Build and publish to AWS Container Registry

1) Auth to container registry

2) Add .env file to root of project

3) docker build -t feedback-ai-fe .

4) docker tag feedback-ai-fe:latest 557690615342.dkr.ecr.us-east-1.amazonaws.com/feedback-ai-fe:latest

5) docker push 557690615342.dkr.ecr.us-east-1.amazonaws.com/feedback-ai-fe:latest