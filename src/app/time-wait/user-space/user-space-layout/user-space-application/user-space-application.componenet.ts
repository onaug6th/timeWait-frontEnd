import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { simAnim } from '../../../../common/sim-anim';

import { userSpaceApplicationService } from './user-space-application.service';

declare var $: any;
@Component({
    selector:'user-space-application',
    templateUrl:'./user-space-application.componenet.html',
    styleUrls:['./user-space-application.componenet.scss'],
    providers:[userSpaceApplicationService],
    animations:[simAnim]
})

export class UserSpaceApplicationComponent implements OnInit {

    //  当前已经登陆的用户变量
    public currentLoggedInUser = $.parseJSON(sessionStorage.getItem("currentUser"));

    //  当前功能变量
    //  1.战利品   2.成就
    public nowFunction = 1;

    //  成就类型转义
    public achievementTypeTranslate = {
        1 : "无聊类"
    }

    //  成就等级转义
    public achievementLevelTranslate = {
        1 : "初级",
        2 : "高级"
    }


    //  战利品列表变量
    // public spolisList = [
    //     {
    //         "spolisName":"种头发的费用",
    //         "spolisIntro":"程序员福音"
    //     }
    // ];

    //  成就列表变量
    public achievementList;

    constructor(
        public activeRoute: ActivatedRoute,
        public userSpaceApplicationService:userSpaceApplicationService
    ) { }

    ngOnInit() {

    }

    /**
     * 切换当前功能
     * @param {any} number 要切换的功能编号
     * @memberof UserSpaceApplicationComponent
     */
    public toggleFunction(number){
        if(this.nowFunction == number){
            this.nowFunction = 0;
        }else{
            this.nowFunction = number;
        }

        if(number == 2){
            this.getAchievementListList();
        }
    }

    //  获取当前登陆用户的战利品列表
    // public getSpoilsList(){
    //     const param = {
    //         userID : this.currentLoggedInUser.userID
    //     }
    //     return this.userSpaceApplicationService.getSpoilsList(param).subscribe(result => {
    //         if(result){
    //             if(result.code == 0){
    //                 this.spolisList = result.data;
    //             }
    //             if(result.code == 1){
    //                 window['swal'](result.msg, result.detailMsg, "info");
    //             }
    //         }
    //     });
    // }

    // 获取当前登陆用户的成就列表
    public getAchievementListList(){
        const param = {
            userID : this.currentLoggedInUser.userID
        }
        return this.userSpaceApplicationService.getAchievementList(param).subscribe(result => {
            if(result){
                if(result.code == 0){
                    this.achievementList = result.data;
                }
                if(result.code == 1){
                    window['swal'](result.msg, result.detailMsg, "info");
                }
            }
        });
    }


}