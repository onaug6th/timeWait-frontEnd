import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { BlogManagerService }  from './blog-manager.service';

import { Util } from "../../../../common/util";
import { PaginationModel } from '../../../../common/pagination/pagination.model';
import * as _ from 'lodash';
import * as moment from 'moment';

declare var $: any;
@Component({
    selector: 'blog-manager',
    templateUrl: './blog-manager.component.html',
    styleUrls: ['./blog-manager.component.scss'],
    providers: [BlogManagerService]
})

export class BlogManagerComponent implements OnInit, AfterViewInit {

    //  是否全选
    public isCheckedAll = false;

    //  用户数据列表
    public articleDataList: any;

    //  双向绑定，搜索条件
    public searchData:any = {

    };

    //  文章分类列表
    public typeList;

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

    //  回复文章数据列表是否全选
    public commentIsCheckedAll = false;
    
    //  用户数据列表
    public commentDataList: any;

    //  文章回复资料模态框数据
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
        public BlogManagerService: BlogManagerService
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
            _.forEach(this.articleDataList, item => {
                item.isChecked = true;
            });
        } else { // 更新为不全选
            _.forEach(this.articleDataList, item => {
                item.isChecked = false;
            });
        }
    }

    //  检测是否全选了
    public checked(item) {
        if (item.isChecked) {
            const temp = _.find(this.articleDataList, { isChecked: false });
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
        this.searchData['currentPageNum'] = this.pageInfo.currentPageNum;
        this.searchData['pageSize'] = this.pageInfo.pageSize;
        this.searchData['startDate'] = date.val() == "" ? "" : date.data('daterangepicker').startDate.format("YYYY-MM-DD");
        this.searchData['endDate'] = date.val() == "" ? "" : date.data('daterangepicker').endDate.format("YYYY-MM-DD");
    }

    //  获取全部文章数据
    public search() {
        this.wrapperSearchModule();
        return this.BlogManagerService.getArticleList(this.searchData).subscribe(result => {
            if (result) {
                if (result.code == 0) {
                    this.articleDataList = result.data.list;
                    // 添加是否选择状态， 默认否
                    _.forEach(this.articleDataList, item => {
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

    /**
     * 获取当前用户文章分类列表
     */
    public getArticleType(userID){
        const param = {
            userID : userID
        }
        return this.BlogManagerService.getArticleType(param).subscribe(result =>{
            if(result){
                if(result.code == 0 ){
                    this.typeList = result.data;
                }
            }
        });
    }

    //  清空搜索条件
    public emptySearch() {
        $("#date").val("");
        this.searchData = {};
    }

    //  更新文章
    public updateArticle(){
        var isPass = true;
        $(".require-input").each((index, item) => {
            if (item.value === "") {
                window["swal"]("提示", item.attributes['data-field'].value + "不能为空", "info");
                isPass = false;
                return false;
            }
        });
        if (!this.detailModalData.value){
            window["swal"]("提示", "正文必须填写", "info");
            isPass = false;
            return false;
        }
        if(isPass){
            this.BlogManagerService.updateArticle(this.detailModalData).subscribe(result =>{
                if(result){
                    if(result.code==0){
                        window['swal']("文章更新成功！","","success");
                        $("#article-detail").modal('hide');
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
        $("#article-detail").modal({
            keyboard: false,
            backdrop: false
        });
        this.detailModalData = item;
        this.getArticleType(item.userID);
    }

    //  删除文章大礼包
    public deleteCommonMethod(kind){
        var selectedArticle = _.filter(this.articleDataList,{"isChecked":true});
        if(selectedArticle.length == 0){
            return window['swal']("选一条数据");
        }
        var userObject = [];
        selectedArticle.forEach(item =>{
            userObject.push({
                _id:item['_id'],
                userName:item['userName'],
                title:item['title']
            });
        });
        const param = {
            kind : kind,
            userObject:userObject
        }
        return this.BlogManagerService.deleteArticle(param).subscribe(result => {
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

    //  文章回复全选
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

    //  检测文章回复是否全选了
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

    //  包装文章回复搜索条件
    public commentWrapperSearchModule() {
        var date = $("#commentDate");
        this.commentSearchData['currentPageNum'] = this.commentPageInfo.currentPageNum;
        this.commentSearchData['pageSize'] = this.commentPageInfo.pageSize;
        this.commentSearchData['startDate'] = date.val() == "" ? "" : date.data('daterangepicker').startDate.format("YYYY-MM-DD");
        this.commentSearchData['endDate'] = date.val() == "" ? "" : date.data('daterangepicker').endDate.format("YYYY-MM-DD");
    }

    //  获取全部文章回复数据
    public commentSearch() {
        this.commentWrapperSearchModule();
        return this.BlogManagerService.getArticleCommentList(this.commentSearchData).subscribe(result => {
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

    //  清空文章回复搜索条件
    public emptyCommentSearch() {
        $("#commentDate").val("");
        this.commentSearchData = {};
    }

    //  更新文章回复
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
            this.BlogManagerService.updateArticleComment(this.commentDetailModalData).subscribe(result =>{
                if(result){
                    if(result.code==0){
                        window['swal']("文章更新成功！","","success");
                        $("#article-comment-detail").modal('hide');
                        this.search();
                    }
                }
            });
        }
    }

    /**
     * 查看文章回复详情
     * @param {any} $event
     * @param {any} item
     * @memberof ListComponent
     */
    public commentOpenModal($event, item) {
        $("#article-comment-detail").modal({
            keyboard: false,
            backdrop: false
        });
        this.commentDetailModalData = item;
    }

    //  删除文章回复大礼包
    public commentDeleteCommonMethod(kind){
        var selectedArticleComment = _.filter(this.commentDataList,{"isChecked":true});
        if(selectedArticleComment.length == 0){
            return window['swal']("选一条数据");
        }
        var userObject = [];
        selectedArticleComment.forEach(item =>{
            userObject.push({
                _id:item['_id'],
                commentArticleID:item['commentArticleID'],
                commentUserName:item['commentUserName']
            });
        });
        const param = {
            kind : kind,
            userObject:userObject
        }
        return this.BlogManagerService.deleteArticleComment(param).subscribe(result => {
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
        this.commentPageInfo.currentPageNum = currentPageNum;
        this.search();
    }
}