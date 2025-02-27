import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const GET = async () => {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return Error("user not found");
    }

    const movies = await prisma.movie.findMany();

    return Response.json(movies);
  } catch (error) {
    throw new Error("Internal server Error");
  }
};