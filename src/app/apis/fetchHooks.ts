
import GetUrl from "../consts/url";

export const TYPES = {
    POST : 'POST',
    GET : 'GET',
    DELETE : 'DELETE',
    PUT : 'PUT',
} as never;



export interface FetchData {
    endpoint:string;//APIのエンドポイントのパス　ドメインは省略
    type:'POST' | 'GET' | 'DELETE' | 'PUT';//POST/GET/DELETE。。。
    body?:object;
    
};



const useEndPoint = async(fetchSet:FetchData) => {
   const {endpoint,type,body} = fetchSet;

   try {
        const response = await fetch(GetUrl(endpoint),{
            method:type,
            headers: {
                'Content-Type':'application/json',
            },
            body: body? JSON.stringify(body) : undefined,
        });

        if (!response.ok) throw new Error("処理が失敗しました。");

        const data = await response.json();

        return data;


   } catch(error:unknown) {
        console.log(error);
        throw error;
   }

};

export default useEndPoint;
