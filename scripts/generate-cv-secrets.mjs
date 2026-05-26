import { randomBytes } from "node:crypto";

function generateSecret() {
  return randomBytes(48).toString("base64url");
}

const values = {
  CV_ACCESS_SECRET: generateSecret(),
  CV_ADMIN_TOKEN: generateSecret(),
};

console.log("# Copy these values into your production environment variables.");
console.log("# Do not commit the generated values to the repository.\n");

for (const [key, value] of Object.entries(values)) {
  console.log(`${key}=${value}`);
}
