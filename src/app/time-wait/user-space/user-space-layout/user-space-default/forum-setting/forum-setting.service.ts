import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientService } from '../../../../../services/http-client.service';

@Injectable()
export class ForumSettingService {


    constructor(public httpClient:HttpClientService){}

    //  获取当前用户帖子列表
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
    
}