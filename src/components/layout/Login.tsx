"use client";
import React from 'react'
import { type FC } from 'react';
import { Button } from '../ui/button';
import { LoginForm } from './LoginForm';

const Login:FC<{isOpen: boolean,onClose: (to_:boolean) => void}> = ({isOpen, onClose}) => {

   
  return (
    // モーダルの背景を設定します fiexed => 要素を画面に固定します,inset-0 => 要素を上下左右0に設定し画面全体を覆います。
    //　bg-black => 背景色を黒にします。    bg-opacity-50 => 背景の透明度を50%に設定します。flex => フレックスボックスを使用します justify-center => 要素を水平方向に中央揃えにします。items-center => 要素を垂直方向に中央揃えにします。
    <div className='fiexd inset-0 bg-black bg-opacity-30 flex justify-center items-center'>
        {/* モーダルの内容を設定します */}
        <div className='bg-white p-4 rounded shadow-lg'>
            <LoginForm toClose={onClose}/>
        </div>
    </div>
  )
}

export default Login;