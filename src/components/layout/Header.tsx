"use client";
import React, { SyntheticEvent,useState } from 'react'
import { Button } from '../ui/button';
import Login from './Login';
import { useUserState } from './loginContext';
const Header:React.FC = () => {

    const { userName} = useUserState();

    const handleLogout = (event:SyntheticEvent):void => {
        event.preventDefault();
        alert("logout しました。");
    };

    const handleLogin = (evnet:SyntheticEvent):void => {
        evnet.preventDefault();//POSTの際に再読み込みを防ぐためのおまじない

        setOpen(true);
    };

    const [openModal,setOpen] = useState<boolean>(false);


  return (
    //ヘッダーを上部で固定し、背景色とテキストに色を設定します。
    <header className='
        bg-blue-300 
        text-white 
        p-4 
        fixed 
        top-0 
        w-full
        ml-auto'

        >
        <h1 className='text-2xl'>coundit</h1>
        <nav>
            {/* flex => リストアイテムを横並びにする。space-x-4 => リストアイテム間のスペースを設定します。*/}
            <ul className='flex space-x-4 ml-auto'>  
                <Button onClick={handleLogin}>ログイン</Button>
                <Button onClick={handleLogout}>ログアウト</Button>
                <li><a href="/" className='hover:underline'>HOME</a></li>
                <li><a href="/about" className='hover:underline'>about</a></li>
                {
                    userName?<li>{userName}</li> : ""
                }
            </ul>
        </nav>
        {openModal && <Login isOpen={openModal} onClose={()=> setOpen(false)}/>}
    </header>
  )
};

export default Header;