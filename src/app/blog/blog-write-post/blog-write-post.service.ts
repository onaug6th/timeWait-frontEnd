import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientService } from '../../services/http-client.service';

declare var $: any;

@Injectable()
export class BlogWritePostService {


    constructor(public httpClient:HttpClientService){}

    
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


    /**
     * 保存新文章
     * @param {any} param 
     * @returns 
     */
    public writeNewPost(param):Observable<any>{
        param.userName = $.parseJSON(sessionStorage.getItem("currentUser")).userName;
        param.userID = $.parseJSON(sessionStorage.getItem("currentUser")).userID;
        return this.httpClient.post('blog/NewPost',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        });
    }
}