"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { feedBackSchema } from "@/server-action/zodType/feedbackSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendFeedback } from "@/server-action/sendFeedback";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import Loading from "@/components/svg/loading";
type formSchema = z.infer<typeof feedBackSchema>;
export default function ContactPage() {
  const form = useForm<formSchema>({
    resolver: zodResolver(feedBackSchema),
  });
  const [loading, setLoading] = useState(false);
  async function onSubmit(data: formSchema) {
    setLoading(true);
    try {
      const actionRes = await sendFeedback(data);

      if (actionRes?.error) {
        toast({ title: actionRes.error, variant: "destructive" });
      } else {
        toast({ title: "Your Query Is Submitted Successfully" });
        form.reset({ content: "", type: data.type });
      }
    } catch (err) {
      const error = err as Error;
      toast({ title: "server error", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="pt-3 min-h-[80vh] flex justify-center items-center">
      <Card className="w-[700px] ">
        <CardHeader>
          <CardTitle>Feedback And Feature Request</CardTitle>
          <CardDescription>
            {`If you want to give feedback, report bug or feature request you can
            send me those with this portal (use google drive links to send photo or video)`}
          </CardDescription>
          <CardContent className="-ml-6">
            <Form {...form}>
              <form
                className="flex flex-col gap-2"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  name="type"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(e) => {
                            const value = e.valueOf() as formSchema["type"];
                            field.onChange(value);
                          }}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent className="">
                            <SelectItem value="BUG">Report Bug</SelectItem>
                            <SelectItem value="FEEDBACK">Feedback</SelectItem>
                            <SelectItem value="REQUEST">
                              Feature Request
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="content"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-[150px]"
                          id="type-description"
                          {...field}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className=" bg-red-500 hover:bg-red-400 dark:text-white"
                >
                  {loading ? <Loading /> : "Submit"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
