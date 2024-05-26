import {NextRequest, NextResponse} from "next/server";
import {listMessages} from "@/utils/openai";

export async function GET(request: NextRequest) {
    const thread_id = request.nextUrl.searchParams.get("thread_id")
    if (!thread_id) return NextResponse.json({error: "No thread_id"}, {status: 400})

    const messages = await listMessages(thread_id);
    return NextResponse.json({messages: messages});
}