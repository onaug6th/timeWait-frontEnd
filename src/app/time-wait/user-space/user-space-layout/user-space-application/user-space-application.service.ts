import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientService } from '../../../../services/http-client.service';

@Injectable()
export class userSpaceApplicationService {


    constructor(public httpClient:HttpClientService){}

    //  获取当前登陆用户的战利品列表
    // public getSpoilsList(param):Observable<any>{
    //     return this.httpClient.get('timeWait/userSpace/getSpoilsList',param,{
    //         isAuthHttp:false,
    //         isReturnOriginal:true
    //     });
    // }

    //  获取当前登陆用户的成就列表
    public getAchievementList(param):Observable<any>{
        return this.httpClient.get('timeWait/userSpace/getUserAchievement',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        });
    }

}