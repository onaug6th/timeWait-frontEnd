import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { registerDataModal } from './register.model';
import { HttpClientService } from '../../services/http-client.service';

@Injectable()
export class RegisterService {


    constructor(public httpClient:HttpClientService){}

    //  普通注册
    public register(user:registerDataModal):Observable<any>{
        return this.httpClient.post('timeWait/register',user,{
            isAuthHttp: false,
            isReturnOriginal:true
        });
    }
}