import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./articleSlice";
import tagsReducer from "./tagsSlice";



//ストアを設定
const store = configureStore({
    reducer: {
        articles: articleReducer,//記事のスライス
        tags: tagsReducer,//タグのスライス
    },
});

//ストアの方をエクスポート
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
