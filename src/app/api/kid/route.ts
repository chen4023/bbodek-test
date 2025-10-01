import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  console.log("✅ 아이 등록 완료 (목업):", body);

  return NextResponse.json({ success: true }, { status: 201 });
}
