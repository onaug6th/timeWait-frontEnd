import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CommonService } from '../../services/common.service';
import { WallService } from './wall.service';
import { PaginationModel } from '../../common/pagination/pagination.model';

declare var $: any;
import * as moment from 'moment';

@Component({
    templateUrl: './wall.component.html',
    styleUrls: ['./wall.component.scss'],
    providers: [WallService]
})

export class WallComponent implements OnInit {

    public windowHeight = $(window).height() - $('html').height();

    //  双向绑定
    public stickyNote:any = {};

    //  当前登陆用户
    public currentLoggedInUser = JSON.parse(sessionStorage.getItem("currentUser")) ? JSON.parse(sessionStorage.getItem("currentUser")) : {};

    public isReadOnly = false;

    //  贴纸列表
    public stickNoteList: Array<object>;

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

    //  页码样式
    public pageClass:{[propName:string]:boolean} = {
        pagination: true,
        "pagination-sm": true,
        "no-margin": true,
        "pull-right": true,
        "blog":true
    }

    constructor(
        public CommonService: CommonService,
        public WallService: WallService
    ) { }

    ngOnInit() {
        //  发射
        this.CommonService.subject.next(Object.assign({}, { isTimeWait: true }));
        this.getStickyNoteList();
    }

    //  获取论坛帖子列表
    public getStickyNoteList() {
        const param = {
            currentPageNum: this.pageInfo.currentPageNum,
            pageSize: this.pageInfo.pageSize
        }
        return this.WallService.getStickyNoteList(param).subscribe(result => {
            if (result) {
                if (result.code == 0) {
                    this.stickNoteList = [];
                    this.stickNoteList = result.data.list;
                    this.pageInfo.totalPages = result.data.pages;
                }
                if (result.code == 1) {
                    window['swal'](result.msg, result.detailMsg, "info");
                }
            }
        });
    }

    // 
    public newStickyNote(){
        $("#new-stickyNote").modal('show');
        this.stickyNote = {};
        this.isReadOnly = false;
    }

    //  发布新贴纸
    public submitStickyNote(){
        var isPass = true;
        if(!this.currentLoggedInUser.userID && !this.stickyNote.anonymous){
            window["swal"]("提示", "没有登陆的情况下必须填写匿名项", "info");
            return;
        }
        $(".require-input").each((index, item) => {
            if (item.value === "") {
                window["swal"]("提示", item.attributes['data-field'].value + "不能为空", "info");
                isPass = false;
                return false;
            }
        });
        if(isPass){
            const param = {
                userName : this.stickyNote.anonymous ? this.stickyNote.anonymous : this.currentLoggedInUser.userName,
                userID : this.currentLoggedInUser.userID ? this.currentLoggedInUser.userID : "",
                title : this.stickyNote.title,
                type : "1",
                intro : this.stickyNote.intro,
                value : this.stickyNote.value,
                date : moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            }
            return this.WallService.newStickyNote(param).subscribe(result =>{
                if (result) {
                    if (result.code == 0) {
                        window['swal'](result.msg, result.detailMsg, "success");
                        $("#new-stickyNote").modal('hide');
                        this.stickyNote = {};
                        this.getStickyNoteList();
                    }
                    if (result.code == 1) {
                        window['swal'](result.msg, result.detailMsg, "info");
                    }
                }
            })
        }
    }

    public openStickyNote(item){
        this.stickyNote = item;
        this.isReadOnly = true;
        $("#new-stickyNote").modal('show');
    }

    /**
     * 根据页码请求查询相关配置列表数据,如果当前活动页码就是目标页码，则不进行任何查询
     * 直接返回
     * @param {currentPageNum}
     */
    public pageNavigation(currentPageNum: number) {
        this.pageInfo.currentPageNum = currentPageNum;
        this.getStickyNoteList();
    }
}