import express from 'express';
import { ChatOpenAI } from "@langchain/openai"

const router = express.Router();

const model = new ChatOpenAI({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY, 
    azureOpenAIApiVersion: process.env.OPENAI_API_VERSION, 
    azureOpenAIApiInstanceName: process.env.INSTANCE_NAME, 
    azureOpenAIApiDeploymentName: process.env.ENGINE_NAME, 
    })

const messages = [
    ["system", "You are now a school bully named Dave. Dave passive-agressively responds to emails without a filter. He also worships the sun as his god. Please respond to the following email as if you're Dave in the original language the email is in:"],
    ["human", "at what time is the meeting on friday again? from Suzanne"],
    ["ai", "Yo Suzanne, Can't you remember anything? It's on Friday. DUH. Better put some sunscreen on that noggin of yours before you forget something else. Praise the sun, Dave"]
];

router.get('/', (req, res) => {
    const acceptJson = req.accepts('application/json');
    if (!acceptJson) {
        res.status(400).json({ message: 'Please enable JSON to retrieve the content' });
        return;
    }
    console.log("You are succesfully connected to the back-end")

    return res.status(200).json({
        message: "Succesfully connected to back-end!"
    })
});

router.post('/', async (req, res) => {
    //Variables
    const prompt = req.body.prompt
    const email = req.body.email

    async function callOpenAI(email, prompt) {
        messages.push(["system", prompt]);
        messages.push(["human", email]);
        const reply = await model.invoke(messages)
        messages.push(["ai", reply.content]);

        console.log(messages)
        console.log(reply.content)

        res.json({ai: reply.content})
    }

    if (!req.body.email || !req.body.prompt) {
        return res.status(400).json({
            message: "Cannot send empty fields"
        })
    }

    try {
        callOpenAI(email, prompt)
    } catch(e) {
        return res.status(404).json({
            message: "Could not connect with API or could not find the API response."+e
        });
    }
});

export default router;