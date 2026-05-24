import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function POST(req: Request) {

  const body = await req.json();

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const prompt = `
  Analyze these university PM meeting notes.

  Extract:
  - action items
  - blockers
  - risks
  - deadlines
  - executive summary

  Notes:
  ${body.notes}
  `;

  const result = await model.generateContent(prompt);

  return Response.json({
    result: result.response.text(),
  });
}