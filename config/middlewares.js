module.exports = [
  "strapi::errors",
  {
    name: "strapi::cors",
    config: {
      enabled: true, // Ensure it's enabled
      origin: "*",
      headers: ["Content-Type", "Authorization"],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    },
  },
  "strapi::security",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
