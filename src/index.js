const WebSocket = require("ws");
const axios = require("axios");

const PORT = Number(process.env.PORT) || 8080; // Ensure PORT is a number
const wss = new WebSocket.Server({ port: PORT });

wss.on("connection", (ws) => {
  console.log("✅ Client Connected");

  ws.on("message", async (data) => {
    try {
      const messageData = JSON.parse(data.toString());
      console.log("📩 Received:", messageData);

      const token = messageData.token;
      if (!token) {
        throw new Error("❌ No authentication token provided.");
      }

      const formattedData = {
        data: {
          message: messageData.message,
          Timestamp: messageData.timestamp,
        },
      };

      // ✅ Update Backend URL for Render Deployment
      const response = await axios.post(
        "https://chat-application-backend-2yuj.onrender.com/api/chats",
        formattedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("✅ Message saved to Strapi:", response.data);

      ws.send(
        JSON.stringify({
          message: messageData.message,
          Timestamp: messageData.timestamp,
          status: "echoed",
        })
      );
    } catch (error) {
      console.error("❌ Error:", error.response?.data || error.message);
      ws.send(JSON.stringify({ error: "Failed to save message" }));
    }
  });

  ws.on("close", () => console.log("🔴 Client Disconnected"));
});

console.log(`🚀 WebSocket running on port ${PORT}`);
