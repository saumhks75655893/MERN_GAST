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

    // Corrected join event
    socket.on("join", async ({ userId, userType }) => {
      try {
        if (userType === "user") {
          await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
          console.log(`User ${userId} joined with socket ${socket.id} as User`);
        } else if (userType === "captain") {
          await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
          console.log(
            `Captain ${userId} joined with socket ${socket.id} as Captain`
          );
        }
      } catch (err) {
        console.error("Socket join error:", err.message);
      }
    });

    socket.on("update-location-captain",async (data) => {
      const { userId, location } = data;


      if(!location ||!location.lat ||!location.lng) 
        return socket.emit("error", {message: "Invalid location data"});
      await captainModel.findByIdAndUpdate(userId, { 
        location:{
          lat: location.lat,
          lng: location.lng
        }    
       });
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};

const sendMessageToSocketId = (socketId, messageObject) => {

  console.log(`Sending message to socket ${socketId}:`, messageObject);
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket.io server not initialized");
  }
};

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
