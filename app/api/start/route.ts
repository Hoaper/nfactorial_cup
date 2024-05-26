import {NextResponse} from "next/server";
import {createAndRunThread} from "@/utils/openai";

export async function POST(request: Request) {
    const {genres, start} = await request.json();

    const thread_id = await createAndRunThread(genres, start);
    return NextResponse.json({story_id: thread_id});
}