import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { BlogArticleDetailService } from './blog-article-detail.service';
import { PaginationModel } from '../../common/pagination/pagination.model';

declare var $: any;

import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
    templateUrl:'./blog-article-detail.component.html',
    styleUrls:['./blog-article-detail.component.scss']
})

export class ArticleDetailComponent implements OnInit {
    //  头像外链
    public avatarCDN = "http://oz1y7s5ij.bkt.clouddn.com/images/common/head.jpg";

    //  当前登陆用户
    public currentLoggedInUser = JSON.parse(sessionStorage.getItem("currentUser")) ? JSON.parse(sessionStorage.getItem("currentUser")) : {};

    //  当前登陆用户基础信息
    public currentLoggedInUserBaseInfo:any = {};

    public isEdit:boolean = false;

    //  富文本编辑器配置
    public config = {
        filebrowserBrowseUrl: '&&&&&',
        filebrowserUploadUrl: 'http://www.onaug6th.com/file/photo/articlePicture'
    };

    public likeText:string = "不错不错";

    //  详细内容数据
    public article:any = {
        value : ''
    };

    //  当前文章评论内容
    public articleCommentData:any = [];

    //  评论数据变量
    public commentValue:string = "";

    //  页码样式
    public pageClass:{[propName:string]:boolean} = {
        pagination: true,
        "pagination-sm": true,
        "no-margin": true,
        "pull-right": true,
        "blog":true
    }
    
    // 分页数据模型
    public pageInfo: PaginationModel = {
        currentPageNum: 1,
        pageSize: 10,
        totalPages: 1,
        total: 0,
        pagesShow: 5,
        startRow: 0,
        endRow: 0,
        prevPageText:"前页",
        nextPageText:"后页",
        pageList: [5, 10, 25, 50, 100]
    };

    constructor(
        public router: Router,
        public activeRoute: ActivatedRoute,
        public BlogArticleDetailService:BlogArticleDetailService
    ) { }

    ngOnInit() {
        // 根据地址参数进行ajax查询
        this.activeRoute.params.subscribe(
            params => this.getArticleDetail(params["articleID"])
        );
        if(this.currentLoggedInUser.userID){
            this.getCurrentLoggedInUserBaseProfile();
        }
    }

    /**
     * 获取文章详细内容
     * @param {any} articleID 当前文章ID
     * @returns 
     * @memberof ArticleDetailComponent
     */
    public getArticleDetail(articleID){
        const param = {
            articleID : articleID
        };
        return this.BlogArticleDetailService.getArticleDetail(param).subscribe(result => {
            if(result){
                this.article = result.data;
                this.getArticleComment();
            }
        });
    }
    
    //  点赞！
    public newLike(){
        var that = this;
        const param = {
            articleID:this.article["_id"],
            userID:this.currentLoggedInUser.userID
        }
        return this.BlogArticleDetailService.addLikeCount(param).subscribe(result =>{
            if(result){
                if(result.code == 1){
                    window["swal"]({title:result.msg,text:result.detailMsg});
                }
                if(result.code == 0){
                    let num = that.article.like;
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
                    that.article.like = that.article.like + 1;
                }
            }
        });
    }

    //  展开或隐藏评论
    public toggleCommentBox(index){
        $("#commont-box"+index).slideToggle();
    }

    //  获取当前登陆用户基础信息
    public getCurrentLoggedInUserBaseProfile() {
        const param = {
            userID: this.currentLoggedInUser.userID
        }
        return this.BlogArticleDetailService.getBaseProfile(param).subscribe(result => {
            if (result) {
                if (result.code == 0) {
                    this.currentLoggedInUserBaseInfo = result.data;
                }
            }
        });
    }

    /**
     * 获取当前文章评论
     * @param postID 
     */
    public getArticleComment(){
        const param = {
            commentArticleID : this.article._id,
            currentPageNum: this.pageInfo.currentPageNum,
            pageSize: this.pageInfo.pageSize
        };
        return this.BlogArticleDetailService.getArticleCommentAndInfo(param).subscribe(result => {
            if(result){
                this.articleCommentData = result.data.list;
                this.pageInfo.totalPages = result.data.pages;
                _.forEach(this.articleCommentData, item => {
                    item.isOpen = false;
                });
            }
        });
    }

    //  校验文章评论资格
    public articleCommentValidate(){
        const that = this;
        if(that.commentValue == ""){
            window["swal"]({title:"不允许评论空气"});
        }else{
            this.newArticleComment();
        }
    }
        
    /**
     * 新增当前文章回复
     */
    public newArticleComment(){
        const param = {
            commentArticleID : this.article["_id"],
            commentArticleTitle:this.article["title"],
            commentUserName: this.currentLoggedInUser.userName,
            commentUserID: this.currentLoggedInUser.userID,
            commentDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            commentValue : this.commentValue
        };
        return this.BlogArticleDetailService.newArticleComment(param).subscribe(result => {
            if(result){
                if (result.code == 0) {
                    this.commentValue = "";
                    window['swal'](result.msg, result.detailMsg, "success");
                    this.getArticleDetail(this.article._id);
                    this.getArticleComment();
                }
                if (result.code == 1) {
                    window['swal'](result.msg, result.detailMsg, "info");
                }
            }
        });
    }

    /**
     * 编辑文章
     */
    public editArticle(){
        this.isEdit = !this.isEdit;
    }

    //  更新文章
    public updateArticle(){
        var isPass = true;
        if (!this.article.value){
            window["swal"]("提示", "正文必须填写", "info");
            isPass = false;
            return false;
        }
        if(isPass){
            this.BlogArticleDetailService.updateArticle(this.article).subscribe(result =>{
                if(result){
                    if(result.code==0){
                        window['swal']("文章更新成功！","","success");
                    }
                }
            });
        }
    }

    /**
     * 点击上传图片按钮，给form表单赋值
     * @param e 
     */
    public clickEditor(e){
        const that = this;
        if($(e.target).attr("class").indexOf("cke_button__image_icon")){
            setTimeout(`
                $("iframe[class=cke_dialog_ui_input_file]").attr("style","height:50px")
                $("iframe[class=cke_dialog_ui_input_file]").contents().find("input[name=upload]").attr("name","article")
                $("iframe[class=cke_dialog_ui_input_file]").contents().find("input[name=article]").after("<input hidden name='userID' value=${that.currentLoggedInUser.userID}>")
                $("iframe[class=cke_dialog_ui_input_file]").contents().find("input[name=article]").after("<input hidden name='userName' value=${that.currentLoggedInUser.userName}>")
            `,2000)
        }
    }

    /**
     * 显示详细信息卡片
     * @param index 序号
     */
    public showDetailInfo(index) {
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
    public hideDetailInfo(index) {
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
        this.getArticleComment();
    }
}