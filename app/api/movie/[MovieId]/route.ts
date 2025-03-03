import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { MovieId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return Response.json({ error: "User not found" }, { status: 401 });
    }

    const { MovieId } = params;

    if (!MovieId) {
      return Response.json({ error: "Invalid Movie id" }, { status: 400 });
    }

    const movie = await prisma.movie.findUnique({
      where: {
        id: MovieId,
      },
    });

    if (!movie) {
      return Response.json({ error: "Movie not found" }, { status: 404 });
    }

    return Response.json({ movie });
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
