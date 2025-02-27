import { auth, signIn } from "@/auth";
import { prisma } from "@/lib/prisma";

export const GET = async (req: Request) => {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return Error("user not found");
    }

    const count = await prisma.movie.count();

    const randomInt = Math.floor(Math.random() * count);

    const randomMovie = await prisma.movie.findMany({
      take: 1,
      skip: randomInt,
    });

    return Response.json(randomMovie[0]);
  } catch (error) {
    throw new Error("Internal server Error");
  }
};
