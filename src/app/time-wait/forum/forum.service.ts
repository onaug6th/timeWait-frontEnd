import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientService } from '../../services/http-client.service';

@Injectable()
export class ForumService {


    constructor(public httpClient:HttpClientService){}

    //  获取当前类型帖子列表
    public getForumPostList(param):Observable<any>{
        return this.httpClient.get('timeWait/forum/getForumPostList',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        });
    }

    //  删除论坛帖子
    public deleteForumPost(param):Observable<any>{
        return this.httpClient.get('timeWait/forum/deleteForumPost',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        })
    }

    //  获取用户基础信息
    public getBaseProfile(param):Observable<any>{
        return this.httpClient.get('timeWait/userSetting/getUserBaseProfile',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        });
    }

}