import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientService } from '../../services/http-client.service';

@Injectable()
export class SquareService {


    constructor(public httpClient:HttpClientService){}

    //  获取当前类型帖子列表
    public getForumPostList(param):Observable<any>{
        return this.httpClient.get('timeWait/forum/getForumPostList',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        });
    }

}