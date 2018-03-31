import { Component,OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CommonService } from '../../../services/common.service';
import { AdminSystemService } from './adminSystem.service'; 

declare var $: any;
@Component({
    templateUrl:'./adminSystem.component.html',
    styleUrls:['./adminSystem.component.scss'],
    providers:[AdminSystemService]
})

export class AdminSystemComponent implements OnInit {


    //  当前模块
    public nowFunction = "welcome";

    //  当前注册用户数量
    public userAmount:number = 0;

    //  当前已存在文章数量
    public articleAmount:number = 0;

    constructor(
        public activeRoute: ActivatedRoute,
        public AdminSystemService:AdminSystemService,
        public CommonService : CommonService
    ) { }

    ngOnInit() {
        this.getUserAmount();this.getArticleAmount();
        //  发射
        this.CommonService.subject.next(Object.assign({}, {isTimeWait:true}));
    }

    //  获取已注册用户数量
    public getUserAmount(){
        return this.AdminSystemService.getUserAmount().subscribe(result =>{
            if(result){
                if(result.code == 0){
                    this.userAmount = result.data;
                }
                if(result.code == 1){
                    
                }
            }
        })
    }

    //  获取存在文章数量
    public getArticleAmount(){
        return this.AdminSystemService.getArticleAmount().subscribe(result =>{
            if(result){
                if(result.code == 0){
                    this.articleAmount = result.data;
                }
                if(result.code == 1){
                    
                }
            }
        })
    }

    //  获取已访问数量
    public getReadAmount(){

    }

    /**
     * 切换设置模块
     * @param functionName 
     */
    public changeNowFunction(functionName){
        this.nowFunction = functionName;
    }
   
}