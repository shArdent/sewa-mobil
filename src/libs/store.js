import { create } from "zustand";

export const useLeftPanelPageStore = create((set) => ({
  tampilanLeftPanel: "TampilanData",
  setLeftPanelPage: (newPage) => set(() => ({ tampilanLeftPanel: newPage,})),
}));

export const useContentPanelStore = create((set) => ({
  tampilanContentPanel: "Transaksi",
  setContentPanel: (newPage) => set(() => ({ tampilanContentPanel: newPage,})),
}));

export const useSearchFilterStore = create((set) => ({
  searchFilter: "",
  setSearchFilter: (newFilter) => set(() => ({ searchFilter: newFilter,})),
}));

