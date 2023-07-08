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
} from "@react-email/components";
type Props = {
  questionsInfo: { title: string; day: number; questionNo: number }[];
};
export default function Email() {
  const questionInfo: Props["questionsInfo"] = [
    {
      title:
        "qustoin number one of striver sheet and some random things which i don't know about but you can know it if you want but whatever",
      day: 3,
      questionNo: 4,
    },
    { title: "question number 2 for striver sheet", day: 5, questionNo: 4 },
    { title: "question number 3 first question", day: 8, questionNo: 4 },
  ];
  return (
    <Tailwind>
      <Html>
        <Head />
        <Body className="bg-white">
          <Container className="">
            <Heading className="text-center text-red-500 dark">
              Today's Question Reminders
            </Heading>
            {questionInfo.map((question, i) => {
              return (
                <Section
                  key={i}
                  className="border-solid border-2 border-red-500 rounded-md m-1 font-sans p-2 shadow-lg"
                >
                  <Text className="text-lg font-semibold m-0">
                    {question.title}
                  </Text>
                  <Button
                    className="bg-red-500 hover:bg-red-400 p-2 rounded-md text-white mt-2"
                    href={`https://striversheet.pradeepbisht.com/sheet/day-${question.day}/${question.questionNo}`}
                  >
                    Check Question
                  </Button>
                </Section>
              );
            })}

            <Button className="text-blue-blue bg-red-500 p-2 rounded-md text-white">
              more...
            </Button>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}
