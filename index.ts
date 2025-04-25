import { input } from "@inquirer/prompts";
import { githubMcpClient, gitMcpClient, messages, model } from "./utils";
import { streamText } from "ai";

console.log(`This dir will be used for git mcp ${process.cwd()}`)
const githubTools = await githubMcpClient.tools();
const gitTools = await gitMcpClient.tools();
let combinedTools: any = {};

// Add githubTools to combinedTools
for (const key in githubTools) {
    if (githubTools.hasOwnProperty(key)) {
        combinedTools[key] = githubTools[key];
    }
}

// Add gitTools to combinedTools
for (const key in gitTools) {
    if (gitTools.hasOwnProperty(key)) {
        combinedTools[key] = gitTools[key];
    }
}

async function askPrompt() {
    const question = await input({ message: 'Enter your prompt' });
    return question
}

function addPromptToMessages(prompt: string) {
    messages.push({
        role: "user",
        content: prompt
    })
}

async function streamResponse() {
    try {
        const result = streamText({
            model: model,
            messages: messages,
            tools: combinedTools,
        })

        for await (const text of result.textStream) {
            process.stdout.write(text)
        }

        messages.push(...(await result.response).messages)
    } catch (e) {
        console.log(`${e}`)
    }
}

while (true) {
    const prompt = await askPrompt()
    addPromptToMessages(prompt)
    await streamResponse()
}
