import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";




export const GET = async () => {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return Error("user not found");
    }

    const currentUser = await prisma.user.findUnique(
      {
        where:{
          email:session?.user?.email || ""
        }
      }
    );

    const movies =await prisma.movie.findMany({
        where:{
            id:{
                in:currentUser?.favoriteIds
            }
        }
    })


    return Response.json(movies);
  } catch (error) {
    throw new Error("Internal server Error");
  }
};
