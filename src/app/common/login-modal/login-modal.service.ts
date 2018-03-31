import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { LoginUserDataModal } from './login-modal.model';
import { HttpClientService } from '../../services/http-client.service';

@Injectable()
export class loginModalAPPService {

    //  Subject对象，貌似是用来观察的。当发生改变时监察的函数能发现他的变化
    public subject: Subject<LoginUserDataModal> = new Subject<LoginUserDataModal>();

    constructor(public httpClient:HttpClientService){}

    //  在topnav.component中被调用
    public get getCurrentLoggedInUser():Observable<LoginUserDataModal>{
        return this.subject.asObservable();
    }

    //  登陆
    public login(user:LoginUserDataModal):Observable<any>{
        return this.httpClient.post('timeWait/login',user,{
            isAuthHttp: false,
            isReturnOriginal:true
        });
    }

    //  注册
    public register(user:LoginUserDataModal):Observable<any>{
        return this.httpClient.post('timeWait/register',user,{
            isAuthHttp: false,
            isReturnOriginal:true
        });
    }

    //  登出
    public logout():Observable<any>{
        sessionStorage.removeItem("currentUser");
        this.subject.next(Object.assign({}));
        return this.httpClient.get('timeWait/logout',null,{
            isAuthHttp: false,
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
}