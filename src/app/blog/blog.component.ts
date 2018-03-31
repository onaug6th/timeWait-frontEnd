import { Component,OnInit,ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CommonService } from '../services/common.service';
import { BlogService } from './blog.service';

import { environment } from '../../environments/environment';
import { FileUploadComponent } from '../common/file-upload/file-upload.component';
import { simAnim } from '../common/sim-anim';

declare var $: any;
@Component({
    templateUrl:'./blog.component.html',
    styleUrls:['./blog.component.scss'],
    providers:[BlogService],
    animations: [simAnim]
})

export class BlogComponent implements OnInit {

    //  头像外链
    public avatarCDN = "http://oz1y7s5ij.bkt.clouddn.com/images/common/head.jpg";

    //  头像上传modal配置信息
    public fileUploadModal = {
        modalTile: "",
        title: "",
        url: "",
        method: "", // POST OR GET
        itemAlias: "", // file alias
        formDatas: [] // POST 参数
    };
    
    //  当前博客文章列表数据
    public articleList:any = [];
    
    //  当前博客类型列表
    public typeList :any;

    public timeUntil1970 = (new Date()).getTime();

    //  当前已经登陆的用户
    public currentLoggedInUser = JSON.parse(sessionStorage.getItem("currentUser")) ? JSON.parse(sessionStorage.getItem("currentUser")) : {};

    //  当前用户资料
    public userInfo:any = {};

    //  上传文件模态框
    @ViewChild(FileUploadComponent)
    private FileUploadComponent: FileUploadComponent;

    constructor(
        public activeRoute: ActivatedRoute,
        public router: Router,
        public CommonService:CommonService,
        public BlogService:BlogService
    ) { }

    ngOnInit() {
        //  通过url获取当前博客的用户id
        this.pathHandle();
        // 根据地址参数进行ajax查询
        //  发射(为了告诉顶部导航栏当前是博客界面，默认隐藏导航栏)
        this.CommonService.subject.next(Object.assign({}, {isBlog:true}));
        $(function () {
            //绑定滚动条事件 
            $(window).bind("scroll", function () {
                var $nav = $(".blogTopNav");
                var sTop = $("body").scrollTop() || document.documentElement.scrollTop;	// 获取页面到顶部的距离的距离
                sTop = parseInt(sTop);
                if (sTop >= 200) { 					// 小于200执行下面的代码  要改相反的效果只需要改这个大于小于符号
                    $nav.addClass("scroll");
                } else {
                    $nav.removeClass("scroll");
                }
            });
        });

    }

    /**
     * 根据请求路径处理
     */
    public pathHandle(){
        const path = location.pathname.split("/")[2].toString();
        const query = location.pathname.split("/")[3].toString();
        if(path == "default" || path == "about"){
            this.getUserInfo(query)
        }
        if(path == "articleDetail"){
            this.getUserInfoOrderByArticleID(query);
        }
    }

    //  获取当前用户资料
    public getUserInfo(userID){
        const that = this;
        const param = {
            userID : userID
        };
        return this.BlogService.getUserInfo(param).subscribe(result => {
            if(result){
                if(result.code == 0){
                    this.userInfo = result.data;
                    this.getArticleType();
                }
                // if(result.code == 1){
                //     window["swal"]({
                //         title: "没有找到这个人的资料",
                //         text: "去别的地方看看吧",
                //         type: "info",
                //         showCancelButton: false,
                //         confirmButtonColor: "#DD6B55",
                //         confirmButtonText: "我知道了"
                //     },
                //         function (isConfirm) {
                //             if (isConfirm) {
                //                 that.router.navigateByUrl("/timeWait/square");
                //             }
                //         });
                // }
            }
        });
    }


    //  根据文章id获取当前用户资料
    public getUserInfoOrderByArticleID(articleID){
        const that = this;
        const param = {
            articleID : articleID
        };
        return this.BlogService.getUserInfoOrderByArticleID(param).subscribe(result => {
            if(result){
                if(result.code == 0){
                    this.userInfo = result.data;
                    this.getArticleType();
                }
                if(result.code == 1){
                    window["swal"]({
                        title: "没有找到这个人的资料",
                        text: "去别的地方看看吧",
                        type: "info",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "我知道了"
                    },
                        function (isConfirm) {
                            if (isConfirm) {
                                that.router.navigateByUrl("/timeWait/square");
                            }
                        });
                }
            }
        });
    }

    /**
     * 获取当前用户文章分类列表
     */
    public getArticleType(){
        const param = {
            userID : this.userInfo.userID
        }
        return this.BlogService.getArticleType(param).subscribe(result =>{
            if(result){
                if(result.code == 0 ){
                    this.typeList = result.data;
                }
            }
        });
    }
    public openUploadModal() {
        //  配置上传文件信息
        this.fileUploadModal = {
            modalTile: "上传封面",
            title: "选择一张照片上传新封面",
            url: environment.server + "file/photo/blogBackground",
            method: "POST",
            itemAlias: "blogBackground",
            formDatas: [{ 
                userID: this.userInfo.userID,
                userName : this.currentLoggedInUser.userName
            }]
        };
        this.FileUploadComponent.openModal();
    }

    /**
     * @param result 服务器返回数据时触发
     */
    public updateUserBlogBackground(result){
        const param = {
            userID:this.userInfo.userID,
            blogBackground:result.data.picSrc
        }
        return this.BlogService.updateBlogBackground(param).subscribe(result => {
            if(result){
                if( result.code == 0){
                    location.reload();
                }
                if (result.code == 1) {
                    window['swal'](result.msg, result.detailMsg, "info");
                }
            }
        });
    }

    //  切换菜单
    public menuToggle(){
        $(".side-menu").fadeToggle();
    }

    //  调用default方法
    public useDefaultMethod(item){
        this.router.navigateByUrl("/blog/default/" + this.userInfo.userID);
        this.CommonService.blogDefaultSubject.next(Object.assign({}, {methodName:"type",param:item}));
        this.menuToggle();
    }
}