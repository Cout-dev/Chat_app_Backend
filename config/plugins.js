module.exports = ({ env }) => ({
    settings: {
      cors: {
        enabled: true,
        origin: ["http://localhost:5173", "https://your-frontend-domain.com"], 
      },
    },
  });
  