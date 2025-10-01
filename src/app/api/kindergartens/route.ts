import { NextResponse } from "next/server";

export async function GET() {
  const kindergartens = [
    {
      UUID: "bed577ab-c011-43e4-8a36-866b807e48d9",
      displayValue: "삼성동뽀득어린이집",
    },
    {
      UUID: "2f502e16-5f91-4893-a045-f99c12d4cba1",
      displayValue: "화양동반짝유치원",
    },
    {
      UUID: "2f502e16-5f91-4893-a045-f99332d58ba1",
      displayValue: "창동뽀득어학원",
    },
  ];

  return NextResponse.json({ kindergartens });
}
