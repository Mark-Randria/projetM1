import { NextResponse } from "next/server";
import type { NextApiRequest } from "next";
import { prisma } from '@/prisma/client'

export async function PATCH(req: NextApiRequest) {
  const {} = req.body
  const { id } = req.query
}
