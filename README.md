# Intelia Test 

This is a readme file detailing explainations on how this code and the tests can be built for production, run in development (watch mode) and tested automatically.

# Building for Production!
- Code
 To build the code for production, the following must must be put in place
  - Change the enviroment variable flag from "development" to "production". This is necessary in other to optimise the code for production. This optimization is achieved by turning of almost all development spefific features like logging and more. 
  - A process manager like  "PM2" or "forever" needs to be use to make the app run countiouosly in the event of crash. If a good process manager is not in place, the app would not restart in the event of crashed and one may need to manually restart it.
  - Deployment: To deploy this app, an easiest way is via Heroku CLI. Heroku makes it pretty easy to deploy nodeJS apps by 
  by getting the source files directly from the git repository and push on few commands.
#Run in development
- To run the code in development mode, "nodemon" should be used. This restarts the app on every code change/up.
 
# Automated Code Testing - Circle CI
- Code
 For test automation and deployment, a CI/CD is needed. Circle CI is recommended for simplicity and ease of use. Follow the guidelines below to set it up:
 1. Register using your GitHub account: https://circleci.com (if you haven't already)
 2. Click the "add project" + button from the left-hand side menu. Then select the project you want Circle-CI to test for you, and click the "Setup Project" button ans select "Linux" and "Node" as Operating system and language respectively"
 3. Next, follow the on-screen instructions to create a config.yml folder and setup your .circleci/config.yml file.
 4. Click on the "Copy To Clipboard" button to get the code. paste the sample code into the .circleci/config.yml file you have open in your text editor. Save this file and commit to repo
 5. Once you have created the .circleci/config.yml, scroll down the page and click on "Start building". You would be redirected to a build progress/status page that tells if the code passes defined tests or not

# Automated Code Deployment - Circle CI
- Code
 For automated deployment, continue with the following steps: This steps explain deployment to a DigitalOcean Instance using Dokku (which is an Open Source Heroku "clone")
 - Add RSA Key
   In order to deploy the app via SSH, we need to add the SSH (RSA) key to CircleCI. Thankfully this is a lot easier thank on Travis-CI!
   In your app's Settings page,  
   - Scroll down to the "Permissions" section.
   - Click on SSH Permissions
   - Click on the Add SSH Key button and paste your server's SSH key. This gives CicleCI access to the server.
 - Create a /bin directory in your project and Copy the deployement scripts from: https://github.com/nelsonic/circleci-hello-world-nodejs/tree/master/bin into it
 - Add any Environment Variables you need to your .circleci/config.yml file. The IP Address of the server is required as is the DOKKU_APP name.
 - Working example can be found here: https://github.com/nelsonic/circleci-hello-world-nodejs/blob/ecfab4a49141da87f36519e50ecda593f01aaf48/.circleci/config.yml#L8
 - Add Command to Run Deployment Script:

 run: ls -al /bin/sh && sudo rm /bin/sh && sudo ln -s /bin/bash /bin/sh && ls -al /bin/sh
  1. run: echo ${SERVER_IP_ADDRESS}
  2. run: echo -e "Host $SERVER_IP_ADDRESS\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config
  3. run: sh bin/deploy.sh
 - Check it Worked! You should see you app at the provided domain/sub-domain
 
 Check https://github.com/dwyl/learn-circleci should you get stuck
