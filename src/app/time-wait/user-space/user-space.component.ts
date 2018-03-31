import { Component,OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CommonService } from '../../services/common.service';
import { UserSpaceService } from './user-space.service';

declare var $: any;
@Component({
    templateUrl:'./user-space.component.html',
    styleUrls:['./user-space.component.scss'],
    providers:[UserSpaceService]
})

export class UserSpaceComponent implements OnInit {
    //  头像外链
    public avatarCDN = "http://oz1y7s5ij.bkt.clouddn.com/images/common/head.jpg";

    //  变量：基本信息变量
    public baseProfileInfo: any = {};

    //  当前博客所属用户ID
    public currentBlogUserID;

    //  当前已经登陆的用户
    public currentLoggedInUser = $.parseJSON(sessionStorage.getItem("currentUser"));


    constructor(
        public activeRoute: ActivatedRoute,
        public CommonService : CommonService,
        public UserSpaceService : UserSpaceService
    ) { }

    ngOnInit() {
        //  发射
        this.CommonService.subject.next(Object.assign({}, {isTimeWait:true}));
        this.getCurrentLoggedInUserBaseProfile();
    }

    //  获取当前登陆用户基础信息
    public getCurrentLoggedInUserBaseProfile() {
        const param = {
            userID: this.currentLoggedInUser.userID
        }
        return this.UserSpaceService.getBaseProfile(param).subscribe(result => {
            if (result) {
                if (result.code == 0) {
                    this.baseProfileInfo = result.data;
                    if(this.baseProfileInfo.avatar){
                        this.avatarCDN = this.baseProfileInfo.avatar;
                    }
                }
            }
        });
    }

}