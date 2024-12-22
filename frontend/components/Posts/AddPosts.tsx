"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import React from "react";

const AddPosts = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button>Add Post</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <form>
              <div className="">
                <Label htmlFor="title">Title</Label>
                <Input
                  className="mt-2"
                  placeholder="Type clash title"
                  //   value={clashData?.title ?? ""}
                />
              </div>
              <div className="">
                <Label htmlFor="description">Description</Label>
                <Textarea className="mt-2" />
              </div>
              <div className="">
                <Label htmlFor="date">Expire</Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
            </form>{" "}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>create post</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AddPosts;
