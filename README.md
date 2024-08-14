<img src="https://github.com/thegrimbee/horus/assets/54467946/7afc167c-70e9-476b-b91e-0ba8fa57a570" alt="alt text" width="200"/><br/>
# Horus <br/>

**Team ID:** 6004

**Team Members:** Gabriel Mario Antaputra, Le Tu Quoc Dat

**Level of Achievement:** Gemini -> Apollo

**Github link:** https://github.com/thegrimbee/horus/
<br/>

# Installation Guide
1. Download  and extract our installer in this link: https://drive.google.com/file/d/1Sgj32LJBqBGTHIAk54NjLxyrmrfvFf2O/view?usp=sharing
2. Run the installer
3. The shortcut should be made in the desktop

# Motivation
Terms and services have been infamous for being very long winded and confusing to read. As such, people normally skip reading these terms and conditions. However, these terms and conditions may have terms which are harmful for the users. As such, an application is needed to summarise and highlight these harmful terms for the users.
<br/>
<br/>
Let's take TikTok as an example, which is one of the most used mobile appplications. Its terms of service has 7398 words, meaning that the average person will take more than half an hour to finish reading it! Not only that, there are a lot of legal jargons and convoluted sentences which makes it even harder to read it. From the terms of service we found a potentially harmful section as seen below
![image](https://github.com/user-attachments/assets/bc97070e-8b15-4c6b-9956-04399fb6bd07)
![image](https://github.com/user-attachments/assets/313a2689-d772-4ead-abbc-4ac6f0005e3c)



User Stories:
1. As an average windows user, I do not want to read nor have the time to read long terms and conditions of apps I install
2. As an average windows user, I want to know if an application I use has harmful terms and conditions
3. As an average windows user, I want to know which apps are safe to use and which aren't
4. As a user of Horus, I don't want the app to take too long to scan the apps
5. As someone who don't know much about legal terms, I want to know what the technical legal terms mean

# Features

### Current Features:
1. Active Scanning, allows the user to scan the terms of services (TOS) of the app of their choice to find the harmful terms and conditions of their chosen app <br/><br/>
The users can select which app they want to scan through the dropdown. The list provided is based on the apps in the user's Program Files and Program Files (x86) folder. Once selected, a recursive search will be run on the app's folder to find the TOS text files. This can be in many forms (e.g. tos.txt, license.rtf, etc.). The combined text will be processed by our AI model, and the results will be shown in three different levels: danger, warning, and normal (sorted in decreasing harm levels).<br/><br/>
2. Online Scanning, searches TOS online when there is no TOS found locally <br/><br/>
We noticed that although majority of apps store the TOS in the folders, some apps simply do not store the TOS locally. The online scanning feature does a google search on the app's TOS and uses the result as the TOS. The AI will then process just like in Active Scanning<br/><br/>
3. Search bar, allows user to search apps that are already scanned / apps that are found locally <br/><br/>
The search bar will show suggested apps which come from a list of scanned apps combined with the apps found locally on the user's computer. <br/><br/>
4. Custom URL, scrapes TOS from the specific URL <br/><br/>
Our automatic google search may not work perfectly 100% of the time, so the custom url ensures that the tos is from the correct link<br/><br/>
5. Database <br/><br/>
Although our application can function without a database, we decided to add a shared database to improve runtime for the users by saving TOS that are already scanned. We noticed that it takes quite a while for the AI to scan TOS, so this database improves the runtime for apps that have already been scanned by other users. For now, we are using csv and the database is hosted in google sheets. However, this might change in the future as our database becomes more complex. <br/><br/>
6. TLDR, gives a tldr of the terms <br/><br/>
We realised that the terms may still be too long/confusing. Thus, we want to add a TLDR Feature which summarises and explains the terms in a simpler way.<br/><br/>
7. App Suggestion, suggests alternative apps which may be safer <br/><br/>
Currently, it shows the list of apps from different categories that we deem are safer than the others. Originally we wanted to make another AI model for this feature, however we did not have time to do it as training one model took longer than we thought.<br/><br/>
8. Term Definition, shows the definition of legal terms <br/><br/>
Users can hover their mouse on the highlighted words to see the definition. We added this feature as we also found difficulty understanding some words in TOS, so we thought such a feature would help users understand the TOS better.<br/><br/>
9. User Guide, the user can click the help button at the top of the screen to view the user guide <br/><br/>

We removed passive scanning from our features as we realise that not only is it a breach of user privacy, its benefits do not justify the amount of resources it use.

### Future Possible Features:
1. Contextualised scanning, the scanning will give different results for the average user and an enterprise user. <br/><br/>
Terms of services apply differently depending on the user's context, so contextualised scanning aims to increase the accuracy of the scans by adding the context of the user. We will do this by modifying our training data<br/>
2. Giving context to each sentence. <br/><br/>
Users will be able to click on each sentence on each level and the app will show the location of the sentence in the original tos. The purpose of this is to provide context of the sentence as sometimes the sentence may not make sense alone. This also covers the weakness of the AI model which is that it only takes sentence by sentence and thus may not be accurate when the context of the paragraph is needed. E.g. There might be a sentence "Continued use of the service signifies acceptance of the changed terms and services" which the model would mark as dangerous. However, there might be an extra following sentence of "We will notify you of the change in terms and services over a reasonable amount of time", making the term less dangerous.
3. Hashsum on database for checking of updated terms of services. <br/><br/>
Currently, our app will skip scanning process completely if the app has already been scanned before. However, sometimes app's terms of services may be updated. Thus, we plan to add a hashsum check for the terms of service to check whether there has been a change in terms of services.

# Software Engineering Principles
We use K.I.S.S as our main software engineering design pattern. This is because we want to focus mainly on making sure the app is light and fast, so we avoid unnecessarily advanced technologies. For example, we use CSV instead of a more advanced database like SQL and MongoDB since we found that CSV is much lighter and faster when there is only one table.

### Github
1. Issues <br/>
We use issues to highlight the problems that we need to fix or add in the app. We also use it to distribute work to each other. Whoever is more suited to do the issue can assign himself to the issue and work on it on a new branch<br/>
2. Branching <br/>
We use a new branch for every feature and will tell each other beforehand before merging two branches.<br/>
3. Reviewing <br/>
When mering branches that have conflicts, we cross review them before merging

### Coding Standard
We don't use a single coding standard for all the languages, but we use the most preferred coding standard for each language
1. Python - snake_case <br/>
   ![image](https://github.com/user-attachments/assets/d24955d7-3cef-46ca-9c22-940c97b4e7a0)

2. JS - camelCase <br/>
   ![image](https://github.com/user-attachments/assets/9608e6bc-f707-41bc-b2c5-788476e6e783)

3. Git branches - hyphens (e.g. git-branch)

### Security
We only expose the necessary functionalities to the js files. We do this using contextBridge

### Separation of Concerns
We try to maximise separating our program into their respective functionality. For example, the JS backend is split into many JS files named based on their respective functionality e.g. appSelection.js is in charge of handling the app selection.<br/>
![image](https://github.com/user-attachments/assets/6dc60e18-5595-48b8-a65c-036b67b315ec)<br/>

We also ensure that each process is split into its own function / class
![image](https://github.com/user-attachments/assets/2f8cf06b-5951-4ab8-bcad-f44d03bec048)
<br/>

### Proper commenting
We add useful comments to functions and steps 
![image](https://github.com/user-attachments/assets/2703c0b6-f971-478f-8b7c-9d18ca6602e6)

### User Testing
We allow other users' to test our apps' and gather their opinions for improvements. Some examples are:
1. Comments on the design of the app
2. Finding bugs
3. Comments on the features and their functionality

### Unit testing
We added unit tests for both our server and app functions.
![image](https://github.com/user-attachments/assets/7af5e30f-5b22-440c-85f6-f2bcb128002c)
![image](https://github.com/user-attachments/assets/d83af925-d722-473d-a87e-efa8593bebc4)

The images shown are not complete, to see further details go to:
1. Server: github.com/thegrimbee/horus-server/testing
2. App: github.com/thegrimbee/horus/pythonanywhere


# How does our app work?
### Tech Stack
1. Electron JS, to design the app itself including its UI and file watching system
2. Vite, the template used for Electron
3. Electron Forge, to specifiy how the app and installer is built 
4. Python, to handle the backend processing and the AI to analyse the TOS
5. MiniLM, the base model which we further trained upon
6. Pythonanywhere, the server we use
7. Flask, to run the server and handle fetch requests

### Structure of App
Here is a diagram to show the structure of our app:
![image](https://github.com/user-attachments/assets/e3c2e127-c2a5-476e-b6c8-8e1bb80e9be3)


### Server
We are using pythonanywhere to host our flask application to receive the app's fetch requests. We switched from Heroku due to several reasons:
1. Insufficient slug size in heroku (500 MB)
2. Insufficient computing power
3. Insufficient RAM (starting at 512 MB)<br/><br/>
However, even after switching, our server's resources are still very limited with only 3 GB RAM and only being able to handle 3 requests at the same time. This makes some requests very slow, especially if the TOS is very long (e.g. Facebook)

### Local scanning
Local scanning is the most simple process. 
1. Locate the user's program files and program files (x86) folder through the user's environment variables
2. Attach the app's folder location to the dropdown list element in the app selection search bar
3. When the user clicks the element and scan the app, perform a recursive search on the app's folder
4. Check each file if it has a special name (e.g. 'tos', 'license') and a text file type (e.g. '.txt', '.rtf')
5. We optimise this process with binary searching

### Online Scanning
Online scanning is simply a combination of google search and web scraping with selenium.
1. Perform a google search of the app's tos (i.e. 'app_name terms of service')
2. Get the first result
3. Use selenium to extract the 'div', 'p', and 'li' elements
4. Append the texts of those elements as a sentences array
5. Due to limited resources, we have limited steps 3 and 4 and thus may not include the whole tos

### Scanning process
The main process of our app
1. Check if the app is already scanned through the database
2. If not scanned, unpack the model using a custom unpickler
3. Pass the sentences array into the model and it will return an array of integers representing the harm levels of the respective sentences
4. Combine the sentences according to their harm levels
5. Summarise each level with another pretrained model (t5-base and t5-small)
6. Add the app to the database

### AI
Overview of the pipeline:
![image](https://github.com/user-attachments/assets/c7d0710b-7c09-483d-8b4d-62ecf5dafb53)
Here are some explanation of some of the decisions for the pipeline:

1. Using feature union <br/><br/>
Feature union allows us to modify the weights of our features easily. By turning each feature into a class and adding a weight property, we can multiply the weight to the resulting matrix of each feature.<br/>

2. Keywords <br/><br/>
Our keywords were obtained through our training data. We first collect the ngrams (up to 3) of the harmful and harmless terms and their respective frequency distributions. We then normalise those distributions and compare between the harmless and harmful. Our keywords are the ones with high ratios (e.g. royalty-free is found more in harmful than in harmless).<br/>
Each keywords have their respective weights based on their ratios and which ngram they are (higher n means higher weights)<br/>

3. MiniLM Sentence transformer<br/><br/>
Despite having multiple features to understand the sentence structure (POS tags, NER, Dependency, etc.), a full sentence transformer was still needed. We chose minilm as it was light while still having a decent performance.<br/>

4. Custom XGB classifier<br/><br/>
We chose XGB as our classifier since its loss function was modifiable. The reasom we needed a custom loss function was because we needed to modify the way penalties behave. For example, normally, the penalty for predicting a harm level of 2 when the true harm level is 0, would be the same as the penalty for predicting a harm level of 1 when the true harm level is 2. An example of our modified penalty is that predicting 0 when the true value is 2 is much higher than the other combinations.<br/>

### Training Data
At first we started our training data with our own examples of what constitutes as a harmless (harm level 0) and harmful terms (harm level 1 or 2). Then, we decided to take sentences from
the TOS of different apps such as 7-Zip. We noticed that there are also sentences in TOS which needs to be ignored, such as . So, we also added them into our training data to make the AI ignore them. Lastly, we also took out model's own results, fixed them, and refed them into the training data<br/><br/>

Our AI model wwere trained based on this data: https://docs.google.com/spreadsheets/d/1r6mS8WzukVhHnVFOEGmQtwL2VmSqkGXQy1H2Al6IO2o/edit?usp=sharing

### Results
Even with limited data, our AI performs very well, recognising certain patterns consistently (e.g. when the term mentions that there is no warranty in the app, the model consistently labels it with a harm level of 1).<br/><br/>
We also found that our model tends to under-predict. This means that the precision of the danger and warning terms are very high (i.e. the model only predicts high when it is sure of it). The reason for this may be due to the high penalties of over-predicting.<br/><br/>
Despite having much greater accuracy and precision, our model performs much much faster than previous models as the previous ones used two classifiers and were not optimised.


# Challenges
### Making the server work
There are countless reasons why the server was the most tough part of our app development. Here are some of them
1. Resource management <br/>
Nearly all servers have incredibly limited resources which are not suitable for AI processing. For example, our original server was supposed to be in heroku, but just deploying it was incredibly difficult since the slug size limit was 500 MB, while the modules necessary for AI were hundreds of MB (e.g. default torch exceeded the 500 MB limit). Not only that, the RAM and CPU was also not sufficient for processing the model. Even after switching to pythonanywhere, the workers kept dying when processing the model, so we needed to heavily optimise our processes and model. This was not easy as we also wanted to make sure our model had high accuracy and precision
2. Pricing <br/>
We didn't want to spend too much, which is why we chose heroku at first as our student developer pack covered the costs. We eventually switched to pythonanywhere which had really cheap costs for the first month of use
3. Differing behaviour <br/>
Pythonanywhere did not work the same as our local computers. Despite our code working perfectly when we set up a local flask server, we couldn't replicate the results in the actual server.
For example, at first we couldn't load the model as there were some importing issues. We ended up having to make our own custom unpickler to unpickle the model. Another example was the different operating system. Pythonanywhere uses Linux while our local computers uses Windows. This created some problems such as the drivers needed for Selenium. However, we realised that Linux had Firefox installed, allowing us to use that instead of our default MsEdge.
4. Slow testing <br/>
Because of the differing behaviours of local and pythonanywhere, we had to test some of the functions through pythonanywhere, which made testing much slower than if we did it locally

### AI Development
1. Finding the right classifier<br/>
Our model changed drastically each milestone, including the classifiers. In Milestone 2 we had the idea of combining RandomForest and GradientBoost which did increase our performance. However, we realised that was way too heavy for our servers. We also needed to customise the loss function of our classifier as we wanted to modify the penalty behaviours, which is why we ended up with XGBoost classifier
2. Testing time<br/>
AI training is very heavy and may thus take a while to run. This makes it slow to test our parameters.
3. Training data<br/>
This has always been a difficult process and the reason our app exists in the first place. Reading whole terms of services was incredibly tiring and the hardest part was the standardisation of harm levels between us two as we had different opinions for some of the terms.
4. Finding out new methods to improve the model<br/>
There were a lot of times when we did not know how to improve. A lot of those times we decided to try out completely new things. One example is the custom loss function. Another, is the realisation that it was better to extract the keywords based on our training data instead of making our own list.

### Bugs
It was difficult to locate bugs and a lot of the times we found them were through user testing. We would ask our friends to try out the app and they would sometimes find bugs that we couldn't find. One example is that the scan would run indefinitely if no app was inputted. Another is that the app gets permanently darker when the help button is clicked multiple times. As we realise the difficulty of finding the bugs, we decided to increase our testing of functions through better unit testing.
