import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BlogAboutService } from './blog-about.service';
import { simAnim } from '../../common/sim-anim';

declare var $: any;

@Component({
    templateUrl:'./blog-about.component.html',
    styleUrls:['./blog-about.component.scss'],
    providers:[BlogAboutService],
    animations: [simAnim]
})

export class BlogAboutComponent implements OnInit {
    //  头像外链
    public avatarCDN = "http://oz1y7s5ij.bkt.clouddn.com/images/common/head.jpg";

    //  当前登陆用户
    public currentLoggedInUser = $.parseJSON(sessionStorage.getItem("currentUser")) ? $.parseJSON(sessionStorage.getItem("currentUser")) : {};

    //  当前这个博客的用户ID
    public currentBlogUserID;

    //  当前用户资料
    public userInfo:any = {};

    //  是否编辑
    public edit:boolean = false;
    
    //  富文本编辑器配置
    config = {
        toolbar : 'Basic',
        toolbar_Basic : [
            ['Source','-','Save','NewPage','Preview','-','Templates','Cut','Copy','Paste','PasteText',
            'PasteFromWord','-','Print', 'SpellChecker', 'Scayt','Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat',
            'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField',
            'Bold','Italic','Underline','Strike','-','Subscript','Superscript','NumberedList','BulletedList','-','Outdent','Indent',
            'Blockquote','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','Link','Unlink','Anchor',
            'Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak','Styles','Format','Font','FontSize','TextColor','BGColor']
        ],
        filebrowserBrowseUrl: '&&&&&',
        filebrowserUploadUrl: '&&&'
    };

    constructor(
        public router: Router,
        public activeRoute: ActivatedRoute,
        public BlogAboutService:BlogAboutService
    ) { }

    ngOnInit() {
        // 根据地址参数进行ajax查询
        this.activeRoute.params.subscribe(
            params => {
                this.getUserInfo(params["currentBlogUserID"]);
                this.currentBlogUserID = params["currentBlogUserID"];
            }
        );
    }

    //  获取当前用户资料
    public getUserInfo(userID){
        const that = this;
        const param = {
            userID : userID
        };
        return this.BlogAboutService.getUserInfo(param).subscribe(result => {
            if(result){
                if(result.code == 0){
                    this.userInfo = result.data;
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

    //  编辑关于
    public editAbout(){
        this.edit = !this.edit;
    }

    /**
     * 保存文章
     */
    public saveAbout(){
        const that = this;
        const param = {
            userID : this.currentLoggedInUser.userID,
            blogAbout : this.userInfo.blogAbout
        }
        this.BlogAboutService.saveAbout(param).subscribe(result =>{
            if(result){
                if(result.code==0){
                    window['swal']("保存成功！","","success");
                    that.edit = !that.edit;
                }
            }
        });
    }

}