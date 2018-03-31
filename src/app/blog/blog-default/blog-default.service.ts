import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientService } from '../../services/http-client.service';

@Injectable()
export class BlogDefaultService {


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

}