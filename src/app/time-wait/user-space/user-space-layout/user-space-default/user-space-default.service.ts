import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientService } from '../../../../services/http-client.service';

@Injectable()
export class UserSpaceDefaultService {


    constructor(public httpClient: HttpClientService) { }

    //  获取用户文章数量
    public getArticleAmount(): Observable<any> {
        return this.httpClient.get('timeWait/userSpace/getArticleAmount', null, {
            isAuthHttp: false,
            isReturnOriginal: true
        });
    }

    //  获取用户发帖数量
    public getForumPostAmount(): Observable<any> {
        return this.httpClient.get('timeWait/userSpace/getForumPostAmount', null, {
            isAuthHttp: false,
            isReturnOriginal: true
        });
    }
}