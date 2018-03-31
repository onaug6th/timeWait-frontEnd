import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientService } from '../../../services/http-client.service';

@Injectable()
export class AdminSystemLoginService {


    constructor(public httpClient:HttpClientService){}

    //  管理员登陆
    public adminLogin(user):Observable<any>{
        return this.httpClient.post('timeWait/adminLogin',user,{
            isAuthHttp: false,
            isReturnOriginal:true
        });
    }
}