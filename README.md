<img src="https://github.com/thegrimbee/horus/assets/54467946/7afc167c-70e9-476b-b91e-0ba8fa57a570" alt="alt text" width="200"/><br/>
# Horus <br/>

**Team ID:** 6004

**Team Members:** Gabriel Mario Antaputra, Le Tu Quoc Dat

**Level of Achievement:** Gemini 
<br/>

# Project details

This is the repository for the desktop application, Horus. Horus is an app that scans terms of services of apps for the user and highlights potentially harmful terms.

Our current available features:
1. Active Scanning, allows the user to scan a folder of the app of their choice to find the harmful terms and conditions of their chosen app
a. Choosing folder: Users can click the browse button and select one of their application folders (usually in Program Files or Program Files(x86) refer to app's user guide)
b. Scanning: Users can click the scan button and a loading bar will show the progress of the scan
c. Showing results: A new window of the app will be opened once the scanning is done
2. User Guide, the user can click the hyperlink in the user guide section to show a popup explaining how to locate the folders

Our tech stack will include:
1. Electron, to design the app itself including its UI and file watching system
2. Python, to handle the backend processing and the AI to analyse the TOS

Our progress can be seen here: https://github.com/users/thegrimbee/projects/1/<br/>
Our AI model will be trained based on this data: https://docs.google.com/spreadsheets/d/1r6mS8WzukVhHnVFOEGmQtwL2VmSqkGXQy1H2Al6IO2o/edit?usp=sharing

We are currently having difficulties packaging the python scripts together with electron, however it is still possible to package it, although scanning will give an error (since the python scripts cannot be accessed). To get the package, clone the main-in-review-with-ai branch (for more updated ai) or show-result (for more updated ui). Make sure node.js and python is installed. Then, run npm run make to package or npm start to simply run the app.

We are currently trying different approaches for our AI and analysing which one works best:
1. Training the pre-trained LegalBERT model
2. Training the TextBlob model
3. Using GPT API

Here is a diagram to show the structure of our app:
![image](https://github.com/thegrimbee/horus/assets/54467946/0810e789-3cfa-45d9-bfbf-f6e09fa2c926)

# Our Workflow
We work mostly independently by posting issues on github (usually features we havent built) and working on our branch. E.g. Dat was the one that built the show-result branch and made the results show up in a new window. I then, merged it with the scan branch which was the show-result's parent branch. We post the issues based on the 3 milestones, meaning that we have an expectation of which issues to fix by which milestone.




