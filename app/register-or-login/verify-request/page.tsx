import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function VerifyRequest() {
  return (
    <div className=" h-[100%] flex justify-center items-center mx-2 ">
      <Card className="max-w-[400px] w-[400px]">
        <CardHeader>
          <CardTitle>Check Your Email</CardTitle>
        </CardHeader>
        <div className="px-6 pb-6">
          <CardDescription>
            A magic link been send to your email
          </CardDescription>
          <CardDescription>Click on Verify Your Email</CardDescription>
        </div>
      </Card>
    </div>
  );
}
