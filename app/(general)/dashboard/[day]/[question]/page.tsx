type Props = {
  params: { [key: string]: string };
};
export default async function QuestionPage({ params }: Props) {
  const { question } = params;
  const data = {
    checkbox: "ques_190",
    problem: "Maximum XOR of two numbers in an array",
    leetCode:
      "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
    videoSolution: "https://www.youtube.com/embed/AseUmwVNaoY%3E%3Cimg%20l",
    codingNinja: "https://bit.ly/3rjEYis",
  };
  return (
    <div className="max-w-[800px] mx-auto mt-3 ">
      <div className="max-w-[700px] aspect-video">
        <iframe
          className="w-[100%] h-[100%] "
          src={data.videoSolution}
          allowFullScreen={true}
        />
      </div>
    </div>
  );
}
