import { Component,OnInit,AfterViewInit,ViewChild,ElementRef } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';


import { AboutService } from './about.service';
import { CommonService } from '../../services/common.service';


declare var $: any;
@Component({
    templateUrl:'./about.component.html',
    styleUrls:['./about.component.scss']
})

export class AboutComponent implements OnInit,AfterViewInit {

    //  当前已经登陆的用户
    public currentLoggedInUser = JSON.parse(sessionStorage.getItem("currentUser"));

    //  当前设置类型
    public nowType = 1;

    @ViewChild('WZRYSelect')
    public WZRYSelect: ElementRef;

    constructor(

        public activeRoute: ActivatedRoute,
        public AboutService:AboutService,
        public CommonService : CommonService
    ) { }

    ngOnInit() {
        //  发射，告诉顶部导航栏我属于timewait。给我跑出来
        this.CommonService.subject.next(Object.assign({}, {isTimeWait:true}));
    }

    ngAfterViewInit(): void {
    }



}