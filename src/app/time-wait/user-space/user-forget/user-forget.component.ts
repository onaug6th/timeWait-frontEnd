import { Component,OnInit,AfterViewInit,ViewChild,ElementRef } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { simAnim } from '../../../common/sim-anim';
import { Util } from "../../../common/util";

import { UserForgetService } from './user-forget.service';
import { CommonService } from '../../../services/common.service';


declare var $: any;
@Component({
    templateUrl:'./user-forget.component.html',
    styleUrls:['./user-forget.component.scss'],
    providers:[UserForgetService],
    animations:[simAnim]
})

export class UserForgetComponent implements OnInit,AfterViewInit {

    //  仪表盘是否显示
    public dashboardShow = true;

    //  当前方式
    public nowMethod:any;

    //  其他方法
    public anotherMethod = false;

    constructor(
        public router: Router,
        public CommonService : CommonService
    ) { }

    ngOnInit() {
        //  发射，告诉顶部导航栏我属于timewait。给我跑出来
        this.CommonService.subject.next(Object.assign({}, {isTimeWait:true}));
    }

    ngAfterViewInit(): void {
        //  调用时间插件
        Util.daterangepickerPluginInit(".daterangepicker-plugin");
        Util.datepickerPluginInit(".daterangepicker-single");
    }

    //  切换方法
    public toggleMethod(){
        this.anotherMethod = !this.anotherMethod;
    }

    public chooseMethod(number){
        this.nowMethod = number;
        this.dashboardShow = false;
        if(number == 6){
            this.router.navigateByUrl("/timeWait");
        }
    }

    public returnDashboard(){
        this.nowMethod = "";
        this.dashboardShow = true;
    }

}