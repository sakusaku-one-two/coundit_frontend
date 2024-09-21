"use client";
import React,{ createContext,useContext,useState} from 'react';
import type { FC } from 'react';
interface UserState {
    userName:string;
    isLogin:boolean;
    updateUser?:(newUserName:string,newIsLogin:boolean) => void;//ユーザー情報を更新する関数
};

const intialUsesrState: UserState = {
    userName:"",//初期のユーザー名は空
    isLogin: false,//初期のログイン状態は未ログイン
    updateUser : undefined //後程更新のhookを設定
};



export const UserStateContext = createContext<UserState>(intialUsesrState);

//ユーザーの状態を取得するカスタムフック
export const useUserState = () => {
    return useContext(UserStateContext);
}

export const UserStateProvider:FC<{children:React.ReactNode}> = ({children}) => {
    const [userName, setUserName] = useState<string>('');
    const [isLogin,setIsLogin] = useState<boolean>(false);

    const updateUser = (newUserName:string,newIsLogin:boolean):void => {
        setUserName(newUserName);
        setIsLogin(newIsLogin);
    };


    
    
    return (
        <UserStateContext.Provider value={{ userName, isLogin, updateUser}} >
            {children}
        </UserStateContext.Provider>
    );
};



