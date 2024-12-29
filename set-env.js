const fs = require("fs");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Build the Angular environment.ts file content
const targetPath = "./src/environments/environment.development.ts";
const envConfigFile = `export const environment = {
  production: ${process.env.PRODUCTION || false},
  apiUrl: "${process.env.API_URL}",
};
`;

// Write the environment.ts file
fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Environment file generated at ${targetPath}`);
  }
});
