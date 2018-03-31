import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ForumManagerService }  from './forum-manager.service';

import { Util } from "../../../../common/util";
import { PaginationModel } from '../../../../common/pagination/pagination.model';
import * as _ from 'lodash';
import * as moment from 'moment';

declare var $: any;
@Component({
    selector: 'forum-manager',
    templateUrl: './forum-manager.component.html',
    styleUrls: ['./forum-manager.component.scss'],
    providers: [ForumManagerService]
})

export class ForumManagerComponent implements OnInit, AfterViewInit {

    //  所属板块转义
    public forumTypeDictionary = {
        1:"交流",
        2:"学习",
        3:"BUG",
        4:"公告"
    }

    //  是否全选
    public isCheckedAll = false;

    //  用户数据列表
    public forumDataList: any;

    //  双向绑定，搜索条件
    public searchData:any = {

    };

    //  用户资料模态框数据
    public detailModalData:any = {};

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

    //  回复帖子数据列表是否全选
    public commentIsCheckedAll = false;
    
    //  用户数据列表
    public commentDataList: any;

    //  帖子回复资料模态框数据
    public commentDetailModalData:any = {};

    //  双向绑定，评论搜索条件
    public commentSearchData:any = {
        
    };

    // 分页数据模型
    public commentPageInfo: PaginationModel = {
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
        public ForumManagerService: ForumManagerService
    ) { }

    ngOnInit() {
        this.search();
        this.commentSearch();
    }

    ngAfterViewInit(): void {
        //  调用时间插件
        Util.daterangepickerPluginInit(".daterangepicker-plugin");
        Util.datepickerPluginInit(".daterangepicker-single");
    }

    //  全选
    public checkedAll() {
        if (this.isCheckedAll) { // 更新为全选
            _.forEach(this.forumDataList, item => {
                item.isChecked = true;
            });
        } else { // 更新为不全选
            _.forEach(this.forumDataList, item => {
                item.isChecked = false;
            });
        }
    }

    //  检测是否全选了
    public checked(item) {
        if (item.isChecked) {
            const temp = _.find(this.forumDataList, { isChecked: false });
            if (!temp) { // 全选重置为 true
                this.isCheckedAll = true;
            }
        } else { // 全选重置为 false
            this.isCheckedAll = false;
        }
    }

    //  包装搜索条件
    public wrapperSearchModule() {
        var date = $("#date");
        this.searchData["isReturnPostValue"] = true;
        this.searchData['currentPageNum'] = this.pageInfo.currentPageNum;
        this.searchData['pageSize'] = this.pageInfo.pageSize;
        this.searchData['startDate'] = date.val() == "" ? "" : date.data('daterangepicker').startDate.format("YYYY-MM-DD");
        this.searchData['endDate'] = date.val() == "" ? "" : date.data('daterangepicker').endDate.format("YYYY-MM-DD");
    }

    //  获取全部帖子数据
    public search() {
        this.wrapperSearchModule();
        return this.ForumManagerService.getForumList(this.searchData).subscribe(result => {
            if (result) {
                if (result.code == 0) {
                    this.forumDataList = result.data.list;
                    // 添加是否选择状态， 默认否
                    _.forEach(this.forumDataList, item => {
                        item.isChecked = false;
                    });
                    this.pageInfo.totalPages = result.data.pages;
                }
                if (result.code == 1) {
                    window['swal'](result.msg, result.detailMsg, "info");
                }
            }
        });
    }

    //  清空搜索条件
    public emptySearch() {
        $("#date").val("");
        this.searchData = {};
    }

    //  更新帖子
    public updateForumPost(){
        var isPass = true;
        $(".require-input").each((index, item) => {
            if (item.value === "") {
                window["swal"]("提示", item.attributes['data-field'].value + "不能为空", "info");
                isPass = false;
                return false;
            }
        });
        if (!this.detailModalData.postValue){
            window["swal"]("提示", "正文必须填写", "info");
            isPass = false;
            return false;
        }
        if(isPass){
            this.ForumManagerService.updateForumPost(this.detailModalData).subscribe(result =>{
                if(result){
                    if(result.code==0){
                        window['swal']("帖子更新成功！","","success");
                        $("#forum-detail").modal('hide');
                        this.search();
                    }
                }
            });
        }
    }

    /**
     * 查看详情
     * @param {any} $event
     * @param {any} item
     * @memberof ListComponent
     */
    public openModal($event, item) {
        $("#forum-detail").modal({
            keyboard: false,
            backdrop: false
        });
        this.detailModalData = item;
    }

