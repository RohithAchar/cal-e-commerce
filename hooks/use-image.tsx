import create from "zustand";

interface ImageUrl {
  url: string;
}

interface ImageStore {
  values: ImageUrl[];
  add: (url: string) => void;
  remove: (url: string) => void;
}

const useImageStore = create<ImageStore>((set) => ({
  values: [],
  add: (url: string) =>
    set((state) => ({
      values: [...state.values, { url }],
    })),
  remove: (url: string) =>
    set((state) => ({
      values: state.values.filter((image) => image.url !== url),
    })),
}));

export default useImageStore;
