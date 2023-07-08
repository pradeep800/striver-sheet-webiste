import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function VerifyRequest() {
  return (
    <div className="fixed  left-[50%] top-[50%]  translate-x-[-50%]  translate-y-[-50%] p-1">
      <div className=" h-[100%] flex justify-center items-center mx-2  ">
        <Card className=" xs:w-[400px]  grow-[1] ">
          <CardHeader>
            <CardTitle>Check Your Email</CardTitle>
          </CardHeader>
          <div className="px-6 pb-6">
            <CardDescription>
              A magic link have been send to your email
            </CardDescription>
            <CardDescription>Click on Verify Your Email</CardDescription>
          </div>
        </Card>
      </div>
    </div>
  );
}
