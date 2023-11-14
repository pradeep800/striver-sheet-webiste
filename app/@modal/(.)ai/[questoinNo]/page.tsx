import MainAiComponent from "@/components/Ai/mainAiComponent";

type pageProps = {
  params: Record<string, string>;
};
export default async function AiPage({ params }: pageProps) {
  return <MainAiComponent model />;
}
