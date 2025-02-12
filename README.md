Auto Referral Script
Overview
This is an automated referral script for websites that allows you to generate and use referral codes automatically. It performs tasks such as registration, profile creation, and referral confirmation seamlessly.

Features:
Automates user registration with referral codes.
Creates user profiles with dynamic data.
Handles API requests efficiently.
Logs all operations for easy debugging and tracking.
Requirements
Before using this script, ensure the following:

Node.js (v18 or later)
npm or yarn for package management.
Proper API credentials (if required for specific endpoints).
Valid proxies (if using for multiple requests).
Installation
Clone this repository to your local machine:
bash
Copy
Edit
git clone https://github.com/your-username/auto-referral-script.git
cd auto-referral-script
Install dependencies:
bash
Copy
Edit
npm install
Add a .env file (if needed) for configuration. Example:
env
Copy
Edit
API_BASE_URL=https://api.depined.org
Usage
Prepare the tokens.txt file:

Add valid tokens (if required) to tokens.txt. Each token should be on a new line.
Run the script:

bash
Copy
Edit
node autoRegister.js
Logs and Progress:
All activity, such as registration and profile creation, is logged in the terminal.
Errors are also logged to help debug issues.
File Structure
plaintext
Copy
Edit
auto-referral-script/
├── utils/
│   ├── api.mjs         # Handles all API interactions.
│   ├── helper.mjs      # Helper functions for utilities like delays.
│   ├── logger.mjs      # Logging utilities for consistent logs.
│   ├── banner.mjs      # Displays a welcome banner.
├── tokens.txt          # Contains tokens for referral processing.
├── autoRegister.js     # Main script that orchestrates the automation.
├── package.json        # Node.js dependencies and metadata.
├── README.md           # Documentation (this file).
Notes
Dynamic User Data: The script generates random email addresses using a disposable email domain for seamless registration.
Customizable: Edit the utils/api.mjs file to configure API endpoints or modify request headers.
Error Handling: The script automatically retries or exits gracefully if it encounters issues like API errors or invalid referral codes.
Troubleshooting
Module Not Found Errors:

Ensure all .mjs files exist in the correct directories.
Run npm install to install dependencies.
API Errors (403/500):

Verify that your API credentials and referral codes are valid.
Check for rate limits on the API.
Proxy Issues:

If using proxies, ensure they are valid and active. Edit newAgent() in utils/helper.mjs for custom proxy logic.
License
This project is licensed under the MIT License.

