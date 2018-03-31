import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientService } from '../../../../services/http-client.service';
import { registerDataModal } from '../../../../time-wait/register/register.model';

@Injectable()
export class ForumManagerService {


    constructor(public httpClient: HttpClientService) { }

    //  获取论坛帖子列表
    public getForumList(param): Observable<any> {
        return this.httpClient.get('timeWait/forum/getForumPostList', param, {
            isAuthHttp: false,
            isReturnOriginal: true
        });
    }

    /**
     * 更新帖子内容
     * @param param 
     */
    public updateForumPost(param):Observable<any>{
        return this.httpClient.post('timeWait/forum/updateForumPost',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        })
    }

    //  删除帖子
    public deleteForumPost(param): Observable<any> {
        return this.httpClient.post('timeWait/forum/deleteForumPost', param, {
            isAuthHttp: false,
            isReturnOriginal: true
        });
    }

    //  获取帖子回复列表
    public getForumPostCommentList(param): Observable<any> {
        return this.httpClient.get('timeWait/forum/getForumPostComment', param, {
            isAuthHttp: false,
            isReturnOriginal: true
        });
    }

    //  删除帖子回复
    public deleteForumComment(param): Observable<any> {
        return this.httpClient.post('timeWait/forum/deleteForumComment', param, {
            isAuthHttp: false,
            isReturnOriginal: true
        });
    }

    /**
     * 更新帖子回复内容
     * @param param 
     */
    public updateForumComment(param):Observable<any>{
        return this.httpClient.post('timeWait/forum/updateForumComment',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        })
    }

}