import { sendResponse } from "../Helpers/helper.js";
// Controller function for registering a post
const register = async (req, res, next) => {
    const body = req.body;
    console.log('body', body);
    sendResponse(res, 200, true, "SALAM", { data: "" });
};
// Export the controller
const postController = {
    register,
};
export { postController };
