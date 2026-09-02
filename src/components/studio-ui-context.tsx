import { createContext, useContext } from "react";

export type StudioUI = {
  openCreateStudio: () => void;
  openCommandPalette: () => void;
  openNotifications: () => void;
  openMobileNav: () => void;
};

const noop = () => {};

export const StudioUIContext = createContext<StudioUI>({
  openCreateStudio: noop,
  openCommandPalette: noop,
  openNotifications: noop,
  openMobileNav: noop,
});

export const useStudioUI = () => useContext(StudioUIContext);
