<img src="https://github.com/thegrimbee/horus/assets/54467946/7afc167c-70e9-476b-b91e-0ba8fa57a570" alt="alt text" width="200"/><br/>
# Horus <br/>

**Team ID:** 6004

**Team Members:** Gabriel Mario Antaputra, Le Tu Quoc Dat

**Level of Achievement:** Gemini 

**Github link:** https://github.com/thegrimbee/horus/
<br/>

# Installation Guide
We are currently having difficulties packaging the python scripts together with electron, as such our .exe is not fully functional (the scanning will not work since the python scripts are not included in the executable)

If you want to install the one mentioned above, you can download the zip file in this link:
https://drive.google.com/file/d/1Hj9xKhbJZ9D3dMFqY7A42eBjlr87K9JG/view?usp=sharing

If you want the fully functional version there are a few steps:
1. Clone our github branch (either show-results for the version with the newer UI or main-in-review-with-ai for the version with the newer AI)
2. Ensure you have node.js and python installed
3. Run the command: npm start

# Project details

This is the repository for the desktop application, Horus. Horus is an app that scans terms of services of apps for the user and highlights potentially harmful terms.

Our current available features:
1. Active Scanning, allows the user to scan a folder of the app of their choice to find the harmful terms and conditions of their chosen app
a. Choosing folder: Users can click the browse button and select one of their application folders (usually in Program Files or Program Files(x86) refer to app's user guide)
b. Scanning: Users can click the scan button and a loading bar will show the progress of the scan
c. Showing results: A new window of the app will be opened once the scanning is done
2. User Guide, the user can click the hyperlink in the user guide section to show a popup explaining how to locate the folders

Future Possible Features:
1. Online scanning, allows the app to search for the app's terms of service online, since some apps may not store it locally
2. Improved active scanning, gives the users choices of apps instead of asking the users to find folders. This is because some users may still be confused on how to locate the app's folder
3. Passive scanning, allow the app to run in the background and notify the user of harmful terms of service when installing app
4. Database, improves efficiency by checking if the app have been scanned before (possibly by other users), thus removing the need to scan again. This is because, from what we have seen, the AI takes around half a second to process each sentence, which can build up to a very large scan time
5. Contextualised scanning, we realise that some users may want to use the app differently (e.g. a personal user, or an enterprise). This means, the terms and conditions also apply differently depending on the context. We want to modify our AI to take this into account
6. App Suggestion, suggests similar apps with safer terms and conditions to the users

Our tech stack includes:
1. Electron, to design the app itself including its UI and file watching system
2. Python, to handle the backend processing and the AI to analyse the TOS

Our progress can be seen here: https://github.com/users/thegrimbee/projects/1/<br/>
Our AI model will be trained based on this data: https://docs.google.com/spreadsheets/d/1r6mS8WzukVhHnVFOEGmQtwL2VmSqkGXQy1H2Al6IO2o/edit?usp=sharing

We are currently trying different approaches for our AI and analysing which one works best:
1. Training the pre-trained LegalBERT model
2. Training the TextBlob model
3. Using GPT API

Here is a diagram to show the structure of our app:
![image](https://github.com/thegrimbee/horus/assets/54467946/0810e789-3cfa-45d9-bfbf-f6e09fa2c926)

# Our Workflow
We work mostly independently by posting issues on github (usually features we havent built) and working on our branch. E.g. Dat was the one that built the show-result branch and made the results show up in a new window. I then merged it with the scan branch which was the show-result's parent branch. We post the issues based on the 3 milestones, meaning that we have an expectation of which issues to fix by which milestone.






