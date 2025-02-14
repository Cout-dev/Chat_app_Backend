const WebSocket = require("ws");
const axios = require("axios");

// ✅ Use the correct WebSocket port
const wss = new WebSocket.Server({ port: Number(process.env.WS_PORT) || 8080 });

wss.on("connection", (ws) => {
  console.log("✅ WebSocket Client Connected");

  ws.on("message", async (data) => {
    try {
      const messageData = JSON.parse(data.toString());
      console.log("📩 Received:", messageData);

      const token = messageData.token;
      if (!token) {
        throw new Error("❌ No authentication token provided.");
      }

      // ✅ Send the message to Strapi API
      const formattedData = {
        data: {
          message: messageData.message,
          Timestamp: messageData.timestamp,
        },
      };

      // ✅ Ensure the correct API URL
      const response = await axios.post(
        `${process.env.STRAPI_URL || "http://localhost:1337"}/api/chats`,
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

console.log(`🚀 WebSocket running on ws://localhost:${process.env.WS_PORT || 8080}`);
