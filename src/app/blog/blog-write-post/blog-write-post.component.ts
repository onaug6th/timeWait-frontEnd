import { Component,OnInit,AfterViewInit,ViewChild,ElementRef} from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BlogWritePostService } from './blog-write-post.service';
import { environment } from '../../../environments/environment';

import { Util } from "../../common/util";
import * as moment from 'moment';

declare var $: any;

@Component({
    templateUrl:'./blog-write-post.component.html',
    styleUrls:['./blog-write-post.component.scss']
})

export class BlogWritePostComponent implements OnInit,AfterViewInit {

    //  当前登陆用户
    public currentLoggedInUser = JSON.parse(sessionStorage.getItem("currentUser"));

    //  双向绑定，文章变量
    public article:any = {};
    
    //  分类列表
    public typeList :any;

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

    @ViewChild('typeInput')
    public typeInput: ElementRef

    constructor(
        public router: Router,
        public BlogWritePostService:BlogWritePostService
    ) { 
        
    }

    ngOnInit() {
        this.getArticleType();
    }

    ngAfterViewInit(): void {
        //  调用时间插件
        Util.daterangepickerPluginInit(".daterangepicker-plugin");
        Util.datepickerPluginInit(".daterangepicker-single");
    }

    //  选择分类
    public chooseType(value){
        this.article.type = value;
    }

    /**
     * 获取当前用户文章分类列表
     */
    public getArticleType(){
        const param = {
            userID : $.parseJSON(sessionStorage.getItem("currentUser")).userID
        }
        return this.BlogWritePostService.getArticleType(param).subscribe(result =>{
            if(result){
                if(result.code == 0 ){
                    this.typeList = result.data;
                }
            }
        });
    }
    

    /**
     * 保存文章
     * @memberof BlogWritePostComponent
     */
    public savePost(){
        var isPass = true;
        $(".require-input").each((index, item) => {
            if (item.value === "") {
                window["swal"]("提示", item.attributes['data-field'].value + "不能为空", "info");
                isPass = false;
                return false;
            }
            if (!this.article.value){
                window["swal"]("提示", "你写了内容了吗？", "info");
                isPass = false;
                return false;
            }
        });
        if(isPass){
            this.article.date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            this.BlogWritePostService.writeNewPost(this.article).subscribe(result =>{
                if(result){
                    if(result.code==0){
                        window['swal']("保存成功！","","success");
                        this.router.navigateByUrl("blog/default/" + JSON.parse(sessionStorage.getItem("currentUser")).userID);
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

}