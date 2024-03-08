# Dave-The-Secretary
 Dave will respond to an email with the give prompt. Dave the secretary is a web service powered by Azure and OpenAI that responds to emails by using a given prompt. This README explains how to get Dave ready for personal use.

 # Installation guide
 You will first need to run the following commands in order for Dave to work propperly:

 -Download NodeJS (version 20 or above)
 
  If you have NodeJS > v.20.0.0 downloaded, proceed with the following steps:

  # Downloading Node Modules
    -Open your terminal in your code editor and run the command: "cd server" to open the server directory.
     
     Run the following npm installs:
      -npm install express
      -npm install langchain
      -npm install @langchain/openai
      -npm install @anthropic-ai/sdk

  # Creating an .env file and Azure openai/Anthropics key
      In the server directory, there will be and env-example text file with the needed information to connect to Azure. Visit the Azure website to get the needed info and an api key. This guide assumes you have the needed information at hand. The same goes for the Anthropics api key.
      
      # Creating an .env file
        - Open the server directory and create a new file called ".env"
        - Take the information from the env-example file and copy paste this into the .env file and fill out the information accordingly.
        - Add a port you want to application to use (the supplied code assumes you are using localhost:8000) so if another port is used, please make sure to change the url in the client side. This can be found in client/js/main.js in the "url" variable.

# Running the application
 To run the application, simply use cd server to get into the server directory and run the following command:
  -npm run dev

This should run the backend of the server. The front can be opened with the VS-code extension "liveserver" found in the extensions list in VS-code.

# Known issues
 When running the command npm run dev on the server side, there is a chance the terminal glitches out and buffers trying to start up the backend server. This is most likely due to the --watch server.js command in the package.json file inside the server directory. This is an experimental feature and can be removed if nessecary.
      
      
       
