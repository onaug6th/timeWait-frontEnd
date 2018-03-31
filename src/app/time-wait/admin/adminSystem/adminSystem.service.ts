import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientService } from '../../../services/http-client.service';

@Injectable()
export class AdminSystemService {


    constructor(public httpClient:HttpClientService){}

    //  获取用户数量
    public getUserAmount():Observable<any>{
        return this.httpClient.get('timeWait/admin/getUserAmount',null,{
            isAuthHttp: false,
            isReturnOriginal:true
        });
    }

    //  获取文章数量
    public getArticleAmount():Observable<any>{
        return this.httpClient.get('timeWait/admin/getArticleAmount',null,{
            isAuthHttp: false,
            isReturnOriginal:true
        });
    }

    //  获取已访问数量
    public getReadAmount():Observable<any>{
        return this.httpClient.get('timeWait/admin/getReadAmount',null,{
            isAuthHttp: false,
            isReturnOriginal:true
        });
    }
}