// import { createOllama } from 'ollama-ai-provider';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { experimental_createMCPClient as createMCPClient, type CoreMessage } from 'ai';
import { Experimental_StdioMCPTransport as StdioMCPTransport } from 'ai/mcp-stdio';
import { SystemInstruction } from './config';
import dotenv from "dotenv";
import fileEnv from "./.env" with { type: "file" };

dotenv.config({path: fileEnv}); 

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GEN_AI_API_KEY
});

export const model = google("gemini-2.0-flash-001");

export let messages: CoreMessage[] = [{
    role: "system",
    content: SystemInstruction
}]

// const ollama = createOllama({
//     baseURL: baseUrl,
// })

// export const model = ollama("deepseek_1.5B:latest")

export const githubMcpClient = await createMCPClient({
    transport: new StdioMCPTransport({
        command: "/usr/local/bin/github-mcp-server",
        args: ["stdio"],
        env: {
            GITHUB_PERSONAL_ACCESS_TOKEN: String(process.env.TOKEN),
            GITHUB_TOOLSETS: String(process.env.GITHUB_TOOLSETS)
        }
    }),
});

export const gitMcpClient = await createMCPClient({
    transport: new StdioMCPTransport({
        command: "/usr/bin/uvx",
        args: ["mcp-server-git", "--repository", `${process.cwd()}`],
    }),
});
