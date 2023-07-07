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
import React, {
  startTransition,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Loader, Router } from "lucide-react";
import { debounce } from "@/lib/utils";
import { checkUserNameExists } from "@/server-action/checkUserNameExists";
import { useRouter } from "next/navigation";
import { ChangeProfileType } from "@/server-action/zodType/changeProfileSchema";
type Props = {
  userName: string;
  description: string | null;
  setCopyUrl: React.Dispatch<boolean>;
  setProfileUrl: React.Dispatch<string>;
};

export const formSchema = ChangeProfileType;

export default function UDFrom({
  description,
  userName,
  setCopyUrl,
  setProfileUrl,
}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { userName, description: description ?? "" },
  });
  const router = useRouter();
  const [isPresentInDb, setIsPresentInDb] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [firstTime, setFirstTime] = useState(false);
  const checkName = useCallback(
    debounce(async (userName: string) => {
      setChecking(true);
      setIsPresentInDb(await checkUserNameExists({ userName }));
      setChecking(false);
    }, 300),
    [setIsPresentInDb]
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
      setProfileUrl(`https://dsa27.vercel.app/${value.userName}`);
      setCopyUrl(false);
      startTransition(() => {
        router.refresh();
      });
      toast({ title: "Your Information Is Updated" });
    } catch (err) {
      const error = err as Error;
      toast({
        title: error.message,
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
        className="space-y-8  xs:w-[400px]  border p-4 mt-3 mx-auto rounded"
      >
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>You can only use a-z 0-9 and -</FormDescription>
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
                <Textarea
                  className="min-h-[200px]"
                  placeholder="write your description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full disabled:bg-red-400 hover:bg-red-400 bg-red-500"
          disabled={loading || isPresentInDb || checking}
        >
          {loading ? <Loader className="animate-spin" /> : "Save"}
        </Button>
      </form>
    </Form>
  );
}
