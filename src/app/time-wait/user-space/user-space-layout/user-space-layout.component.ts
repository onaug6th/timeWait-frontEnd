import { Component,OnInit,AfterViewInit,ViewChild,ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {UserSpaceApplicationComponent} from './user-space-application/user-space-application.componenet';
import  { UserSpaceDefaultComponent} from './user-space-default/user-space-default.component';

import { UserSpaceLayoutService } from './user-space-layout.service';
import * as moment from 'moment';

declare var $: any;
@Component({
    templateUrl:'./user-space-layout.component.html',
    styleUrls:['./user-space-layout.component.scss'],
    providers:[UserSpaceLayoutService]
})

export class UserSpaceLayoutComponent implements OnInit,AfterViewInit {

    /**
     * 当前标签
     * 1.主页 2.消息 3.TimeLine
     */
    public step = 1;

    constructor(
    ) { }

    ngOnInit() {
    }

    ngAfterViewInit(): void {

    }

    public changeStep(num){
        this.step = num;
    }

    

}