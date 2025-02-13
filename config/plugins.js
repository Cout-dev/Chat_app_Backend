module.exports = ({ env }) => ({
    settings: {
      cors: {
        enabled: true,
        origin: ["http://localhost:5173"], 
      },
    },
  });
  