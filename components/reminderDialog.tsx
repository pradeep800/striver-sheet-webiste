"use client";
import { questionInfoForDay } from "@/app/(general)/sheet/[day]/page";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { solved } from "@/types/general";
import React, {
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { reminderDialogSchema } from "@/server-action/zodType/reminderDialogsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "./ui/switch";
import { toast } from "./ui/use-toast";
import Loading from "./svg/loading";
import { saveQuestionInfo } from "@/server-action/saveQuestionInfo";
import { useRouter } from "next/navigation";
import { getMinMaxReminderTime } from "@/lib/dateTimeFun";
type Props = {
  setReminderClicked: React.Dispatch<SetStateAction<boolean>>;
  reminderClicked: boolean;
  questionInfo: questionInfoForDay;
};

const { maxDate, minDate } = getMinMaxReminderTime();
minDate.setHours(minDate.getHours() + 5, minDate.getMinutes() + 30);
maxDate.setHours(maxDate.getHours() + 5, maxDate.getMinutes() + 30);
console.log(minDate);
export default function ReminderDialog({
  questionInfo,
  reminderClicked,
  setReminderClicked,
}: Props) {
  const router = useRouter();
  const form = useForm<z.infer<typeof reminderDialogSchema>>({
    resolver: zodResolver(reminderDialogSchema),
    defaultValues: { dueDate: minDate, shouldSendMail: true },
  });
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function onSubmit(data: z.infer<typeof reminderDialogSchema>) {
    console.log(data.dueDate.toISOString());
    setLoading(true);
    try {
      await saveQuestionInfo({
        name: questionInfo.questionTitle,
        questionNumber: questionInfo.questionNumber,
        questionDay: questionInfo.questionDay,
        solved: "REMINDER",
        reminderData: data,
      });

      setReminderClicked(false);
      startTransition(() => {
        router.refresh();
      });

      toast({
        title: "Reminder is created",
      });
    } catch (err) {
      toast({
        title: "Unable to create this reminder",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <AlertDialog open={reminderClicked}>
      <AlertDialogContent className="w-[350px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Select Reminder Options
          </AlertDialogTitle>
          <div className="flex justify-center">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => {
                    return (
                      <FormItem className="">
                        <FormLabel className="w-[100%] flex justify-center">
                          Select Reminder Date
                        </FormLabel>
                        <FormControl>
                          <Calendar
                            className="border-2 border-solid  "
                            mode="single"
                            selected={field.value}
                            onSelect={(e) => {
                              const date = new Date(e?.valueOf() ?? minDate);
                              field.onChange(date);
                            }}
                            disabled={(date) => {
                              return minDate > date || maxDate <= date;
                            }}
                            initialFocus
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="shouldSendMail"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex gap-3  flex-col items-center justify-center my-2">
                        <FormLabel className="">Send Email Reminder</FormLabel>
                        <FormControl>
                          <Switch
                            className=""
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            aria-readonly
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <div className="flex justify-between w-[100%] mt-3">
                  <AlertDialogCancel
                    className="dark:text-white"
                    disabled={loading}
                    onClick={() => {
                      setReminderClicked(false);
                    }}
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-500 hover:bg-red-400 dark:text-white"
                    disabled={loading}
                    type="submit"
                  >
                    {(loading || isPending) && <Loading />}{" "}
                    <p className="mx-2">Save</p>
                  </AlertDialogAction>
                </div>
              </form>
            </Form>
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
