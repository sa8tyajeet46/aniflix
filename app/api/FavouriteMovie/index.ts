import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { without } from "lodash";

export const AddFavourite = async (movieId:string) => {
  try {
    
    const session = await auth();

    if (!session?.user?.email) {
      return Error("user not found");
    }

    const movie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!movie) {
      return Error("Invalid Id");
    }

    const updatedUser = await prisma.user.update({
      where: {
        email: session?.user?.email || "",
      },
      data: {
        favoriteIds: {
          push: movieId,
        },
      },
    });
    

    

    return updatedUser;
  } catch (error) {
    throw new Error("Internal server Error");
  }
};


export const deleteFavourite = async (movieId:string) => {
    try {
      const session = await auth();
  
      if (!session?.user?.email) {
        return Error("user not found");
      }
  
      const movie=await prisma.movie.findUnique({
          where:{
              id:movieId
          }
      });
       if(!movie)
       {
          return Error("Invalid Id");
       }
       const currentUser=await prisma.user.findUnique({
        where:{
            email:session?.user?.email || ""
        }
       });

       const updatedFavourites=without(currentUser?.favoriteIds,movieId);
  
       const updatedUser=await prisma.user.update({
          where:{
              email:session?.user?.email || ""
          },
          data:{
              favoriteIds:updatedFavourites
          }
       })
  
      
  
      return updatedUser;
    } catch (error) {
      throw new Error("Internal server Error");
    }
  };
  