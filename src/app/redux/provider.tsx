"use client";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store";
import type { FC } from "react";
import React from "react";

const StoreProvider:FC<{children:React.ReactNode}> = ({ children }) =>{
    return (
        <ReduxProvider store={store}>
            {children}
        </ReduxProvider>
    );
};

export default StoreProvider;