    //  删除帖子大礼包
    public deleteCommonMethod(kind){
        var selectedForum = _.filter(this.forumDataList,{"isChecked":true});
        if(selectedForum.length == 0){
            return window['swal']("选一条数据");
        }
        var userObject = [];
        selectedForum.forEach(item =>{
            userObject.push({
                _id:item['_id'],
                postAuthor:item['postAuthor'],
                postTitle:item['postTitle']
            });
        });
        const param = {
            kind : kind,
            userObject:userObject
        }
        return this.ForumManagerService.deleteForumPost(param).subscribe(result => {
            if(result){
                if(result.code == 0){
                    window['swal']({
                        title:result.msg,
                        text:result.detailMsg
                    });
                    this.search();
                }
                if (result.code == 1) {
                    window['swal'](result.msg, result.detailMsg, "info");
                }
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
        this.search();
    }

    //  帖子回复全选
    public commentCheckedAll() {
        if (this.isCheckedAll) { // 更新为全选
            _.forEach(this.commentDataList, item => {
                item.isChecked = true;
            });
        } else { // 更新为不全选
            _.forEach(this.commentDataList, item => {
                item.isChecked = false;
            });
        }
    }

    //  检测帖子回复是否全选了
    public commentChecked(item) {
        if (item.isChecked) {
            const temp = _.find(this.commentDataList, { isChecked: false });
            if (!temp) { // 全选重置为 true
                this.commentIsCheckedAll = true;
            }
        } else { // 全选重置为 false
            this.commentIsCheckedAll = false;
        }
    }

    //  包装帖子回复搜索条件
    public commentWrapperSearchModule() {
        var date = $("#comment-Date");
        this.commentSearchData['currentPageNum'] = this.commentPageInfo.currentPageNum;
        this.commentSearchData['pageSize'] = this.commentPageInfo.pageSize;
        this.commentSearchData['startDate'] = date.val() == "" ? "" : date.data('daterangepicker').startDate.format("YYYY-MM-DD");
        this.commentSearchData['endDate'] = date.val() == "" ? "" : date.data('daterangepicker').endDate.format("YYYY-MM-DD");
    }

    //  获取全部帖子回复数据
    public commentSearch() {
        this.commentWrapperSearchModule();
        return this.ForumManagerService.getForumPostCommentList(this.commentSearchData).subscribe(result => {
            if (result) {
                if (result.code == 0) {
                    this.commentDataList = result.data.list;
                    // 添加是否选择状态， 默认否
                    _.forEach(this.commentDataList, item => {
                        item.isChecked = false;
                    });
                    this.pageInfo.totalPages = result.data.pages;
                }
                if (result.code == 1) {
                    window['swal'](result.msg, result.detailMsg, "info");
                }
            }
        });
    }

    //  清空帖子回复搜索条件
    public emptyCommentSearch() {
        $("#comment-Date").val("");
        this.commentSearchData = {};
    }

    //  更新帖子回复
    public updateComment(){
        var isPass = true;
        $(".second-require-input").each((index, item) => {
            if (item.value === "") {
                window["swal"]("提示", item.attributes['data-field'].value + "不能为空", "info");
                isPass = false;
                return false;
            }
        });
        if(isPass){
            this.ForumManagerService.updateForumComment(this.commentDetailModalData).subscribe(result =>{
                if(result){
                    if(result.code==0){
                        window['swal']("帖子回复更新成功！","","success");
                        $("#forum-comment-detail").modal('hide');
                        this.search();
                    }
                }
            });
        }
    }

    /**
     * 查看帖子回复详情
     * @param {any} $event
     * @param {any} item
     * @memberof ListComponent
     */
    public commentOpenModal($event, item) {
        $("#forum-comment-detail").modal({
            keyboard: false,
            backdrop: false
        });
        this.commentDetailModalData = item;
    }

    //  删除帖子回复大礼包
    public commentDeleteCommonMethod(kind){
        var selectedForumComment = _.filter(this.commentDataList,{"isChecked":true});
        if(selectedForumComment.length == 0){
            return window['swal']("选一条数据");
        }
        var userObject = [];
        selectedForumComment.forEach(item =>{
            userObject.push({
                _id:item['_id'],
                commentUserName:item['commentUserName']
            });
        });
        const param = {
            kind : kind,
            userObject:userObject
        }
        return this.ForumManagerService.deleteForumComment(param).subscribe(result => {
            if(result){
                if(result.code == 0){
                    window['swal']({
                        title:result.msg,
                        text:result.detailMsg
                    });
                    this.commentSearch();
                }
                if (result.code == 1) {
                    window['swal'](result.msg, result.detailMsg, "info");
                }
            }
        });
    }
    
    /**
     * 根据页码请求查询相关配置列表数据,如果当前活动页码就是目标页码，则不进行任何查询
     * 直接返回
     * @param {currentPageNum}
     */
    public commentPageNavigation(currentPageNum: number) {
        this.pageInfo.currentPageNum = currentPageNum;
        this.search();
    }
}