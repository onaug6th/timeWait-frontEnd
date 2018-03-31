import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientService } from '../../../../services/http-client.service';
import { registerDataModal } from '../../../../time-wait/register/register.model';

@Injectable()
export class AchievementManagerService {


    constructor(public httpClient: HttpClientService) { }

    //  获取全部成就列表
    public getAllAchievementList(): Observable<any> {
        return this.httpClient.get('timeWait/userSpace/getAllAchievement', null, {
            isAuthHttp: false,
            isReturnOriginal: true
        });
    }

    //  新增成就
    public newAchievement(param): Observable<any> {
        return this.httpClient.post('timeWait/admin/newAchievement', param, {
            isAuthHttp: false,
            isReturnOriginal: true
        });
    }

}