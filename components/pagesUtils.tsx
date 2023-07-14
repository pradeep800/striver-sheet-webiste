import { ssCount, ssQuestions, ssTopics } from "@/static/striverSheet";

export function getDayFromParams(day: string) {
  const matches = day.match(/day-(\d+)/);
  if (!matches || !matches[1]) {
    throw Error("Unable to find topic Number");
  }
  const topicNumber = parseInt(matches[1]); //i am using 1 base indexing in urls
  if (isNaN(topicNumber) || topicNumber > 27) {
    throw Error("Unable To find the topic");
  }
  return topicNumber;
}
export function checkQuestionInfoIsCorrect(
  questionDay: number,
  questionNo: number
) {
  const questionRealInfo = ssQuestions[questionNo - 1];
  if (questionRealInfo.topicNo + 1 != questionDay) {
    throw new Error("Unable to find Question");
  }
}
export function checkQuestionNumberIsCorrect(questionNumber: number) {
  if (isNaN(questionNumber) || questionNumber > 191 || questionNumber <= 0) {
    throw Error("Unable to find question");
  }
}
export function getQuestionInfo(questionNumber: number) {
  return ssQuestions[questionNumber - 1];
}
export function getDayTitle(questionDay: number) {
  return ssTopics[questionDay - 1];
}
export function getNumberOfQuestionInTopic(day: number) {
  return ssCount[day - 1];
}
export function getCheckBoxToQuestionNumber(checkbox: string) {
  const questionNumberInString = checkbox.match(/ques_(\d+)/)?.[1];
  if (!questionNumberInString) {
    throw new Error("Unable to get questionNo from checkbox");
  }

  const questionNumber = parseInt(questionNumberInString);
  if (isNaN(questionNumber)) {
    throw Error("question string is not number");
  }
  return questionNumber;
}
