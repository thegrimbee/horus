<img src="https://github.com/thegrimbee/horus/assets/54467946/7afc167c-70e9-476b-b91e-0ba8fa57a570" alt="alt text" width="200"/><br/>
# Horus <br/>

**Team ID:** 6004

**Team Members:** Gabriel Mario Antaputra, Le Tu Quoc Dat

**Level of Achievement:** Gemini 

**Github link:** https://github.com/thegrimbee/horus/
<br/>

# Installation Guide
We are currently having difficulties packaging the python scripts together with electron, as such our .exe is not fully functional (the scanning will not work since the python scripts are not included in the executable)

If you want to install the one mentioned above, you can download the zip file in the drive link, then run the horus.exe in the horus-win32-x64 folder:
https://drive.google.com/file/d/1Hj9xKhbJZ9D3dMFqY7A42eBjlr87K9JG/view?usp=sharing

If you want the fully functional version there are a few steps:
1. Clone our github branch (either show-results for the version with the newer UI or main-in-review-with-ai for the version with the newer AI)
2. Ensure you have node.js and python installed
3. Run the command: npm start

# Motivation
Terms and services have been infamous for being very long winded and confusing to read. As such, people normally skip reading these terms and conditions. However, these terms and conditions may have terms which are harmful for the users. As such, an application is needed to summarise and highlight these harmful terms for the users.

User Stories:
1. As an average windows user, I do not want to read nor have the time to read long terms and conditions of apps I install
2. As an average windows user, I want to know if an application I use has harmful terms and conditions
3. As an average windows user, I want to know which apps are safe to use and which aren't
4. As a user of Horus, I don't want the app to take too long to scan the apps

# Features

### Our current available features:
1. Active Scanning, allows the user to scan the terms of services (TOS) of the app of their choice to find the harmful terms and conditions of their chosen app <br/>
The users can select which app they want to scan through the dropdown. The list provided is based on the apps in the user's Program Files and Program Files (x86) folder. Once selected, a recursive search will be run on the app's folder to find the TOS text files. This can be in many forms (e.g. tos.txt, license.rtf, etc.). The combined text will be processed by our AI model, and the results will be shown in three different levels: danger, warning, and normal (sorted in decreasing harm levels).
2. Online Scanning, searches TOS online when there is no TOS found locally <br/>
We noticed that although majority of apps store the TOS in the folders, some apps simply do not store the TOS locally. The online scanning feature does a google search on the app's TOS and uses the result as the TOS. The AI will then process just like in Active Scanning
3. Database <br/>
Although our application can function without a database, we decided to add a shared database to improve runtime for the users by saving TOS that are already scanned. We noticed that it takes quite a while for the AI to scan TOS, so this database improves the runtime for apps that have already been scanned by other users. For now, we are using csv and the database is hosted in google sheets. However, this might change in Milestone 3, since we plan to move most of the processing to a server instead of the user.
4. App Suggestion, suggests alternative apps which may be safer <br/>
Currently, it shows the list of apps from different categories that we deem are safer than the others. Originally we wanted to make another AI model for this feature, however we did not have time to do it as training one model took longer than we thought. 
5. User Guide, the user can click the hyperlink in the user guide section to show a popup explaining how to locate the folders <br/>

We removed passive scanning from our features as we realise that not only is it a breach of user privacy, its benefits do not justify the amount of resources it use.

### Future Possible Features:
1. Contextualised scanning, the scanning will give different results for the average user and an enterprise user. <br/>
Terms of services apply differently depending on the user's context, so contextualised scanning aims to increase the accuracy of the scans by adding the context of the user. We will do this by modifying our training data 
2. Moving the Processing to a Server <br/>
The aim of this is to make the app less heavy for the user. The downside of this is that the app must now have internet connection to run (before, only online scanning and updating database requires internet)

# Software Engineering Principles
We use K.I.S.S as our main software engineering design pattern. This is because we want to focus mainly on making sure the app is light and fast, so we avoid unnecessarily advanced technologies. For example, we use CSV instead of a more advanced database like SQL and MongoDB since CSV is lighter and faster (since we only have one table).

### Github
1. Issues <br\>
We use issues to highlight the problems that we need to fix or add in the app. We also use it to distribute work to each other. Whoever is more suited to do the issue can assign himself to the issue and work on it on a new branch
2. Branching <br\>
We use a new branch for every feature and will tell each other beforehand before merging two branches.

### Coding Standard
We don't use a single coding standard for all the languages, but we use the most preferred coding standard for each language
1. Python - snake_case
2. JS - camelCase

### Separation of Concerns
We try to maximise separating our program into their respective functionality. For example, the JS backend is split into many JS files named based on their respective functionality e.g. appSelection.js is in charge of handling the app selection.




### Tech Stack
1. Electron JS, to design the app itself including its UI and file watching system
2. Vite, the template used for Electron
3. Electron Forge, to specifiy how the app and installer is built 
4. Python, to handle the backend processing and the AI to analyse the TOS
5. MiniLM, the base model which we further trained upon


Here is a diagram to show the structure of our app:
![image](https://github.com/thegrimbee/horus/assets/54467946/0810e789-3cfa-45d9-bfbf-f6e09fa2c926)

Our progress can be seen here: https://github.com/users/thegrimbee/projects/1/<br/>

# AI Development
The base model of our AI is MiniLM, which is a pre-trained transformer which we further build upon
The development was mostly trial and error, the focus on getting harm level 2 (danger) as accurate as possible. 
Our AI model will be trained based on this data: https://docs.google.com/spreadsheets/d/1r6mS8WzukVhHnVFOEGmQtwL2VmSqkGXQy1H2Al6IO2o/edit?usp=sharing



# Our Workflow







