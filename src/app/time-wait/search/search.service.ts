import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientService } from '../../services/http-client.service';

@Injectable()
export class searchService {


    constructor(public httpClient:HttpClientService){}

    //  获取用户重要信息
    public searchUser(param):Observable<any>{
        return this.httpClient.get('timeWait/search/searchUser',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        });
    }

}