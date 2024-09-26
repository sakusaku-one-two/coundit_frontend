"use client";
//Redux toolkitかた必要な関数をインポート
import { createSlice, createAsyncThunk,PayloadAction} from '@reduxjs/toolkit';
//ＡＰＩ呼び出しに使用する関数をインポート
import useEndPoint,{ FetchData } from '../apis/fetchHooks';
import GetUrl, { ArticleEndPoints, UserEndPoints } from '../consts/url';
import { Tag } from './tagsSlice';
import { number } from 'zod';

export interface User {
    id :number;
    username: string;
};

//記事の型を定義
export interface Article {
    id:number;
    slug:string| '';
    title:string;
    description:string;
    body:string;
    favoritedCount:number;
    user:User;
    tags:Tag[];
}

interface ArticlesState {
    articles:Article[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}


const initialState:ArticlesState = {
    articles: [],//記事のリスト
    status: 'idle',//非同期処理の状態
    error: null //エラーメッセージ
};


// const toArticle = (response):Article => {
//     return {
//         id:response.id,
//         slug:response.slug,
//         title: response.title,
//         description: response.description,
//         favoritedCount: response.favoritedCount,
//         user_id: response.user_id,
//         tags:response.tags
//     };
// };




//記事を取得する
export const fetchArticles = createAsyncThunk<Article[]>('articles/fetchArticles',async () => {
    const fetchData:FetchData = {endpoint:ArticleEndPoints.articles_all,type:'GET'};
    const response = await useEndPoint(fetchData);
    return response;
});

//記事を作製する非同期関数を定義
export const createArticles = createAsyncThunk<Article,Article,{rejectValue:string}>('articles/createArticle',async (newArticle) => {
    const fetchData:FetchData = {endpoint:ArticleEndPoints.articles_create,type:'POST',body:newArticle};
    
    try {
        await useEndPoint(fetchData);
        return newArticle;
    } catch(error) {
        return '';
    };

});

export const updateArticle = createAsyncThunk<Article,Article,{rejectValue:string}>('articles/updateArticle',async (updateArticle) => {
    const fetchData:FetchData = {endpoint:ArticleEndPoints.articles_update,type:'PUT',body:updateArticle};
    try {
        await useEndPoint(fetchData);
        return updateArticle;
    } catch(error) {
        return '';
    };
});

export const deleteAritcle = createAsyncThunk<Article,Article,{rejectValue:string}>('articles/deleteArticle',async( delelteAritcle) =>{
    const articleId:number = delelteAritcle.id;

    try {
        const response = await fetch(GetUrl(UserEndPoints.user_article_delete),{
            method:"DELETE",
            headers:{
                Article_ID : articleId.toString()
            },
            credentials: 'include',//cookieを含める設定
        });

        if (response.ok) return deleteAritcle;

        throw new Error("削除します。");
    } catch(error ) {
        return delelteAritcle;
    }
});

//記事のスライスを作製
const articlesSlice = createSlice({
    name:'articles',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending,(state) => {
                state.status = 'loading';//記事取得中
            })

            .addCase(fetchArticles.fulfilled,(state,action:PayloadAction<Article[]>) => {
                state.status = 'succeeded';//記事の取得成功
                state.articles = action.payload;//記事のリストを更新
            })

            .addCase(fetchArticles.rejected,(state,action) =>{
                state.status = 'failed';//記事の取得失敗
                state.error = action.error.message || 'Failed to fetch articles' //エラーメッセージを更新
            })

            .addCase(createArticles.pending,(state) => {
                state.status = 'loading';//記事の作成途中
            })

            .addCase(createArticles.fulfilled,(state,action:PayloadAction<Article>)=>{
                state.status = 'succeeded';//記事の作成成功
                state.articles.push(action.payload);//新しい記事の追加
            })

            .addCase(createArticles.rejected,(state,action) => {
                state.status = 'failed';//作成の失敗
                state.error = action.error.message || 'Failed to create article';//エラーメッセージを更新
            })
            .addCase(updateArticle.pending,(state) => {
                state.status = 'loading';
            })
            .addCase(updateArticle.fulfilled,(state,action:PayloadAction<Article>) => {
                state.status = 'succeeded';
                const updatedArticle:Article = action.payload;
                const index:number  = state.articles.findIndex(article => article.id === updatedArticle.id);
                if (index !== -1) {
                    state.articles[index] = updatedArticle;
                }
            
            })
            .addCase(deleteAritcle.rejected,(state,action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to update article';//エラーメッセージを更新
            })
            .addCase(deleteAritcle.rejected,(state,action) => {
                state.status = 'failed';//作成の失敗
                state.error = action.error.message || 'Failed to create article';//エラーメッセージを更新
            })
            .addCase(deleteAritcle.pending,(state) => {
                state.status = 'loading';
            })
            .addCase(deleteAritcle.fulfilled,(state,action:PayloadAction<Article>) => {
                state.status = 'succeeded';
                const targetArticle:Article = action.payload;
                state.articles = state.articles.filter((article) => article.id !== targetArticle.id);
            
            })
            .addCase(deleteAritcle.rejected,(state,action) => {
                state.status = 'failed';
                state.error = action.error.message || '削除失敗しました';//エラーメッセージを更新
            });
    }
});

//記事のれでゅーさをエクスポート
export default articlesSlice.reducer;