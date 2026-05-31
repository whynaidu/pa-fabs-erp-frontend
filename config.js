// Runtime API config for the deployed frontend.
// Set BASE to the deployed backend URL + "/api".
// For local dev against a backend on :3001, this file can be left as-is or the
// app falls back to http://localhost:3001/api when window.API_CONFIG is absent.
window.API_CONFIG = {
  // TODO: replaced with the live Render URL during deploy.
  BASE: "https://pa-fabs-erp-backend.onrender.com/api"
};
