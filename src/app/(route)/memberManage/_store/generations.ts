import { create } from "zustand";

interface GenerationState {
 
  generations: string[];
  setGeneration: (  generations:string[]) => void;

}

export const useGenerationStore = create<GenerationState>((set) => ({
  generations:[],
  setGeneration:  (generations:string[]) => set({   generations}),


  
}));
