"use client";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {ChangeEvent, SyntheticEvent, useState} from "react";
import fromEndPoint,{FetchData as RequestData} from "@/app/apis/fetchHooks";
import { useUserState } from "./LoginContext";
import { UserEndPoints } from "@/app/consts/url";
import { useRouter } from "next/navigation";

interface formData {
    email:string;
    password: string;
};



export function LoginDialog() {
    const roter = useRouter();
    const {userName,isLogin,updateUser} = useUserState();
    const [isOpen,setIsOpne] = useState<boolean>(false);

    const onSubmit = async (e:SyntheticEvent) =>{
        e.preventDefault();
        const formObj = e.currentTarget;
        const form = new FormData(formObj as HTMLFormElement);
        const email = form.get('email');
        const password = form.get('password');
        
        const requestBody = {user:{
            email:email,
            password:password
        }};

        const requestData:RequestData = {
            endpoint:UserEndPoints.user_login,
            type: 'POST',
            body : requestBody
        };


        try {
            const response = await fromEndPoint(requestData);
            updateUser?.(response.username,true);
            setIsOpne(false);
            roter.push('/dashboard');
        } catch(error) {

        } finally {

        };
    };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpne}>
      <DialogTrigger asChild>
        <Button variant="outline">ログイン</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>LOGIN</DialogTitle>
          <DialogDescription>
            パスワードとメールアドレスを入力してください。
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
        <div className="grid gap-4 py-4">
         <Separator />
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              email
            </Label>
            <Input
                name="email"
                type="text"
              id="email"
              defaultValue=""
              className="col-span-3"
            />
          </div>
          <Separator />
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              password
            </Label>
            <Input
                name="password"
               type="password"
              id="password"
              defaultValue=""
              className="col-span-3"
            />
          </div>
          <Separator />
        </div>
        
        <DialogFooter>
          <Button type="submit">ログイン</Button>
        </DialogFooter>
        </form>
        <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={() => setIsOpne(false)}>
              Close
            </Button>
          </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
