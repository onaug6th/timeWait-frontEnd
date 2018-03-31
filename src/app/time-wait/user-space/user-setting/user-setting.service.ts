import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientService } from '../../../services/http-client.service';

@Injectable()
export class UserSettingService {


    constructor(public httpClient:HttpClientService){}

    //  获取用户重要信息
    public getImportantProfile(param):Observable<any>{
        return this.httpClient.get('timeWait/userSetting/getUserImportantProfile',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        });
    }

    //  更新用户重要信息
    public updateImportantProfile(param):Observable<any>{
        return this.httpClient.post('timeWait/userSetting/importantProfile',param,{
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

    //  更新用户基础信息
    public updateBaseProfile(param):Observable<any>{
        return this.httpClient.post('timeWait/userSetting/baseProfile',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        });
    }

    //  更新用户密码
    public updatePassword(param):Observable<any>{
        return this.httpClient.get('timeWait/userSetting/updatePassword',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        });
    }

    //  更新用户头像
    public updateAvatar(param):Observable<any>{
        return this.httpClient.get('timeWait/userSetting/updateAvatar',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        });
    }
}