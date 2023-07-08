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
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { reminderDialogSchema } from "@/server-action/zodType/reminderDialogsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { maxReminderRange, minReminderRange } from "@/static/maxReminderRange";
import { Switch } from "./ui/switch";
type Props = {
  setValue: (value: solved) => void;
  reminderClicked: boolean;
  question: questionInfoForDay;
  setReminderClicked: React.Dispatch<boolean>;
};

const currentDate = new Date();
const options = { timeZone: "Asia/Kolkata" };
currentDate.setHours(0, 0, 0, 0);
const indianDate = currentDate.toLocaleString("en-US", options);
const minDate = new Date(indianDate);
const maxDate = new Date(indianDate);
minDate.setDate(currentDate.getDate() + minReminderRange);
maxDate.setDate(currentDate.getDate() + maxReminderRange);

export default function ReminderDialog({
  setValue,
  question,
  reminderClicked,
  setReminderClicked,
}: Props) {
  const form = useForm<z.infer<typeof reminderDialogSchema>>({
    resolver: zodResolver(reminderDialogSchema),
    defaultValues: { dueDate: minDate, shouldSendMail: true },
  });
  async function onSubmit(data: z.infer<typeof reminderDialogSchema>) {}
  return (
    <AlertDialog open={reminderClicked} onOpenChange={(e) => {}}>
      <AlertDialogContent className="w-[350px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Select Reminder Options
          </AlertDialogTitle>
          <AlertDialogDescription className="flex justify-center">
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
                              const date = new Date(e?.valueOf() ?? new Date());
                              field.onChange(date);
                            }}
                            disabled={(date) => {
                              return minDate > date || maxDate < date;
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
                    onClick={() => {
                      setReminderClicked(false);
                    }}
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-500 hover:bg-red-400"
                    type="submit"
                  >
                    Save
                  </AlertDialogAction>
                </div>
              </form>
            </Form>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
