const fs = require("fs");
const path = require("path");

// Define headers content
// const headersContent = `
// /*
//   X-Frame-Options: DENY
//   Permissions-Policy: geolocation=(), microphone=()
//   Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.discoveryhotels-resorts.com/; style-src 'self' 'unsafe-inline' https://www.discoveryhotels-resorts.com/; img-src 'self' data:; connect-src 'self' https://discoverysuites.haspcms.net; font-src 'self' https://fonts.gstatic.com; object-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests;
//   Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
//   X-Robots-Tag:
//   Cache-Control: public, max-age=31536000, immutable
//   Expires: ${new Date(Date.now() + 31536000000).toUTCString()}
//   Content-Security-Policy: script-src-attr 'self' 'unsafe-inline'; style-src-attr 'self' 'unsafe-inline'; frame-ancestors 'self'
//   Referrer-Policy: strict-origin-when-cross-origin
//   Permissions-Policy: geolocation=self
//   X-XSS-Protection: 1; mode=block
//   X-Content-Type-Options: nosniff
// `;

const headersContent = `
/*
  Content-Encoding: gzip
  
  `;

// Define the output directory (e.g., ".next" or "out")
const outputDir = path.join(__dirname, "../../out");

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write the headers file
const headersFilePath = path.join(outputDir, "_headers");
fs.writeFileSync(headersFilePath, headersContent.trim());

console.log(`_headers file created at ${headersFilePath}`);
