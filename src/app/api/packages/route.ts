import { NextResponse } from "next/server";

export async function GET() {
  const packages = [
    {
      UUID: "d22535c5-2a65-4603-bd1a-d84f2333b2e1",
      displayValue: "키즈 식판",
    },
    {
      UUID: "85a025fd-aca1-422e-abad-1368cb7d3407",
      displayValue: "키즈 식판 세트 (포크)",
    },
    {
      UUID: "10d63df2-f1c4-5378-aca0-8e9433ad769e",
      displayValue: "키즈 식판 세트 (젓가락)",
    },
  ];

  return NextResponse.json({ packages });
}
