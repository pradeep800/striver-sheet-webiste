import QuestionLinks from "@/components/questionLinks";

import { ssQuestions } from "@/static/striverSheet";

type Props = {
  params: { [key: string]: string };
};
export default async function QuestionPage({ params }: Props) {
  const { question: questionIndex } = params;
  const questionIndexInNumber = parseInt(questionIndex);
  const question = ssQuestions[parseInt(questionIndex) - 1];
  if (questionIndexInNumber > 191 || isNaN(questionIndexInNumber)) {
    throw Error("Unable to find question");
  }

  return (
    <div className="max-w-[800px] mx-auto mt-3 flex items-center h-[80vh] ">
      <div className="w-[100%] ">
        <h1 className="text-2xl font-bold text-center text-red-500 mb-4">
          {question.problem}
        </h1>
        <div className="max-w-[700px] aspect-video">
          <iframe
            className="w-[100%] h-[100%] "
            src={question.videoSolution}
            allowFullScreen={true}
          />
        </div>
        <div className="flex gap-3 mt-3 w-[100%] justify-center">
          <QuestionLinks
            questionInfo={{
              codingNinja: question.codingNinja,
              leetCodeLink: question.leetCode,
              questionNumber: questionIndexInNumber,
              questionTitle: question.problem,
              solved: "UNATTEMPTED",
              youTubeLink: question?.videoSolution,
            }}
            onYoutube={false}
          />
        </div>
      </div>
    </div>
  );
}
