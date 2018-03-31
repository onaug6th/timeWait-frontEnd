import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientService } from '../../../../services/http-client.service';
import { registerDataModal } from '../../../../time-wait/register/register.model';

@Injectable()
export class UserManagerService {


    constructor(public httpClient: HttpClientService) { }

    //  获取用户数量
    public getUserList(param): Observable<any> {
        return this.httpClient.get('timeWait/admin/getUserList', param, {
            isAuthHttp: false,
            isReturnOriginal: true
        });
    }

    //  获取用户重要信息
    public getImportantProfile(param): Observable<any> {
        return this.httpClient.get('timeWait/userSetting/getUserImportantProfile', param, {
            isAuthHttp: false,
            isReturnOriginal: true
        });
    }

    //  更新用户重要信息
    public updateImportantProfile(param): Observable<any> {
        return this.httpClient.post('timeWait/userSetting/importantProfile', param, {
            isAuthHttp: false,
            isReturnOriginal: true
        });
    }

    //  获取用户基础信息
    public getBaseProfile(param): Observable<any> {
        return this.httpClient.get('timeWait/userSetting/getUserBaseProfile', param, {
            isAuthHttp: false,
            isReturnOriginal: true
        });
    }

    //  更新用户基础信息
    public updateBaseProfile(param): Observable<any> {
        return this.httpClient.post('timeWait/userSetting/baseProfile', param, {
            isAuthHttp: false,
            isReturnOriginal: true
        });
    }

    //  普通注册
    public register(user: registerDataModal): Observable<any> {
        return this.httpClient.post('timeWait/register', user, {
            isAuthHttp: false,
            isReturnOriginal: true
        });
    }


    //  更新用户基础信息
    public deleteUser(param): Observable<any> {
        return this.httpClient.post('timeWait/admin/deleteUser', param, {
            isAuthHttp: false,
            isReturnOriginal: true
        });
    }

}