import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return Response.json({ error: "User not found" }, { status: 401 });
    }

    const count = await prisma.movie.count();

    if (count === 0) {
      return Response.json(
        { error: "No movies found in database" },
        { status: 404 }
      );
    }

    const randomInt = Math.floor(Math.random() * count);

    const randomMovie = await prisma.movie.findMany({
      take: 1,
      skip: randomInt,
    });

    return Response.json(randomMovie[0]);
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
