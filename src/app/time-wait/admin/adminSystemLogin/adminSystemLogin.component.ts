import { Component,OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CommonService } from '../../../services/common.service';
import { AdminSystemLoginService } from './adminSystemLogin.service';

declare var $: any;
@Component({
    templateUrl:'./adminSystemLogin.component.html',
    styleUrls:['./adminSystemLogin.component.scss'],
    providers:[AdminSystemLoginService]
})

export class AdminSystemLoginComponent implements OnInit {

    //  双向绑定，用户登陆数据
    public user:any = {};

    constructor(
        public activeRoute: ActivatedRoute,
        public CommonService : CommonService,
        public router: Router,
        public AdminSystemLoginService:AdminSystemLoginService
    ) { }

    ngOnInit() {
        //  发射
        this.CommonService.subject.next(Object.assign({}, {isTimeWait:true}));

    }

    public adminLogin(){
        return this.AdminSystemLoginService.adminLogin(this.user).subscribe(result =>{
            if(result){
                if(result.code == 0 ){
                    sessionStorage.setItem("isAdmin", result.data);
                    this.router.navigateByUrl("/timeWait/admin/adminSystem");
                }
                if(result.code == 1 ){
                    window['swal'](result.msg, result.detailMsg, "info");
                }
            }
        })
    }
   
}