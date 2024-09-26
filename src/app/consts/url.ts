"use client";
const serverUrl:string = 'http://localhost:3000/api';


// #ユーザー関連
//     post "user/registration", to: "users#registration" #ユーザー登録
//     post "user/login", to: "users#login"#ユーザーのログイン（emial,password)
//     post "user/logout", to: "users#logout"#ログアウト
//     delete "user/article/delete",to: "users#article_delete"#headerにarticle-idを格納
//     post "user/article/create",to: "users#article_create"
//     get "user/articles", to: "users#articles"
    


//     #記事関連
//     get "articles/all", to: "articles#all" #全記事を取得
//     get "articles/get/:id", to: "articles#get" #指定した記事IDの記事を取得
//     post "articles/create", to: "articles#create" #新規作成
//     put "articles/update", to: "articles#update" #記事の更新 json bodyにidを格納している

//     #タグ関連
//     get "tags/all",to: "tags#get_all" #すべてのtagを取得
//     delete "tags/delete",to: "tags#delete" #tagの削除
//     post "tags/insert",to: "tags#insert_article_tag" #記事とタグを結びつける
//     post "tags/create",to: "tags#create_tag" #タグの削除


// ユーザー関連のエンドポイント
export const UserEndPoints = {
    user_registration: "user/registration", // ユーザー登録
    user_login: "user/login", // ユーザーのログイン
    user_logout: "user/logout", // ログアウト
    user_article_delete: "user/article/delete", // 記事の削除
    user_article_create: "user/article/create", // 記事の作成
    user_article_update: "user/article/update",//ユーザーの記事の更新処理
    user_articles: "user/articles" // 記事の取得
} as const;

// 記事関連のエンドポイント
export const ArticleEndPoints = {
    articles_all: "articles/all", // 全記事を取得
    articles_get: "articles/get/:id", // 指定した記事IDの記事を取得
    articles_create: "articles/create", // 新規作成
    articles_update: "articles/update" // 記事の更新
} as const;

// タグ関連のエンドポイント
export const TagEndPoints = {
    tags_all: "tags/all", // すべてのタグを取得
    tags_delete: "tags/delete", // タグの削除
    tags_insert: "tags/insert_article_tag", // 記事とタグを結びつける
    tags_create: "tags/create_tag" // タグの作成
} as const;




// サーバーのエンドポイントを返す関数
const GetUrl = (apiEndpoint:string):string => {
    if (apiEndpoint.charAt(0) === '/') return serverUrl + apiEndpoint;
    return `${serverUrl}/${apiEndpoint}`; 
};

export default GetUrl;