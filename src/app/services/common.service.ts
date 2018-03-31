import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { HttpClientService } from '../services/http-client.service';

@Injectable()
export class CommonService {

    //  Subject对象，貌似是用来观察的。当发生改变时监察的函数能发现他的变化
    public subject: Subject<any> = new Subject<any>();

    //  userNameSubject
    public userNameSubject: Subject<any> = new Subject<any>();

    //  userNameSubject
    public blogDefaultSubject: Subject<any> = new Subject<any>();

    constructor(public httpClient:HttpClientService){}

    //  在topnav.component中被调用
    public get isBlog():Observable<any>{
        return this.subject.asObservable();
    }

    //  在register.component中被调用
    public get userNameModify():Observable<any>{
        return this.userNameSubject.asObservable();
    }

    //  在blog.default.component中被调用
    public get blogDefaultMethod():Observable<any>{
        return this.blogDefaultSubject.asObservable();
    }

}