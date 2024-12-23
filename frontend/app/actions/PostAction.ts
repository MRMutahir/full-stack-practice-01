"use server";

import { POSTS_REGISTER } from "@/lib/APIsEndPoints";
import axios from "axios";

const PostsAction = async (prevState: any, formData: FormData) => {
    console.log('FormData', FormData)
    try {
        // const { data } = await axios.post(POSTS_REGISTER, {
        //     name: formData.get("name"),
        //     email: formData.get("email"),
        //     password: formData.get("password"),
        //     confirm_password: formData.get("confirm_password"),
        // });

    } catch (error) {
        console.log('error', error)
    }
};


export {
    PostsAction
}