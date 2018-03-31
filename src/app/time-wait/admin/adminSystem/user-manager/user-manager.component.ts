import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserManagerService } from './user-manager.service';

import { Util } from "../../../../common/util";
import { PaginationModel } from '../../../../common/pagination/pagination.model';
import * as _ from 'lodash';
import * as moment from 'moment';

declare var $: any;
@Component({
    selector: 'user-manager',
    templateUrl: './user-manager.component.html',
    styleUrls: ['./user-manager.component.scss'],
    providers: [UserManagerService]
})

export class UserManagerComponent implements OnInit, AfterViewInit {

    //  是否全选
    public isCheckedAll = false;

    //  用户数据列表
    public userDataList: any;

    //  双向绑定，搜索条件
    public searchData:any = {

    };

    //  等级词典
    public levelWordbook = {
        1: "普通用户",
        88: "管理员"
    }

    //  用户资料模态框数据
    public detailModalData:any = {};

    //  用户资料模态框基础资料数据
    public detailModalBaseInfoData:any = {};

    //  新用户模态框数据
    public newUserModalData:any = {};

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
        public UserManagerService: UserManagerService
    ) { }

    ngOnInit() {
        this.search();
    }

    ngAfterViewInit(): void {
        //  调用时间插件
        Util.daterangepickerPluginInit(".daterangepicker-plugin");
        Util.datepickerPluginInit(".daterangepicker-single");
    }

    //  全选
    public checkedAll() {
        if (this.isCheckedAll) { // 更新为全选
            _.forEach(this.userDataList, item => {
                item.isChecked = true;
            });
        } else { // 更新为不全选
            _.forEach(this.userDataList, item => {
                item.isChecked = false;
            });
        }
    }

    //  检测是否全选了
    public checked(item) {
        if (item.isChecked) {
            const temp = _.find(this.userDataList, { isChecked: false });
            if (!temp) { // 全选重置为 true
                this.isCheckedAll = true;
            }
        } else { // 全选重置为 false
            this.isCheckedAll = false;
        }
    }

    //  包装搜索条件
    public wrapperSearchModule() {
        var registerDate = $("#registerDate");
        this.searchData['currentPageNum'] = this.pageInfo.currentPageNum;
        this.searchData['pageSize'] = this.pageInfo.pageSize;
        this.searchData['startDate'] = registerDate.val() == "" ? "" : registerDate.data('daterangepicker').startDate.format("YYYY-MM-DD");
        this.searchData['endDate'] = registerDate.val() == "" ? "" : registerDate.data('daterangepicker').endDate.format("YYYY-MM-DD");
    }

    //  获取全部用户数据
    public search() {
        this.wrapperSearchModule();
        return this.UserManagerService.getUserList(this.searchData).subscribe(result => {
            if (result) {
                if (result.code == 0) {
                    this.userDataList = result.data.list;
                    // 添加是否选择状态， 默认否
                    _.forEach(this.userDataList, item => {
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
        $("#registerDate").val("");
        this.searchData = {};
    }

    //  打开用户详细资料模态框
    public openUserDetailModal($event,item){
        $("#user-detail").modal({
            keyboard: false,
            backdrop: false
        });
        this.detailModalData = item;
        this.getCurrentLoggedInUserBaseProfile(item._id);
    }

    //  关闭用户详细资料模态框
    public closeUserDetailModal(){
        $("#user-detail").modal("hide");
        this.detailModalData = {};
        this.detailModalBaseInfoData = {};
    }

    //  提交重要信息
    public submitImportantProfile(userID){
        var that = this;
        that.detailModalData.userID = userID;
        that.UserManagerService.updateImportantProfile(that.detailModalData).subscribe(result => {
            if (result) {
                if (result.code == 0) {
                    window['swal']({title:"修改成功", type:"success"});
                }
                if (result.code == 1) {
                    window['swal'](result.msg, result.detailMsg, "info");
                }
            }
        });
    }

    /**
     * 获取用户基础信息
     * @param userID 用户ID
     */
    public getCurrentLoggedInUserBaseProfile(userID){
        const param = {
            userID:userID
        }
        return this.UserManagerService.getBaseProfile(param).subscribe(result => {
            if(result){
                if(result.code == 0 ){
                    this.detailModalBaseInfoData = result.data;
                }
                else{
                    window['swal'](result.msg, result.detailMsg, "info");
                }
            }
        });
    }

    //  提交基础信息
    public submitBaseProfile(userID){
        const that = this;
        that.detailModalBaseInfoData.userID = userID;
        //  因为datepicker的内容不能双向绑定
        that.detailModalBaseInfoData.birthDay = $("#birthDay").val();
        that.UserManagerService.updateBaseProfile(that.detailModalBaseInfoData).subscribe(result => {
            if (result) {
                if (result.code == 0) {
                    window['swal']({title:"修改资料成功", type:"success"});
                }
                if (result.code == 1) {
                    window['swal'](result.msg, result.detailMsg, "info");
                }
            }
        });
    }

    //  打开新增用户模态框
    public openNewUserModal(){
        $("#new-user").modal({
            keyboard: false,
            backdrop: false
        });
    }

    //  关闭新增用户模态框
    public closeNewUserModal(){
        $("#new-user").modal("hide");
        this.newUserModalData = {};
    }

    //  新增用户
    public newUser(){
        this.newUserModalData.registerDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        this.UserManagerService.register(this.newUserModalData).subscribe(result => {
            if (result) {
                if (result.code == 0) {
                    window['swal']("新增用户成功", "", "success");
                    this.closeNewUserModal();
                    this.search();
                }
                if (result.code == 1) {
                    window['swal'](result.msg, result.detailMsg, "info");
                }
            }
        });
    }

    //  删除用户大礼包
    public deleteCommonMethod(kind){
        var selectedUser = _.filter(this.userDataList,{"isChecked":true});
        if(selectedUser.length == 0){
            return window['swal']("选一条数据");
        }
        var userObject = [];
        selectedUser.forEach(item =>{
            userObject.push({
                userID:item['_id'],
                userName:item['userName']
            });
        });
        const param = {
            kind : kind,
            userObject:userObject
        }
        return this.UserManagerService.deleteUser(param).subscribe(result => {
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
}