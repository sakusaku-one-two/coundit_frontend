"use client";
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

import useEndPoint, { FetchData } from '../apis/fetchHooks';
import { TagEndPoints } from '../consts/url';

//タグの型を定義 
export interface Tag {
    id:number;
    name:string;
}

//タグの初期値状態を定義
interface TagsState {
    tags: Tag[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error : string | null;
}

const initialState:TagsState = {
    tags: [],//タグのリスト
    status: 'idle',//非同期処理の状態
    error: null,//エラーメッセージ
};

//タグを取得する非同期関数
export const fetchTags = createAsyncThunk<Tag[]>('tags/fetchTags',async () => {
    const response = await useEndPoint({endpoint: TagEndPoints.tags_all,type:'GET'});
    return response;
});


//タグを作製する非同期関数を定義
export const createTag = createAsyncThunk<Tag,Tag>('tags/createTag',async (newTag) =>{
    const response = await useEndPoint({endpoint:TagEndPoints.tags_create,type:'POST',body:newTag});
    return response;
});

//タグを削除する非同期関数を定義
export const deleteTag = createAsyncThunk<number,{article_id:number,tag_id:number}>('tags/deleteTag',async(targetParams) =>{
    const fetchData: FetchData = {
        endpoint: TagEndPoints.tags_delete,
        type:'POST',
        body: targetParams
    };

    await useEndPoint(fetchData);
    return targetParams.tag_id;
});

//tagのスライスを作製
const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(deleteTag.fulfilled,(state,action:PayloadAction<number>) => {
            state.tags = state.tags.filter(tag => tag.id !== action.payload);//削除されたタグをリストから除去
        })
        .addCase(fetchTags.pending,(state) => {
            state.status = 'loading';//タグの取得中
        })
        .addCase(fetchTags.fulfilled,(state,action:PayloadAction<Tag[]>) =>{
            state.status = 'succeeded'; //タグの取得成功
            state.tags = action.payload;//タグのリストを更新
        })
        .addCase(fetchTags.rejected,(state,action) => {
            state.status = 'failed'//タグの取得失敗
            state.error = action.error.message || 'Failed to fetch tags';//エラーメッセージを更新
        })
        .addCase(createTag.pending,(state) => {
            state.status = 'loading';//タグ作成中
        })
        .addCase(createTag.fulfilled,(state,action:PayloadAction<Tag>) => {
            state.status = 'succeeded';//タグの作成成功
            state.tags.push(action.payload);//新しいタグの追加
        })
        .addCase(createTag.rejected,(state,action) => {
            state.status = 'failed';//タグ作成失敗
            state.error = action.error.message || 'Failed to create tag';//エラーメッセージを更新
        })
        .addCase(deleteTag.pending,(state) =>{
            state.status = 'loading';//タグの削除中
        })
        .addCase(deleteTag.rejected,(state,action) =>{
            state.status = 'failed';//タグの削除失敗
            state.error = action.error.message || 'Failed to delete';//エラーメッセージを更新
        });
    }
});

//タグのれでゅーさーをエクスポート
export default tagsSlice.reducer;
