import { auth, signIn } from "@/auth";
import { prisma } from "@/lib/prisma";

export const GET = async (req: Request) => {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return Error("user not found");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });

    if (!user) {
      return Error("user not found");
    }

    return Response.json({ user: user });
  } catch (error) {
    throw new Error("Internal server Error");
  }
};
