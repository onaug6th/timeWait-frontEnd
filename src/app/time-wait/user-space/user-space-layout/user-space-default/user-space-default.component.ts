import { Component,OnInit,AfterViewInit,ViewChild,ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { simAnim } from '../../../../common/sim-anim';

import { UserSpaceDefaultService } from './user-space-default.service';
import * as moment from 'moment';

declare var $: any;
@Component({
    selector:'user-space-default',
    templateUrl:'./user-space-default.component.html',
    styleUrls:['./user-space-default.component.scss'],
    providers:[UserSpaceDefaultService],
    animations:[simAnim]
})

export class UserSpaceDefaultComponent implements OnInit,AfterViewInit {

    //  当前已经登陆的用户
    public currentLoggedInUser = $.parseJSON(sessionStorage.getItem("currentUser"));

    public welcomeTextObject = {
        welcomeTimeText : "",
        welcomeRandomText : "",
        welcomeSpecilText : ""
    };

    public dataCount:any = {
        
    }

    public welcomeRandomTextArray = [
        "今天发生了什么有趣的事情？",
        "天气变冷了，注意保暖",
        "雷猴啊",
        "好好学习天天向上",
        "欢迎欢迎"
    ]

    constructor(
        public UserSpaceDefaultService:UserSpaceDefaultService
    ) { }

    ngOnInit() {
        this.renderWelcomeText();
        this.getAtricleAmount();
        this.getForumPostAmount();
    }

    ngAfterViewInit(): void {

    }

    //  生成欢迎词语
    public renderWelcomeText(){
        const nowHour = new Date().getHours();
        if(0 <= nowHour && nowHour <=4){
            this.welcomeTextObject.welcomeTimeText = "我希望你赶紧去睡觉";
            this.welcomeTextObject.welcomeSpecilText = "已经很深夜了，你还没有睡觉吗。";
        }else if(nowHour <=10){
            this.welcomeTextObject.welcomeTimeText = "早上好";
        }else if(10 <= nowHour && nowHour <= 18){
            this.welcomeTextObject.welcomeTimeText = "下午好";
        }else if(18 <= nowHour && nowHour < 22){
            this.welcomeTextObject.welcomeTimeText = "晚上好";
        }else if(22 <= nowHour && nowHour <= 24){
            this.welcomeTextObject.welcomeTimeText = "晚上好";
            this.welcomeTextObject.welcomeSpecilText = "这个时候应该睡觉了";
        }else{
            this.welcomeTextObject.welcomeTimeText = "你好啊";
        }
        this.welcomeTextObject.welcomeRandomText = this.welcomeRandomTextArray[parseInt((Math.random()*this.welcomeRandomTextArray.length).toString())];
    }
    
    //  获取已当前用户发文章数量
    public getAtricleAmount(){
        const param = {
            userID : this.currentLoggedInUser.userID
        }
        return this.UserSpaceDefaultService.getArticleAmount().subscribe(result =>{
            if(result){
                if(result.code == 0){
                    this.dataCount.article = result.data;
                }
                if(result.code == 1){
                    
                }
            }
        })
    }

    //  获取已当前用户发文章数量
    public getForumPostAmount(){
        const param = {
            postAuthorID : this.currentLoggedInUser.userID
        }
        return this.UserSpaceDefaultService.getArticleAmount().subscribe(result =>{
            if(result){
                if(result.code == 0){
                    this.dataCount.forumPost = result.data;
                }
                if(result.code == 1){
                    
                }
            }
        })
    }
}