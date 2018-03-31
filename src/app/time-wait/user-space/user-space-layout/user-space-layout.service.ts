import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientService } from '../../../services/http-client.service';

@Injectable()
export class UserSpaceLayoutService {


    constructor(public httpClient:HttpClientService){}

    //  获取用户重要信息
    public getImportantProfile(param):Observable<any>{
        return this.httpClient.get('timeWait/userSetting/getUserImportantProfile',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        });
    }

}