import { auth, signIn } from "@/auth";
import { prisma } from "@/lib/prisma";

export const GET = async (req: Request,{ params }: { params: { MovieId: string } }) => {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return Error("user not found");
    }

    const {MovieId}=params;
    if(!MovieId)
    {
        return Error("Invalid Movie id");
    }

    const movie = await prisma.movie.findUnique({
      where: {
        id:MovieId
      },
    });

    if (!movie) {
      return Error("movie not found");
    }

    return Response.json({ movie: movie });
  } catch (error) {
    throw new Error("Internal server Error");
  }
};
