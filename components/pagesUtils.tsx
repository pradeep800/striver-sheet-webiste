import {
  DaysAndItsQuestions as DayAndReminders,
  DbQuestionInfo,
} from "@/app/(general)/reminders/page";
import { getIndianTime } from "@/lib/dateTimeFun";
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
export function getQuestionDay(questionNumber: number) {
  return ssQuestions[questionNumber - 1].topicNo + 1;
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

type InnerJoinRemindersAndQuestions = (DbQuestionInfo & {
  remindersDueDate: Date;
})[];
type Key = string;
export function parseDaysAndReminders(
  JoinInfo: InnerJoinRemindersAndQuestions,
  oldInfo: DayAndReminders = []
): DayAndReminders {
  let newInfo: DayAndReminders = [];
  let oldDay: Key;
  let index = -1;
  JoinInfo.forEach((questionInfo) => {
    const { day, month, year } = getIndianTime(
      questionInfo.remindersDueDate.toISOString()
    );

    const newDay: Key = `${day}/${month}/${year}`;
    if (index === -1) {
      index++;
      oldDay = newDay;
      newInfo.push({
        [newDay]: [
          {
            questionDay: questionInfo.questionDay,
            questionNo: questionInfo.questionNo,
            mailSended: questionInfo.mailSended,
            shouldSendMail: questionInfo.shouldSendMail,
          },
        ],
      });
    } else if (oldDay === newDay) {
      newInfo[index][newDay].push({
        questionDay: questionInfo.questionDay,
        questionNo: questionInfo.questionNo,
        mailSended: questionInfo.mailSended,
        shouldSendMail: questionInfo.shouldSendMail,
      });
    } else {
      index++;
      oldDay = newDay;
      newInfo.push({
        [newDay]: [
          {
            questionDay: questionInfo.questionDay,
            questionNo: questionInfo.questionNo,
            mailSended: questionInfo.mailSended,
            shouldSendMail: questionInfo.shouldSendMail,
          },
        ],
      });
    }
  });

  if (oldInfo.length !== 0 && newInfo.length !== 0) {
    const oldInfoLastDay = oldInfo[oldInfo.length - 1];
    const oldLastDate = Object.keys(oldInfoLastDay)[0];

    const firstDateInfo = newInfo[0];
    const firstDate = Object.keys(firstDateInfo)[0];
    if (oldLastDate === firstDate) {
      oldInfoLastDay[oldLastDate].push(...firstDateInfo[firstDate]);
      newInfo.shift();
    }
  }

  oldInfo.push(...newInfo);
  return oldInfo;
}
export function sizeOfDaysAndReminders(dayAndReminder: DayAndReminders) {
  return dayAndReminder.reduce((size, reminders) => {
    const key = Object.keys(reminders)[0];

    size += reminders[key].length;

    return size;
  }, 0);
}
