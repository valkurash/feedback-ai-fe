# OpenAI Feedback system FE


# Build and publish to AWS Container Registry

1) Auth to container registry

2) Add .env file to root of project

3) docker build -t feedback-ai-fe .

4) docker tag feedback-ai-fe:latest 557690615342.dkr.ecr.us-east-1.amazonaws.com/feedback-ai-fe:latest

5) docker push 557690615342.dkr.ecr.us-east-1.amazonaws.com/feedback-ai-fe:latest