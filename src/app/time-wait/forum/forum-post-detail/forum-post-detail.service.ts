import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientService } from '../../../services/http-client.service';

@Injectable()
export class ForumPostDetailService {


    constructor(public httpClient:HttpClientService){}

    /**
     * 获取当前帖子详细内容
     * @param {any} param 
     * @returns 
     */
    public getForumPostDetail(param):Observable<any>{
        return this.httpClient.get('timeWait/forum/getForumPostDetail',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        });
    }

    /**
     * 获取当前帖子的回复
     * @param {any} param 
     * @returns 
     */
    public getForumPostCommentAndInfo(param):Observable<any>{
        return this.httpClient.get('timeWait/forum/getForumPostCommentAndInfo',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        });
    }

    /**
     * 新增当前帖子的回复
     * @param {any} param 
     * @returns 
     */
    public newForumPostComment(param):Observable<any>{
        return this.httpClient.post('timeWait/forum/newForumPostComment',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        });
    }

    /**
     * 新增当前帖子点赞数量
     * @param param 
     */
    public addLikeCount(param):Observable<any>{
        return this.httpClient.get('timeWait/forum/addLikeCount',param,{
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
}