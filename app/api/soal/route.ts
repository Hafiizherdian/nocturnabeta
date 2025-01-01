import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const soals = await prisma.soal.findMany();
  return NextResponse.json(soals);
}