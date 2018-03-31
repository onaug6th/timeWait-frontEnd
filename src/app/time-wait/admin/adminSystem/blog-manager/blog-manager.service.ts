import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientService } from '../../../../services/http-client.service';
import { registerDataModal } from '../../../../time-wait/register/register.model';

@Injectable()
export class BlogManagerService {


    constructor(public httpClient: HttpClientService) { }

    //  获取文章列表
    public getArticleList(param): Observable<any> {
        return this.httpClient.get('timeWait/admin/getArticleList', param, {
            isAuthHttp: false,
            isReturnOriginal: true
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
     * 获取当前文章类型列表
     * @param param userID
     */
    public getArticleType(param):Observable<any>{
        return this.httpClient.get('blog/getArticleType',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        });
    }

    //  删除文章
    public deleteArticle(param): Observable<any> {
        return this.httpClient.post('timeWait/admin/deleteArticle', param, {
            isAuthHttp: false,
            isReturnOriginal: true
        });
    }

    //  获取文章回复列表
    public getArticleCommentList(param): Observable<any> {
        return this.httpClient.get('timeWait/admin/getArticleCommentList', param, {
            isAuthHttp: false,
            isReturnOriginal: true
        });
    }

    //  删除文章回复
    public deleteArticleComment(param): Observable<any> {
        return this.httpClient.post('timeWait/admin/deleteArticleComment', param, {
            isAuthHttp: false,
            isReturnOriginal: true
        });
    }

    /**
     * 更新文章内容
     * @param param 
     */
    public updateArticleComment(param):Observable<any>{
        return this.httpClient.post('timeWait/admin/updateArticleComment',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        })
    }

}