import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateSpec(projectData: any) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
  const prompt = `
  Project Information:
  - Name: ${projectData.name}
  - Description: ${projectData.description}
  - Type: ${projectData.type}
  - Tech Stack: ${projectData.techStackPreference.join(", ")}
  - Timeline: ${projectData.estimatedTimeline}
  
  Generate a comprehensive project specification in JSON format with:
  1. executiveSummary (2-3 sentences)
  2. features (array of { name, description, priority: "must-have" | "should-have" | "nice-to-have" })
  3. userStories (array of { title, asA, iWant, soThat, acceptanceCriteria: string[] })
  4. successCriteria (array of strings)
  5. knownRisks (array of strings)
  6. phases (array of { name, description, milestones: string[], deliverables: string[], estimatedDays: number })
  
  Return ONLY valid JSON, no markdown or extra text.
  `;
  
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  // Strip potential markdown code blocks
  const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
  return JSON.parse(cleanJson);
}

export async function generateArchitecture(projectData: any, spec: any) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
  const prompt = `
  For this project:
  - Name: ${projectData.name}
  - Type: ${projectData.type}
  - Preferred Stack: ${projectData.techStackPreference.join(", ")}
  - Features: ${spec.features.map((f: any) => f.name).join(", ")}
  
  Generate a recommended architecture in JSON format with:
  1. frontend: { framework, libraries: string[], hosting, cdn }
  2. backend: { runtime, framework, libraries: string[], hosting }
  3. database: { type, hosting }
  4. dataFlow: (array of { from, to, dataType, protocol })
  5. externalIntegrations: (array of { name, purpose, apiKey: boolean, notes })
  6. deploymentTarget
  7. monitoringTools: string[]
  8. mermaidDiagram: (Mermaid string)
  
  Return ONLY valid JSON.
  `;
  
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
  return JSON.parse(cleanJson);
}
