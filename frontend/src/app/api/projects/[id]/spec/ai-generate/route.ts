import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Project from "@/models/Project";
import { generateSpec } from "@/lib/gemini";
import { getServerSession } from "next-auth/next";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const spec = await generateSpec(project);
    
    // We'll store the spec in a separate collection or inside the project
    // For MVP, let's keep it in a 'specs' collection
    // But for now, let's just return it to the client
    // We will implement the Spec model later

    return NextResponse.json(spec);
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
