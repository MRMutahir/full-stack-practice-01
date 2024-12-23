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
import React from "react";
import DatePicker from "./DatePicker";
import { PostsAction } from "@/app/actions/PostAction";
import { useActionState } from "react";

const AddPosts = () => {
  const [state, formAction] = useActionState(PostsAction, {
    status: 0,
    message: "",
    errors: {},
  });

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button>Add Post</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <form action={formAction}>
              <div className="">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title" // Add name attribute for server action
                  className="mt-2"
                  placeholder="Type clash title"
                />
              </div>
              <div className="mt-4">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description" // Add name attribute for server action
                  className="mt-2"
                />
              </div>
              <div className="mt-4">
                <Label htmlFor="date">Expire</Label>
                <br />
                <DatePicker name="expireDate" /> {/* Ensure DatePicker passes value */}
              </div>
              <div className="mt-4">
                <Button type="submit">Submit</Button>
              </div>
            </form>
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
