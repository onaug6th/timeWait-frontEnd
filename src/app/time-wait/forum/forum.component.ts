import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ForumService } from './forum.service';
import { CommonService } from '../../services/common.service';

import { PaginationModel } from '../../common/pagination/pagination.model';

import * as moment from 'moment';
import { simAnim } from '../../common/sim-anim';

declare var $: any;
@Component({
    templateUrl: './forum.component.html',
    styleUrls: ['./forum.component.scss'],
    providers: [ForumService],
    animations:[simAnim]
})

export class ForumComponent implements OnInit {

    //  头像外链
    public avatarCDN = "http://oz1y7s5ij.bkt.clouddn.com/images/common/head.jpg";

    //  当前登陆用户
    public currentLoggedInUser = $.parseJSON(sessionStorage.getItem("currentUser")) ? $.parseJSON(sessionStorage.getItem("currentUser")) : {};

    //  当前登陆用户基础资料
    public currentLoggedInUserBaseInfo:any = {};

    public dayDictionary = ['日', '一', '二', '三', '四', '五', '六']

    public nowDay = (new Date()).getDay();

    public nowDate = moment(new Date()).format('YYYY.MM.DD');

    //  帖子列表数据
    public forumPostList: Array<any> = [];

    //  当前板块
    public nowForumType = 1;

    // 分页数据模型
    public pageInfo: PaginationModel = {
        currentPageNum: 1,
        pageSize: 10,
        totalPages: 1,
        total: 0,
        pagesShow: 5,
        startRow: 0,
        endRow: 0,
        pageList: [5, 10, 25, 50, 100]
    };

    constructor(
        public activeRoute: ActivatedRoute,
        public CommonService: CommonService,
        public ForumService: ForumService
    ) { }

    ngOnInit() {
        this.getForumPostList();
        if(this.currentLoggedInUser.userID){
            this.getCurrentLoggedInUserBaseProfile();
        }
        //  发射
        this.CommonService.subject.next(Object.assign({}, { isTimeWait: true }));
    }


    /**
     * 切换板块
     * @param {any} num 板块编号
     */
    public toggleForumType(num) {
        this.nowForumType = num;
        this.pageInfo.currentPageNum = 1;
        this.getForumPostList();
    }

    //  打开编写帖子模态框
    public openNewPostModal() {
        $("#forum-new-post").modal('show');
    }

    //  签到
    public signIn(){
        window["swal"]({
            title:"暂时还没有开通签到功能",
            confirmButtonText: "ojbk"
        });
    }

    //  获取论坛帖子列表
    public getForumPostList() {
        const param = {
            postType: this.nowForumType,
            currentPageNum: this.pageInfo.currentPageNum,
            pageSize: this.pageInfo.pageSize
        }
        return this.ForumService.getForumPostList(param).subscribe(result => {
            if (result) {
                if (result.code == 0) {
                    this.forumPostList = [];
                    this.forumPostList = result.data.list;
                    this.pageInfo.totalPages = result.data.pages;
                }
                if (result.code == 1) {
                    window['swal'](result.msg, result.detailMsg, "info");
                }
            }
        });
    }

    //  刷新帖子列表
    public refreshPostList() {
        this.getForumPostList();
    }

    //  获取当前登陆用户基础信息
    public getCurrentLoggedInUserBaseProfile() {
        const param = {
            userID: this.currentLoggedInUser.userID
        }
        return this.ForumService.getBaseProfile(param).subscribe(result => {
            if (result) {
                if (result.code == 0) {
                    this.currentLoggedInUserBaseInfo = result.data;
                }
            }
        });
    }

    public deleteForumPost(postID){
        const that = this;
        window["swal"]({
            title: "超严肃的提示",
            text: "真的要删掉吗？",
            type: "info",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            closeOnConfirm: false,
            closeOnCancel: true,
            showLoaderOnConfirm: true
        },
            function (isConfirm) {
                if (isConfirm) {
                    const param = {
                        _id:postID
                    }
                    return that.ForumService.deleteForumPost(param).subscribe(result => {
                        if (result) {
                            if (result.code == 0) {
                                window['swal'](result.msg, result.detailMsg, "info");
                                that.getForumPostList();
                            }
                            if (result.code == 1) {
                                window['swal'](result.msg, result.detailMsg, "info");
                            }
                        }
                    })
                }
            });
    }

    /**
     * 根据页码请求查询相关配置列表数据,如果当前活动页码就是目标页码，则不进行任何查询
     * 直接返回
     * @param {currentPageNum}
     */
    public pageNavigation(currentPageNum: number) {
        this.pageInfo.currentPageNum = currentPageNum;
        this.getForumPostList();
    }

    /**
     * 改变每页显示记录数
     * @param {pageSize}
     */
    public pageSizeChange(pageSize: number) {
        if (pageSize !== this.pageInfo.pageSize) {
            this.pageInfo.pageSize = pageSize;
            this.pageInfo.currentPageNum = 1;
            this.getForumPostList();
        }
    }
}