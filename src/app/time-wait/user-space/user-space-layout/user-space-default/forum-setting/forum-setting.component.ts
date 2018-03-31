import { Component,OnInit,AfterViewInit,ViewChild,ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ForumSettingService } from './forum-setting.service';
import * as moment from 'moment';

import { PaginationModel } from '../../../../../common/pagination/pagination.model';

declare var $: any;
@Component({
    templateUrl:'./forum-setting.component.html',
    styleUrls:['./forum-setting.component.scss'],
    providers:[ForumSettingService]
})

export class ForumSettingComponent implements OnInit,AfterViewInit {
 
    //  当前已经登陆的用户
    public currentLoggedInUser = JSON.parse(sessionStorage.getItem("currentUser"));
    
    //  帖子列表
    public forumPostList:any;

    //  文章分类列表
    public typeList;

    //  模态框数据
    public detailModalData:any = {};

    //  是否更新
    public modalTypeUpdate = false;

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
        public ForumSettingService:ForumSettingService
    ) { }

    ngOnInit() {
        this.getForumPostList();
    }

    ngAfterViewInit(): void {

    }

    //  获取论坛帖子列表
    public getForumPostList() {
        const param = {
            postAuthorID: this.currentLoggedInUser.userID,
            currentPageNum: this.pageInfo.currentPageNum,
            pageSize: this.pageInfo.pageSize
        }
        return this.ForumSettingService.getForumPostList(param).subscribe(result => {
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
                    return that.ForumSettingService.deleteForumPost(param).subscribe(result => {
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

}