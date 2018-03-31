import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientService } from '../../services/http-client.service';

@Injectable()
export class BlogAboutService {


    constructor(public httpClient:HttpClientService){}

    /**
     * 
     * @param {any} param 
     * @returns 
     */
    public getUserInfo(param):Observable<any>{
        return this.httpClient.get('blog/getUserInfo',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        });
    }

    public saveAbout(param):Observable<any>{
        return this.httpClient.post('blog/saveAbout',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        });
    }
}