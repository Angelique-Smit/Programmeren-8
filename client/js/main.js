const url = "http://localhost:8000/email";
const urlElevenlabs = 'https://api.elevenlabs.io/v1/text-to-speech/{voice_id}';
const button = document.querySelector('button');
let buttonDisabled = false;
const email = document.getElementById('email');
const human_prompt = document.getElementById('prompt');
const responseToPage = document.getElementById("response");

document.querySelector('form').addEventListener('submit', async function(event) { 
    event.preventDefault();
    if (buttonDisabled === false) {
        buttonDisabled = true;
        button.innerHTML = "Awaiting Dave's response";
        try {
            // Get the email value from the input field
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "email": email.value,
                    "prompt": human_prompt.value,
                }),
            });

            console.log('Email successfully sent in!');
            const data = await response.json();
            const ai = data.ai;

            let newResponse = document.createElement('div');
            let newPromptTitle = document.createElement('h3');
            let newPrompt = document.createElement('p');
            let humanNewMessageTitle = document.createElement('h3');
            let humanNewMessage = document.createElement('p');
            let aiNewMessageTitle = document.createElement('h3');
            let aiNewMessage = document.createElement('p');

            newPromptTitle.innerHTML = "Given Prompt:";
            newPrompt.innerHTML = human_prompt.value;
            humanNewMessageTitle.innerHTML = "You:";
            humanNewMessage.innerHTML = email.value;
            aiNewMessageTitle.innerHTML = "Dave's response:";
            aiNewMessage.innerHTML = ai;

            newResponse.appendChild(newPromptTitle);
            newResponse.appendChild(newPrompt);

            newResponse.appendChild(humanNewMessageTitle);
            newResponse.appendChild(humanNewMessage);

            newResponse.appendChild(aiNewMessageTitle);
            newResponse.appendChild(aiNewMessage);

            responseToPage.appendChild(newResponse);

            // Update button after response is processed
            buttonDisabled = false;
            button.innerHTML = 'Ask for Response';
            
        } catch (error) {
            console.error('Error posting email:', error);
            // Ensure button is updated even in case of an error
            buttonDisabled = false;
            button.innerHTML = 'Ask Dave to respond again!';
        }
    }
});


