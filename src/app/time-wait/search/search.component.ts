import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { searchService } from './search.service';
import { CommonService } from '../../services/common.service';
import { Util } from "../../common/util";

declare var $: any;
@Component({
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    providers: [searchService]
})

export class SearchComponent implements OnInit, AfterViewInit {

    //  头像外链
    public avatarCDN = "http://oz1y7s5ij.bkt.clouddn.com/images/common/head.jpg";

    //  文本框查询数据，双向绑定
    public searchText = "";

    //  查询条件
    public queryCondition = {
        user: false,
        article: false,
        memory: false,
        forumPost: false
    };

    //  查询后的用户数据
    public queryUserData: Array<object> = [{ detail: [{}] }];

    constructor(
        public router: Router,
        public elementRef: ElementRef,
        public renderer: Renderer,
        public activeRoute: ActivatedRoute,
        public CommonService: CommonService,
        public searchService: searchService
    ) { }

    ngOnInit() {
        //  发射，告诉顶部导航栏我属于timewait。给我跑出来
        this.CommonService.subject.next(Object.assign({}, { isTimeWait: true }));
        // 根据地址参数进行ajax查询
        this.activeRoute.params.subscribe(params => {
            if (params["param"] == "" || params["param"] == undefined) {
                this.queryUserData = [];
            } else {
                this.searchAll(params["param"])
            }
        });
    }

    ngAfterViewInit(): void {
        //  调用时间插件
        Util.daterangepickerPluginInit(".daterangepicker-plugin");
        Util.datepickerPluginInit(".daterangepicker-single");
    }

    /**
     * 搜索
     * @param param 参数
     */
    public search() {
        if(this.searchText == ""){
            return window['swal']({"title":"请输入要搜索的内容"})
        }
        this.searchAll(this.searchText);
    }

    /**
     * 搜索全部
     * @param param 参数
     */
    public searchAll(param) {
        this.searchUser(param);
    }

    /**
     * 搜索用户
     * @param userName 参数
     */
    public searchUser(userName) {
        const param = {
            userName: userName
        }
        return this.searchService.searchUser(param).subscribe(result => {
            if (result) {
                if (result.code == "0") {
                    this.queryUserData = result.data;
                }
                if (result.code == "1") {
                    this.queryUserData = [];
                }
            }
        });
    }

    /**
     * 显示详细信息卡片
     * @param index 序号
     */
    public showDetailInfo(index) {
        $(".intro-detail-warp" + index).animate({
            "height": '238px',
            "width": '295px'
        }, '500', function () {
            $(".intro-detail" + index).fadeIn();
        });
    }

    /**
     * 隐藏详细信息卡片
     * @param index 序号
     */
    public hideDetailInfo(index) {
        $(".intro-detail" + index).fadeOut();
        $(".intro-detail-warp" + index).animate({
            "height": '0px',
            "width": '0px'
        }, '500', function () {

        });
    }

    /**
     * 去博客
     * @param userID 
     */
    public goToBlog(userID) {
        this.router.navigateByUrl("/blog/default/" + userID);
    }

}