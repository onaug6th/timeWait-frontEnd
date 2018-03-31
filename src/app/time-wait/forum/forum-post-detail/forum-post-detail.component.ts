import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CommonService } from '../../../services/common.service';
import { ForumPostDetailService } from './forum-post-detail.service';

import { PaginationModel } from '../../../common/pagination/pagination.model';

import * as moment from 'moment';
import * as _ from 'lodash';

declare var $: any;

@Component({
    templateUrl: './forum-post-detail.component.html',
    styleUrls: ['./forum-post-detail.component.scss'],
    providers: [ForumPostDetailService]
})

export class ForumPostDetailComponent implements OnInit {
    
    //  头像外链
    public avatarCDN = "http://oz1y7s5ij.bkt.clouddn.com/images/common/head.jpg";

    //  当前登陆用户
    public currentLoggedInUser = JSON.parse(sessionStorage.getItem("currentUser")) ? JSON.parse(sessionStorage.getItem("currentUser")) : {};

    //  当前登陆用户基础资料
    public currentLoggedInUserBaseInfo:any = {};

    public likeText:string = "我觉得ojbk";

    public forumTypeDictonary:any = {
        "1" : "交流",
        "2" : "学习",
        "3" : "BUG",
        "4" : "公告",
    }

    //  当前帖子内容变量
    public postData: any = {
        postValue: '',
        detail:[]
    }

    //  当前帖子作者资料
    public postAuthorData : any = {

    }

    //  当前帖子评论内容
    public postCommentData:any = [];

    //  评论数据变量
    public commentValue:string = "";

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
        public router: Router,
        public activeRoute: ActivatedRoute,
        public CommonService: CommonService,
        public ForumPostDetailService: ForumPostDetailService
    ) { }

    ngOnInit() {
        //  发射
        this.CommonService.subject.next(Object.assign({}, { isTimeWait: true }));
        if(this.currentLoggedInUser.userID){
            this.getCurrentLoggedInUserBaseProfile();
        }
        this.activeRoute.params.subscribe(
            params => this.getForumPostDetail(params["postID"])
        );
    }

    //  点赞！
    public newLike(){
        var that = this;
        let num = that.postData.postLike;
        $(".like-icon").append(`<p class="flyNum${num}" style="position: absolute;margin-left: 10px;">+1</p>`);
        $(`.flyNum${num}`).animate({
            "font-size": "70px",
            "opacity":"0",
            "left":-(Math.random()*500),
            "right":-(Math.random()*500),
            "top":-(Math.random()*500)
        },600,function(){
            $(`.flyNum${num}`).remove();
        });
        var likeIcon = $('.like-icon')
        likeIcon.stop();
        likeIcon.animate({
            top:"-50px"
        });
        likeIcon.animate({
            top:"0px"
        });
        that.postData.postLike = that.postData.postLike + 1;
        return this.ForumPostDetailService.addLikeCount({postID:this.postData["_id"]}).subscribe(result =>{
            result;
        });
    }

    //  展开或隐藏评论
    public toggleCommentBox(index){
        $("#commont-box"+index).slideToggle();
    }

    /**
     * 获取帖子详细内容
     * @param {any} postID 当前帖子ID
     * @returns 
     * @memberof getForumPostDetail
     */
    public getForumPostDetail(postID){
        const param = {
            postID : postID
        };
        return this.ForumPostDetailService.getForumPostDetail(param).subscribe(result => {
            if(result){
                this.postData = result.data[0];
                this.postAuthorData = result.data[0].detail[0];
                this.getForumPostComment();
            }
        });
    }
    
    /**
     * 获取帖子评论
     * @param postID 
     */
    public getForumPostComment(){
        const param = {
            commentPostID : this.postData._id,
            currentPageNum: this.pageInfo.currentPageNum,
            pageSize: this.pageInfo.pageSize
        };
        return this.ForumPostDetailService.getForumPostCommentAndInfo(param).subscribe(result => {
            if(result){
                this.postCommentData = result.data.list;
                this.pageInfo.totalPages = result.data.pages;
                _.forEach(this.postCommentData, item => {
                    item.isOpen = false;
                });
            }
        });
    }

    //  校验评论资格
    public postCommentValidate(){
        const that = this;
        if(!this.currentLoggedInUser.userID && !this.postData.anonymous){
            return window['swal']("登陆或者匿名回复！");
        }
        if(that.commentValue == ""){
            window["swal"]({
                title:"你什么都没输入你想评论空气啊",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "我就是要评论空气",
                cancelButtonText: "我再重新评论"
            },function(isConfirm){
                if(isConfirm){
                    that.commentValue = "空气";
                    that.newForumPostComment();
                }else{
                    return
                }
            });
        }else{
            this.newForumPostComment();
        }
    }

    /**
     * 新增当前帖子回复
     */
    public newForumPostComment(){
        var param;
        if(!this.currentLoggedInUser.userID){
            param = {
                commentPostID : this.postData["_id"],
                commentPostName :this.postData["postTitle"],
                commentUserName:  this.postData.anonymous,
                commentUserID: "",
                commentDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                commentValue : this.commentValue
            };
        }else{
            param = {
                commentPostID : this.postData["_id"],
                commentPostName :this.postData["postTitle"],
                commentUserName: this.currentLoggedInUser.userName,
                commentUserID: this.currentLoggedInUser.userID,
                commentDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                commentValue : this.commentValue
            };
        }
        // const param = {
        //     commentPostID : this.postData["_id"],
        //     commentUserName: this.currentLoggedInUser.userName,
        //     commentUserID: this.currentLoggedInUser.userID,
        //     commentDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        //     commentValue : this.commentValue
        // };
        return this.ForumPostDetailService.newForumPostComment(param).subscribe(result => {
            if(result){
                if (result.code == 0) {
                    this.commentValue = "";
                    window['swal'](result.msg, result.detailMsg, "success");
                    this.getForumPostDetail(this.postData._id);
                    this.getForumPostComment();
                }
                if (result.code == 1) {
                    window['swal'](result.msg, result.detailMsg, "info");
                }
            }
        });
    }

    //  获取当前登陆用户基础信息
    public getCurrentLoggedInUserBaseProfile() {
        const param = {
            userID: this.currentLoggedInUser.userID
        }
        return this.ForumPostDetailService.getBaseProfile(param).subscribe(result => {
            if (result) {
                if (result.code == 0) {
                    this.currentLoggedInUserBaseInfo = result.data;
                }
            }
        });
    }

    /**
     * 显示详细信息卡片
     * @param index 序号
     */
    public showDetailInfo(index?) {
        if(isNaN(index)){
            index = "-author";
        }
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
    public hideDetailInfo(index?) {
        if(isNaN(index)){
            index = "-author";
        }
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

    /**
     * 根据页码请求查询相关配置列表数据,如果当前活动页码就是目标页码，则不进行任何查询
     * 直接返回
     * @param {currentPageNum}
     */
    public pageNavigation(currentPageNum: number) {
        this.pageInfo.currentPageNum = currentPageNum;
        this.getForumPostComment();
    }
}