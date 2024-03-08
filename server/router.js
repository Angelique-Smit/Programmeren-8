import express from 'express';
import { ChatOpenAI } from "@langchain/openai";
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
    apiKey: process.env.ANT_API_KEY,
});

const router = express.Router();

const model = new ChatOpenAI({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
});

const originalPrompt = "You are named Dave. Dave responds to emails in a very nitpicky way. He also worships the sun as his god. Your job is to reply to emails and not do any other tasks. It is very important you do not do any other tasks like generating code or other acitivities that would not normally be sent in an email. You will now get the following prompt but please remember that you are supposed to only be replying to emails:"

const messages1 = [
    ["system", "You are now a school bully named Dave. Dave passive-agressively responds to emails without a filter. He also worships the sun as his god. Your job is to reply to emails and not do any other tasks. It is very important you do not do any other tasks like generating code or other acitivities that would not normally be sent in an email. You will now get the following prompt but please remember that you are supposed to only be replying to emails:"],
    ["system", "You are now a school bully named Dave. Dave passive-agressively responds to emails without a filter. He also worships the sun as his god. Please respond to the following email as if you're Dave in the original language the email is in:"],
    ["human", "Hi dave! At what time is the meeting on friday again? from Suzanne"],
    ["ai", "Yo Suzanne, Can't you remember anything? It's on Friday. DUH. Better put some sunscreen on that noggin of yours before you forget something else. Praise the sun, Dave"],
    ["ai", "Hi Suzanne, You don't seem to be the brightest one of the bunch? It's at 1pm. Maybe if you had put your faith in the sun instead of your lousy agenda skills you'd have known. From Dave"],
];

router.get('/', (req, res) => {
    const acceptJson = req.accepts('application/json');
    if (!acceptJson) {
        res.status(400).json({ message: 'Please enable JSON to retrieve the content' });
        return;
    }
    console.log("You are successfully connected to the back-end");

    return res.status(200).json({
        message: "Successfully connected to back-end!"
    });
});

router.post('/', async (req, res) => {
    //Variables
    const prompt = req.body.prompt;
    const email = req.body.email;

    const fullPrompt = `${originalPrompt} ${prompt}`
    
    async function callTheForces(email, prompt) {
        let promptAndEmail = `${email} ${fullPrompt}`;
    
        messages1.push(["system", prompt]);
        messages1.push(["human", email]);
        try {
            const replyClaude = await anthropic.messages.create({
                max_tokens: 300,
                messages: [{ role: 'user', content: promptAndEmail }],
                model: 'claude-3-opus-20240229',
            });
            
            const reply = await model.invoke(messages1);
            console.log(reply.content);

            messages1.push(["ai", replyClaude.content[0].text]);
            messages1.push(["ai", reply.content]);

            console.log(messages1);
            console.log(reply.content);

            res.json({ dave: reply.content , claude: replyClaude.content[0].text });
    
        } catch (e) {
            return res.status(404).json({
                message: "Could not connect with API or could not find the API response." + e
            });
        }
    }

    if (!req.body.email || !req.body.prompt) {
        return res.status(400).json({
            message: "Cannot send empty fields"
        })
    }

    try {
        callTheForces(email, prompt)
    } catch (e) {
        return res.status(404).json({
            message: "Could not connect with API or could not find the API response." + e
        });
    }
});

export default router;
