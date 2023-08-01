import { ImageResponse } from "next/server";

export const runtime = "edge";

const asap = fetch(
  new URL("../../../assets/fonts/asap.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(req: Request) {
  try {
    const urlSarchParams = new URL(req.url).searchParams;
    const name = urlSarchParams.get("name");
    const username = urlSarchParams.get("username");
    const image = urlSarchParams.get("image");
    const description = urlSarchParams.get("description");
    if (!username) {
      throw new Error("unable to create image");
    }

    const asapFont = await asap;
    return new ImageResponse(
      (
        <div
          tw="bg-[rgb(6,14,36)] h-full w-full flex flex-col  p-12 text-red-500  relative  justify-center items-center "
          style={{ fontFamily: "asap", fontWeight: "normal" }}
        >
          <div tw="flex flex-col justify-center items-center w-full h-full ">
            <div tw="flex w-full justify-center text-6xl pb-4">
              Striver Sheet
            </div>
            {image && (
              <div tw="w-full flex justify-center">
                <img
                  width={100}
                  height={100}
                  alt="user image"
                  src={image}
                  tw=" w-[100px] h-[100px] rounded-full border-2 border-red-500 "
                />
              </div>
            )}

            <div tw="flex w-full justify-center text-xl  text-red-300">{`@${username}`}</div>
            <div tw="w-full flex justify-center">
              {description && (
                <div tw="text-2xl flex w-[80%] justify-center text-center text-red-400">
                  {description}
                </div>
              )}
            </div>
          </div>

          <div tw="flex absolute bottom-4 text-red-300">
            Click On This Link To Check {name ?? username} Profile
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630, //action
        fonts: [
          {
            name: "asap",
            data: asapFont,
            weight: 400,
            style: "normal",
          },
        ],
      }
    );
  } catch (err) {
    return new Response("Failed to generate image", { status: 500 });
  }
}
