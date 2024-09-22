"use client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux"; // ReduxのProviderコンポーネントをインポート
import articleReducer from "./articleSlice";
import tagsReducer from "./tagsSlice";
import type { FC } from "react";
import React from "react";

// ストアを設定
const store = configureStore({
    reducer: {
        articles: articleReducer, // 記事のリデューサーをストアに追加
        tags: tagsReducer, // タグのリデューサーをストアに追加
    },
});

// ストアの型をエクスポート
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;
