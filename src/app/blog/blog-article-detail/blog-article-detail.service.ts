import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientService } from '../../services/http-client.service';

@Injectable()
export class BlogArticleDetailService {


    constructor(public httpClient:HttpClientService){}

    /**
     * 获取当前文章详细信息
     * @param {any} param 
     * @returns 
     */
    public getArticleDetail(param):Observable<any>{
        return this.httpClient.get('blog/getArticleDetail',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        });
    }

    /**
     * 获取当前文章的回复
     * @param {any} param 
     * @returns 
     */
    public getArticleCommentAndInfo(param):Observable<any>{
        return this.httpClient.get('blog/getArticleCommentAndInfo',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        });
    }

    //  获取用户基础信息
    public getBaseProfile(param):Observable<any>{
        return this.httpClient.get('timeWait/userSetting/getUserBaseProfile',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        });
    }
    
    /**
     * 新增当前文章的回复
     * @param {any} param 
     * @returns 
     */
    public newArticleComment(param):Observable<any>{
        return this.httpClient.post('blog/newArticleComment',param,{
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
     * 增加点赞数量
     * @param param 
     */
    public addLikeCount(param):Observable<any>{
        return this.httpClient.get('blog/addLikeCount',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        });
    }

}