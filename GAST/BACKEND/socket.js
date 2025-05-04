const socketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

const initializeSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("join", async ({ userId, userType }) => {
      try {
        const room = `${userType}:${userId}`;
        socket.join(room); // Join a room for easier messaging
        if (userType === "user") {
          await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
          console.log(
            `User ${userId} joined room ${room} with socket ${socket.id}`
          );
        } else if (userType === "captain") {
          await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
          console.log(
            `Captain ${userId} joined room ${room} with socket ${socket.id}`
          );
        }
      } catch (err) {
        console.error("Socket join error:", err.message);
        socket.emit("error", { message: "Failed to join" });
      }
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;
      if (
        !location ||
        typeof location.lat !== "number" ||
        typeof location.lng !== "number" ||
        location.lat < -90 ||
        location.lat > 90 ||
        location.lng < -180 ||
        location.lng > 180
      ) {
        return socket.emit("error", { message: "Invalid location data" });
      }

      try {
        await captainModel.findByIdAndUpdate(userId, {
          location: {
            lat: location.lat,
            lng: location.lng,
          },
        });
        console.log(`Captain ${userId} updated location:`, location);
      } catch (err) {
        console.error("Location update error:", err.message);
        socket.emit("error", { message: "Failed to update location" });
      }
    });

    socket.on("rideConfirmed", async (ride) => {
      try {
        // Find the user associated with the ride
        const user = await userModel.findById(ride.user);
        if (user && user.socketId) {
          io.to(user.socketId).emit("rideConfirmed", ride);
          console.log(`Ride confirmed sent to user ${ride.user}:`, ride);
        } else {
          console.warn(`User ${ride.user} not connected or no socketId`);
        }
      } catch (err) {
        console.error("Ride confirmed error:", err.message);
      }
    });

    socket.on("disconnect", async () => {
      console.log(`Client disconnected: ${socket.id}`);
      try {
        // Clear socketId from user or captain
        await userModel.updateOne(
          { socketId: socket.id },
          { $unset: { socketId: "" } }
        );
        await captainModel.updateOne(
          { socketId: socket.id },
          { $unset: { socketId: "" } }
        );
      } catch (err) {
        console.error("Disconnect cleanup error:", err.message);
      }
    });
  });
};

const sendMessageToSocketId = (socketId, messageObject) => {
  if (!io) {
    console.error("Socket.io server not initialized");
    return;
  }
  if (!socketId) {
    console.error("Invalid socketId:", socketId);
    return;
  }
  console.log(`Sending message to socket ${socketId}:`, messageObject);
  io.to(socketId).emit(messageObject.event, messageObject.data);
};

const sendMessageToRoom = (room, event, data) => {
  if (!io) {
    console.error("Socket.io server not initialized");
    return;
  }
  console.log(`Sending message to room ${room}:`, { event, data });
  io.to(room).emit(event, data);
};

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
  sendMessageToRoom,
};
