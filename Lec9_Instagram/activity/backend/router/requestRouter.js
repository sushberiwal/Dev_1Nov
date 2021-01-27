const express = require("express");
const { sendRequest, acceptRequest, cancelRequest, getPendingRequests, getAllFollowers, getAllFollowing, unfollow, getSuggestions } = require("../controller/requestController");

const requestRouter = express.Router();

//"/api/request"
requestRouter.route("").post(sendRequest).delete(cancelRequest);
requestRouter.route("/accept").patch(acceptRequest);
requestRouter.route("/:uid").get(getPendingRequests);
requestRouter.route("/followers/:uid").get(getAllFollowers);
requestRouter.route("/following/:uid").get(getAllFollowing);
requestRouter.route("/unfollow").delete(unfollow);
requestRouter.route("/suggestions/:uid").get(getSuggestions);


module.exports = requestRouter;

