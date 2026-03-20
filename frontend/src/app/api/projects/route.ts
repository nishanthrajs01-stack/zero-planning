import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Project from "@/models/Project";
import { getServerSession } from "next-auth/next";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    // For MVP, we'll use a dummy userId if session is not available
    const session = await getServerSession();
    const userId = session?.user?.email || "anonymous";

    const data = await req.json();
    console.log("Receiving project data:", data);
    
    const project = await Project.create({
      userId,
      ...data,
      status: "ideation",
    });

    console.log("Project created successfully:", project._id);
    return NextResponse.json(project);
  } catch (error: any) {
    console.error("CRITICAL API ERROR in /api/projects:", error);
    return NextResponse.json({ 
      error: "Internal Server Error", 
      details: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined
    }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const session = await getServerSession();
    const userId = session?.user?.email || "anonymous";

    const projects = await Project.find({ userId }).sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
