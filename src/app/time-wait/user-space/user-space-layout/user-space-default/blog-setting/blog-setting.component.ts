import { Component,OnInit,AfterViewInit,ViewChild,ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BlogSettingService } from './blog-setting.service';
import * as moment from 'moment';

import { PaginationModel } from '../../../../../common/pagination/pagination.model';

declare var $: any;
@Component({
    templateUrl:'./blog-setting.component.html',
    styleUrls:['./blog-setting.component.scss'],
    providers:[BlogSettingService]
})

export class BlogSettingComponent implements OnInit,AfterViewInit {


    //  当前已经登陆的用户
    public currentLoggedInUser = JSON.parse(sessionStorage.getItem("currentUser"));
    
    //  文章列表
    public articleList:any;

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
        filebrowserUploadUrl: 'http://www.onaug6th.com/file/photo/articlePicture'
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
        public BlogSettingService:BlogSettingService
    ) { }

    ngOnInit() {
        this.getArticleList();
        this.getArticleType();
    }

    ngAfterViewInit(): void {

    }
    
    public toggleModalType(){
        this.modalTypeUpdate = !this.modalTypeUpdate;
    }


    //  选择分类
    public chooseType(value){
        this.detailModalData.type = value;
    }
    
    //  获取当前用户文章列表
    public getArticleList(){
        const that = this;
        const param = {
            userID : this.currentLoggedInUser.userID,
            type:null,
            currentPageNum: this.pageInfo.currentPageNum,
            pageSize: this.pageInfo.pageSize
        };
        return this.BlogSettingService.getArticleList(param).subscribe(result => {
            if(result){
                if(result.code == 0){
                    this.articleList = [];
                    this.articleList = result.data.list;
                    this.pageInfo.totalPages = result.data.pages;
                }
            }
        });
    }

    /**
     * 获取当前用户文章分类列表
     */
    public getArticleType(){
        const param = {
            userID : this.currentLoggedInUser.userID
        }
        return this.BlogSettingService.getArticleType(param).subscribe(result =>{
            if(result){
                if(result.code == 0 ){
                    this.typeList = result.data;
                }
            }
        });
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
    }

    //  删除文章
    public deleteArticle(atricleID){
        const that = this;
        window["swal"]({
            title: "超严肃的提示",
            text: "真的要删掉吗？删了就没得恢复了",
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
                        _id:atricleID
                    }
                    return that.BlogSettingService.deleteArticle(param).subscribe(result => {
                        if (result) {
                            if (result.code == 0) {
                                window['swal'](result.msg, result.detailMsg, "info");
                                $("#article-detail").modal('hide');
                                that.getArticleList();
                            }
                            if (result.code == 1) {
                                window['swal'](result.msg, result.detailMsg, "info");
                            }
                        }
                    });
                }
            });
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
            this.detailModalData.sort = 1;
            this.BlogSettingService.updateArticle(this.detailModalData).subscribe(result =>{
                if(result){
                    if(result.code==0){
                        window['swal']("文章更新成功！","","success");
                        $("#article-detail").modal('hide');
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
     * 根据页码请求查询相关配置列表数据,如果当前活动页码就是目标页码，则不进行任何查询
     * 直接返回
     * @param {currentPageNum}
     */
    public pageNavigation(currentPageNum: number) {
        this.pageInfo.currentPageNum = currentPageNum;
        this.getArticleList();
    }

}