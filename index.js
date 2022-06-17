import http from "http";
import express from "express";
import { config } from "dotenv";
import { io } from "socket.io-client";

config();
const app = express();
const server = http.createServer(app);

const { SOCKET_URL, PORT } = process.env;

const socket = io(SOCKET_URL, {
  path: "/bot",
});

(() => {
  socket.emit("initiateBot", "newUser");
  socket.on("loading", (val) => {
    console.log(val);
  });
  socket.on("create-account", (data) => {
    console.log({ createAccount: data });
  });

  socket.on("create-account-error", (data) => {
    console.log({ createAccountError: data });
  });

  socket.on("verify-otp", (data) => {
    console.log({ verifyOtp: data });
  });

  socket.on("verify-otp-error", (data) => {
    console.log({ verifyOtpError: data });
  });

  socket.on("create-pin", (data) => {
    console.log({ createPin: data });
  });
})();

app.get("/", (_req, res) => {
  res.status(200).send("Welcome to bot pseudo test");
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
