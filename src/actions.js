import axios from "./axios";
import { initSocket } from "./socket";

export function onlineUsers(onlineUsers) {
  console.log("onlineUsers action fired:", onlineUsers);
  return {
    type: "ONLINEUSERS",
    onlineUsers
  };
}

export function userLeft(userLeft) {
  console.log("userleft action fired:", userLeft);
  return {
    type: "USERLEFT",
    userLeft
  };
}

export async function receiveFriendsRequests() {
  const { data } = await axios.get("/friendsRequests");
  return {
    type: "RECEIVE_FRIENDS_REQUEST",
    allFriends: data.data
  };
}

export async function acceptRequest(otherProfileId) {
  const { data } = await axios.post("/acceptFriendship/" + otherProfileId);
  return {
    type: "ACCEPT_REQUEST",
    otherProfileId
  };
}

export async function endFriendship(otherProfileId) {
  const { data } = await axios.post("/endFriendship/" + otherProfileId);
  return {
    type: "END_FRIENDSHIP",
    otherProfileId
  };
}

export function userJoined(userJoined) {
  console.log("userJoined action fired:", userJoined);
  return {
    type: "USERJOINED",
    userJoined
  };
}

export function showChat(allMessages) {
  // console.log("showChat action fired****:", allMessages);
  return {
    type: "SHOW_CHAT",
    allMessages
  };
}

export function uploadMessage(newMessage) {
  // console.log("uploadMessage action fired****:", newMessage);
  return {
    type: "UPLOAD_MESSAGE",
    newMessage
  };
}
