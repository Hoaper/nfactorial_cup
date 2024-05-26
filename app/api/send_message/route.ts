import {NextRequest, NextResponse} from "next/server";
import {listMessages, sendMessage} from "@/utils/openai";

export async function GET(request: NextRequest) {
    const thread_id = request.nextUrl.searchParams.get("thread_id")
    const message = request.nextUrl.searchParams.get("message")
    if (!thread_id || !message) return NextResponse.json({error: "No thread_id"}, {status: 400})

    const messages = await sendMessage(thread_id, message)
    return NextResponse.json({}, {status: 200});
}