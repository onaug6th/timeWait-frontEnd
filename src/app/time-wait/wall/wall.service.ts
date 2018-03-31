import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientService } from '../../services/http-client.service';

@Injectable()
export class WallService {


    constructor(public httpClient:HttpClientService){}

    //  获取当前贴纸列表
    public getStickyNoteList(param):Observable<any>{
        return this.httpClient.get('timeWait/wall/getStickyNoteList',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        });
    }

    //  新加贴纸
    public newStickyNote(param):Observable<any>{
        return this.httpClient.post('timeWait/wall/newStickyNote',param,{
            isAuthHttp:false,
            isReturnOriginal:true
        });
    }

}