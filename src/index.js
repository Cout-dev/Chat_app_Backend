const WebSocket = require("ws");
const axios = require("axios");

// Use Render's assigned port or default to 8080
const port = Number(process.env.PORT) || 8080;
const wss = new WebSocket.Server({ port });


console.log(`🚀 WebSocket running on ws://localhost:${port}`);

wss.on("connection", (ws) => {
  console.log("✅ Client Connected");

  ws.on("message", async (data) => {
    try {
      const messageData = JSON.parse(data.toString());
      console.log("📩 Received:", messageData);

      const token = messageData.token;
      if (!token) {
        ws.send(JSON.stringify({ error: "❌ No authentication token provided." }));
        return;
      }

      // Save message to Strapi
      const formattedData = {
        data: {
          message: messageData.message,
          Timestamp: messageData.timestamp,
        },
      };

      const response = await axios.post(
        "https://chat-application-backend-2yuj.onrender.com/api/chats",
        formattedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("✅ Message saved to Strapi:", response.data);

      ws.send(
        JSON.stringify({
          message: messageData.message,
          Timestamp: messageData.timestamp,
          status: "saved",
        })
      );
    } catch (error) {
      console.error("❌ Error:", error.response?.data || error.message);
      ws.send(JSON.stringify({ error: "Failed to save message" }));
    }
  });

  ws.on("close", () => console.log("🔴 Client Disconnected"));
});
