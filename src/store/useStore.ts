import { create } from "zustand";

const useStore = create((set) => ({
  count: 0,
  increment: () =>
    set((state: any) => ({
      count: state.count + 1,
    })),
  decrement: () =>
    set((state: any) => ({
      count: state.count - 1,
    })),
}));

export default useStore;

// import { create } from "zustand";
// const useStore = create((set) => ({
//   count: 0,
//   increment: () => set((state: any) => ({ count: state.count + 1 })),
//   decrement: () => set((state: any) => ({ count: state.count - 1 })),
// }));

// export default useStore;
