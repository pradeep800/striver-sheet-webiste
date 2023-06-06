import striverSheetData from "@/static/striverSheet.json";

export default async function Home() {
  let parsedStriverSheetData;

  try {
    parsedStriverSheetData = JSON.parse(striverSheetData as string);
  } catch (error) {
    console.error("Error parsing striverSheetData:", error);
    parsedStriverSheetData = {}; // or any other appropriate fallback value
  }
  const keys = Object.keys(parsedStriverSheetData);
  console.log(keys);
  return <div></div>;
}
