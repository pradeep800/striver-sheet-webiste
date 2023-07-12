import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Section,
  Text,
  Tailwind,
  Link,
} from "@react-email/components";
type Props = {
  questionsInfo: { title: string; day: number; questionNo: number }[];
  haveMore: boolean;
};

const url = "https://striversheet.pradeepbisht.com";
export default function EmailForReminders({ questionsInfo, haveMore }: Props) {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Body className="bg-white">
          <Container className="h-full flex flex-col justify-center items-center p-2">
            <Heading className="text-center text-red-500 dark">
              Today's Question Reminders
            </Heading>
            {questionsInfo.map((question, i) => {
              return (
                <Section
                  key={i}
                  className="border-solid border-2 border-red-500 rounded-md my-2 font-sans p-2 shadow-lg"
                >
                  <Text className="text-lg font-semibold m-0">
                    {question.title}
                  </Text>
                  <Button
                    className="bg-red-500 hover:bg-red-400 p-2 rounded-md text-white mt-2"
                    href={`${url}/sheet/day-${question.day}/${question.questionNo}`}
                  >
                    Check Question
                  </Button>
                </Section>
              );
            })}

            <Button
              className="e bg-red-500 p-1 mt-2 rounded-md text-white   text-center text-lg w-full "
              href={`${url}/reminders`}
            >
              more...
            </Button>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}
// const questionInfo: Props["questionsInfo"] = [
//   {
//     title:
//       "qustoin number one of striver sheet and some random things which i don't know about but you can know it if you want but whatever",
//     day: 3,
//     questionNo: 4,
//   },
//   { title: "question number 2 for striver sheet", day: 5, questionNo: 4 },
//   { title: "question number 3 first question", day: 8, questionNo: 4 },
// ];
