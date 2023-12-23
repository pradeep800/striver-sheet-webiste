import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function VerifyRequest() {
  return (
    <div className="fixed  left-[50%] top-[50%]  translate-x-[-50%]  translate-y-[-50%] p-1 w-full ">
      <Card className=" xs:w-[400px] w-[95%] mx-auto  ">
        <CardHeader>
          <CardTitle>Check Your Email</CardTitle>
        </CardHeader>
        <div className="px-6 pb-6">
          <CardDescription>
            A magic link have been send to your email Click on Verify Your Email
          </CardDescription>
        </div>
      </Card>
    </div>
  );
}
