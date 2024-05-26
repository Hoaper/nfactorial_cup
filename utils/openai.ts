import OpenAI from "openai";
import {NextResponse} from "next/server";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function createAndRunThread(genres: string[], start_story: string){
    const run = await openai.beta.threads.createAndRun({
        assistant_id: process.env.OPENAI_ASSISTANT_ID || "",
        thread: {
            messages: [
                { role: "user", content: `Generate a book based on genres of book ${genres.toString()} and my start story: ${start_story}` },
            ],
        },
    });
    return run.thread_id
}

export async function listMessages(thread_id: string) {

    const messages = await openai.beta.threads.messages.list(thread_id);
    return messages.data.reverse()
}

export async function sendMessage(thread_id: string, message: string) {
    await openai.beta.threads.messages.create(thread_id, {
        role: "user",
        content: message
    });

    await openai.beta.threads.runs.create(thread_id, { assistant_id: process.env.OPENAI_ASSISTANT_ID || "" });
    return NextResponse.json({status: "ok"}, {status: 200})
}

