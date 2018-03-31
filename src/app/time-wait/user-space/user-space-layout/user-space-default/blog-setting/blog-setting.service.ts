import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientService } from '../../../../../services/http-client.service';

@Injectable()
export class BlogSettingService {


    constructor(public httpClient:HttpClientService){}

    /**
     * 获取文章列表
     * @param {any} param 
     * @returns 
     */
    public getArticleList(param):Observable<any>{
        return this.httpClient.get('blog/getArticleList',param,{
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
        });
    }

    /**
     * 更新文章内容
     * @param param 
     */
    public updateArticle(param):Observable<any>{
        return this.httpClient.post('blog/updateArticle',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        })
    }

    /**
     * 删除文章内容
     * @param param 
     */
    public deleteArticle(param):Observable<any>{
        return this.httpClient.get('blog/deleteArticle',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        })
    }
}