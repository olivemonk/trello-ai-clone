import { NextResponse } from "next/server";

export async function POST(req:Request) {
    const {todos} = await req.json()
    console.log(todos)

    // communicate with open ai
}