import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientService } from '../../../services/http-client.service';

@Injectable()
export class ForumNewPostService {


    constructor(public httpClient:HttpClientService){}

    /**
     * 发布新帖子
     * @param {any} param = {
     *      postAuthor : 作者名,
            postAuthorID : 作者ID,
            postTitle : 帖子标题,
            postType : 帖子分类,
            postIntro : 帖子简介,
            postValue : 帖子内容,
            postDate : 发帖时间
     * }
     * @returns {Observable<any>} 
     * @memberof ForumNewPostService
     */
    public newForumPost(param):Observable<any>{
        return this.httpClient.post('timeWait/forum/newForumPost',param,{
            isAuthHttp: false,
            isReturnOriginal:true
        });
    }


}