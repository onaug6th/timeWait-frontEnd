import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientService } from './services/http-client.service';

@Injectable()
export class AppComponentService {


    constructor(public httpClient:HttpClientService){}

    //  获取全部成就列表
    public getAllAchievementList():Observable<any>{
        return this.httpClient.get('timeWait/userSpace/getAllAchievement',null,{
            isAuthHttp:false,
            isReturnOriginal:true
        });
    }

    /**
     * 获取当前登陆用户的成就列表
     * @param {any} param = {
     *      userID : 当前用户ID
     * }
     */
    public getAchievementList(param):Observable<any>{
        return this.httpClient.get('timeWait/userSpace/getUserAchievement',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        });
    }

    /**
     * 发送当前用户获得的新成就
     * @param {any} param  = {
     *      userID : 当前用户ID,
     *      achievementID : 要新加的成就ID
     * }
     */
    public sendCurrentLoggedInUserGetAchievment(param):Observable<any>{
        return this.httpClient.post('timeWait/userSpace/userNewAchievement',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        });
    }
}