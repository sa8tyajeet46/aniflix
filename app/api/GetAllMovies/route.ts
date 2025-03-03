import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return Response.json({ error: "User not found" }, { status: 401 });
    }

    const movies = await prisma.movie.findMany();

    return Response.json(movies);
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}