import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientService } from '../../services/http-client.service';

@Injectable()
export class UserSpaceService {


    constructor(public httpClient:HttpClientService){}

    //  获取用户基础信息
    public getBaseProfile(param):Observable<any>{
        return this.httpClient.get('timeWait/userSetting/getUserBaseProfile',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        });
    }

}