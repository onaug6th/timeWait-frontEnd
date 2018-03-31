import { Component, OnInit, ViewChild,Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ForumNewPostService } from './forum-new-post.service';
import { environment } from '../../../../environments/environment';
import * as moment from 'moment';

declare var $: any;
@Component({
    selector:"forum-new-post",
    templateUrl: './forum-new-post.component.html',
    styleUrls: ['./forum-new-post.component.scss'],
    providers: [ForumNewPostService]
})

export class ForumNewPostComponent implements OnInit {

    //  双向绑定，帖子变量
    public post:any = {};

    //  当前登陆用户
    public currentLoggedInUser = JSON.parse(sessionStorage.getItem("currentUser"));

    //  富文本编辑器配置
    public config = {
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
        filebrowserUploadUrl: 'http://www.onaug6th.com/file/photo/forumPicture'
    };
    
    //  天数词典
    public dayDictionary = ['日','一','二','三','四','五','六']

    //  现在时间
    public nowDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');


    //  往上发布刷新事件
    @Output()
    public isRefresh: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        public ForumNewPostService:ForumNewPostService
    ) { }

    ngOnInit() {

    }

    //  发布新帖子
    public submitNewPost(){
        var isPass = true;
        $(".require-input").each((index, item) => {
            if (item.value === "") {
                window["swal"]("提示", item.attributes['data-field'].value + "不能为空", "info");
                isPass = false;
                return false;
            }
            if (!this.post.postValue){
                window["swal"]("提示", "你写了内容了吗？", "info");
                isPass = false;
                return false;
            }
        });
        if(isPass){
            const param = {
                postAuthor : this.currentLoggedInUser.userName,
                postAuthorID : this.currentLoggedInUser.userID,
                postTitle : this.post.postTitle,
                postType : this.post.postType,
                postIntro : this.post.postIntro,
                postValue : this.post.postValue,
                postDate : moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            }
            return this.ForumNewPostService.newForumPost(param).subscribe(result =>{
                if (result) {
                    if (result.code == 0) {
                        window['swal'](result.msg, result.detailMsg, "success");
                        $("#forum-new-post").modal('hide');
                        this.post = {};
                        this.isRefresh.emit({isRefresh:true});
                    }
                    if (result.code == 1) {
                        window['swal'](result.msg, result.detailMsg, "info");
                    }
                }
            })
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