import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function generateRandomProfile() {
  const num = Math.floor(Math.random() * 4);

  const profileArr = [
    "/images/profile1.jpg",
    "/images/profile2.jpg",
    "/images/profile3.jpg",
    "/images/profile4.jpg",
  ];

  return profileArr[num];
}