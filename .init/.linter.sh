#!/bin/bash
cd /home/kavia/workspace/code-generation/study-notes-quiz-generator-209833-209843/quiz_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

