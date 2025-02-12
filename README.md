
AUTO REFERRAL SCRIPT - INSTRUCTIONS

This script automates the referral process for the DePINed website. Follow the steps below to set up and use the script.

----------------------------------------------------
STEP 1: REQUIREMENTS
----------------------------------------------------
- Node.js installed on your system.
- A working internet connection.
- Permissions to use the website's API.

----------------------------------------------------
STEP 2: FILES INCLUDED IN THE ZIP
----------------------------------------------------
- `autoRegister.js`: Main script for automating referrals.
- `utils/helper.mjs`: Utility functions used by the script.
- `utils/api.mjs`: Handles API communication with the website.
- `utils/logger.mjs`: Logs events and errors during execution.
- `utils/banner.mjs`: Displays a welcome banner on script start.
- `tokens.txt`: Stores user tokens (leave blank initially).

----------------------------------------------------
STEP 3: INSTALLATION
----------------------------------------------------
1. Extract the ZIP file into a folder.
2. Open a terminal or command prompt and navigate to the folder.

----------------------------------------------------
STEP 4: INSTALL DEPENDENCIES
----------------------------------------------------
Run the following command to install required modules:
```
npm install
```

----------------------------------------------------
STEP 5: RUN THE SCRIPT
----------------------------------------------------
Use the following command to start the script:
```
node autoRegister.js
```

----------------------------------------------------
STEP 6: INPUT FILES
----------------------------------------------------
- `tokens.txt`: Ensure this file is updated with tokens, one per line.
- No tokens? The script will exit gracefully.

----------------------------------------------------
STEP 7: LOGS
----------------------------------------------------
- All events and errors are logged to the console for easy debugging.

----------------------------------------------------
DISCLAIMER
----------------------------------------------------
- Ensure you have permission to use the website's API.
- Misuse of this script is not encouraged. Use responsibly.

Happy automating!
