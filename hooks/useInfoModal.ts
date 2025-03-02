import {create} from "zustand";

declare  interface useInfoModalInterface{
movieId:string | undefined,
isOpen:boolean,
openModal:(movieIds:string)=>void,
closeModal:()=>void
}
 const useInfoModal=create<useInfoModalInterface>((set)=>({
    movieId:undefined,
    isOpen:false,
    openModal:(movieId:string)=>set(()=>({movieId:movieId,isOpen:true})),
    closeModal:()=>set(()=>({movieId:undefined,isOpen:false}))
}))

export default useInfoModal