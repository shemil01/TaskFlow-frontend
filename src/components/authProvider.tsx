"use client";

import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "../lib/store";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
      {children}
      <ToastContainer />
      </Provider>
        
    </SessionProvider>
  );
}
