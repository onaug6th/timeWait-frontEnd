import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { loginDataModal } from './login.model';
import { HttpClientService } from '../../services/http-client.service';

@Injectable()
export class LoginService {


    constructor(public httpClient:HttpClientService){}

    //  普通注册
    public register(user:loginDataModal):Observable<any>{
        return this.httpClient.post('timeWait/register',user,{
            isAuthHttp: false,
            isReturnOriginal:true
        });
    }
}