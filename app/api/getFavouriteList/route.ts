import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return Response.json({ error: "User not found" }, { status: 401 });
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email || "",
      },
    });

    if (!currentUser) {
      return Response.json(
        { error: "User not found in database" },
        { status: 404 }
      );
    }

    const movies = await prisma.movie.findMany({
      where: {
        id: {
          in: currentUser.favoriteIds,
        },
      },
    });

    return Response.json(movies);
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}