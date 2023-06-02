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
import { Label } from "@radix-ui/react-label";
import { FormEvent } from "react";

export default function ContactPage() {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  return (
    <div className="pt-3 min-h-[80vh] flex justify-center items-center">
      <Card className="w-[700px]">
        <CardHeader>
          <CardTitle>Feedback And Feature Request</CardTitle>
          <CardDescription>
            {`If you want to give feedback, report bug or feature request you can
            send me those with this portal (use google drive links to send photo or video)`}
          </CardDescription>
          <CardContent>
            <form className="flex flex-col gap-2" onSubmit={onSubmit}>
              <Label htmlFor="type">Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent id="type">
                  <SelectItem value="Bug">Report Bug</SelectItem>
                  <SelectItem value="feedback">Feedback</SelectItem>
                  <SelectItem value="Feature">Feature Request</SelectItem>
                </SelectContent>
              </Select>
              <Label htmlFor="type-description">{`Description`}</Label>
              <Textarea id="type-description" />
              <Button className=" bg-red-500 hover:bg-red-400">Submit</Button>
            </form>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
