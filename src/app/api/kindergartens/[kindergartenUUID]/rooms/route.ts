import { NextResponse } from "next/server";

export async function GET() {
  const rooms = [
    {
      UUID: "bed573ab-c011-43e4-8a36-866b807e48d9",
      displayValue: "달님반",
    },
    {
      UUID: "2f502e16-5f91-4893-a245-f99c12d4cba1",
      displayValue: "햇살반",
    },
    {
      UUID: "2f507e16-5f91-4893-a245-f99c12d4cba1",
      displayValue: "진달래반",
    },
  ];

  return NextResponse.json({ rooms });
}
