"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { useUserState } from "./LoginContext"
import toEndPoint, { FetchData as RequestData } from "@/app/apis/fetchHooks"
import { UserEndPoints } from "@/app/consts/url"
import { useRouter } from "next/navigation"

// フォームのスキーマを定義します
const formSchema = z.object({
  // メールアドレスのフィールドを定義します
  email: z.string().email({ message: "有効なメールアドレスを入力してください。" }),
  // パスワードのフィールドを定義します
  password: z.string().min(6, { message: "パスワードは6文字以上である必要があります。" })
})

export function LoginForm({ toClose }:{toClose:(to:boolean)=> void}) {
  const router = useRouter();
  const {userName,isLogin,updateUser} = useUserState();

  // フォームを定義します
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "", // メールアドレスの初期値
      password: "" // パスワードの初期値
    },
  })

  // フォームの送信ハンドラを定義します
  function onSubmit(values: z.infer<typeof formSchema>) {
    // フォームの値を使って何かをします
    console.log(values) // フォームの値をコンソールに表示します
    console.log(userName,isLogin);

    const login = async() => {
      const user_email = values.email;
      const user_passowrd = values.password;
      const requestdata:RequestData = {endpoint:UserEndPoints.user_login,type:'POST',body:{user:{email:user_email,password:user_passowrd}}};
      try {
        const respones = await toEndPoint(requestdata);
        
        void updateUser?.(respones.username as string,true);
        void toClose?.(false);
        router.push('/dashboard');
      
      } catch(error) {
        alert(error?.message);
      }

    };

    void login();
  }


  return (
    // フォームの要素をレンダリングします
    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      {/* メールアドレスの入力フィールド */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">メールアドレス</label>
        <input id="email" type="email" {...form.register("email")} className="mt-1 block w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        {form.formState.errors.email && <p className="mt-2 text-sm text-red-600">{form.formState.errors.email.message}</p>}
      </div>
      {/* パスワードの入力フィールド */}
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">パスワード</label>
        <input id="password" type="password" {...form.register("password")} className="mt-1 block w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        {form.formState.errors.password && <p className="mt-2 text-sm text-red-600">{form.formState.errors.password.message}</p>}
      </div>
      {/* 送信ボタン */}
      <div className="py-3 px-6 flex flex-col space-y-4">
      <Button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">ログイン</Button>
      <Button onClick={()=>toClose(false)} className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">閉じる</Button>
      
      </div>
    </form>
  )
}
