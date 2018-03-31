import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientService } from '../services/http-client.service';

@Injectable()
export class BlogService {


    constructor(public httpClient:HttpClientService){}

    /**
     * 获取用户信息
     * @param {any} param 
     * @returns 
     */
    public getUserInfo(param):Observable<any>{
        return this.httpClient.get('blog/getUserInfo',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        });
    }

    /**
     * 根据文章id获取用户信息
     * @param {any} param 
     * @returns 
     */
    public getUserInfoOrderByArticleID(param):Observable<any>{
        return this.httpClient.get('blog/getUserInfoOrderByArticleID',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        });
    }

    //  更新用户背景照片
    public updateBlogBackground(param):Observable<any>{
        return this.httpClient.post('blog/updateBlogBackground',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        });
    }

    
    /**
     * 获取当前文章类型列表
     * @param param userID
     */
    public getArticleType(param):Observable<any>{
        return this.httpClient.get('blog/getArticleType',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        })
    }
}