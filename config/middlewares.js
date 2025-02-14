module.exports = [
  "strapi::errors",  // 🔥 Add this at the top
  {
    name: "strapi::cors",
    config: {
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
