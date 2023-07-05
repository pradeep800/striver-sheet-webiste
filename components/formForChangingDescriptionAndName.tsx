"use client";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { ChangeProfile } from "@/server-action/changeProfile";
import { toast } from "./ui/use-toast";
import { useCallback, useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { debounce } from "@/lib/utils";
import { checkUserNameExists } from "@/server-action/checkUserNameExists";
type Props = {
  userName: string;
  description: string | null;
};

export const formSchema = z.object({
  userName: z
    .string()
    .regex(/^[a-zA-Z0-9]+$/, "Only character you can use is 0-9 a-z and A-Z")
    .min(3, { message: "Username must be at least 3 character" })
    .max(40, { message: "Username should not be more then 40 words" }),
  description: z
    .string()
    .max(200, { message: "Description should not be more then 200 words" }),
});

export default function UDFrom({ description, userName }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { userName, description: description ?? "" },
  });
  const [isPresentInDb, setIsPresentInDb] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstTime, setFirstTime] = useState(true);
  const checkName = useCallback(
    debounce(async (userName: string) => {
      if (!firstTime) {
        setIsPresentInDb(await checkUserNameExists({ userName }));
      } else {
        setFirstTime(false);
      }
    }, 300),
    [setIsPresentInDb, firstTime, setFirstTime]
  );

  useEffect(() => {
    checkName(form.watch("userName"));
  }, [form.watch("userName")]);
  async function onSubmit(value: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await ChangeProfile({
        description: value.description,
        userName: value.userName,
      });
      toast({ title: "Your Information Is updated" });
    } catch (err) {
      toast({
        title: "Unable To Update Your Information",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8  xs:w-[400px]  border p-4 mt-3 rounded"
      >
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="pradeep" {...field} />
              </FormControl>

              {isPresentInDb ? (
                <div className="text-sm text-red-800">
                  User name is already taken
                </div>
              ) : null}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="write your description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full disabled:bg-red-400 hover:bg-red-400 bg-red-500"
          disabled={loading || isPresentInDb}
        >
          {loading ? <Loader className="animate-spin" /> : "Save"}
        </Button>
      </form>
    </Form>
  );
}
