import Link from "next/link";

const data = {
  checkbox: "ques_5",
  problem: "Sort an array of 0’s 1’s 2’s",
  leetCode: "https://leetcode.com/problems/sort-colors/",
  videoSolution: "https://youtube.com/embed/tp8JIuCXBaU",
  codingNinja: "https://bit.ly/3tlM60B",
};
export default function Example() {
  return <Link href="/notes">notes</Link>;
}
