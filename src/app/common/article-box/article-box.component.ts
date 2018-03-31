import { Component,OnInit,Input,ViewChild,ElementRef } from '@angular/core';

export interface ArticleModel{
    // 组件类型 1.文章 2.相册
    size? : string;

    // 组件标题
    title? : string;

    // 组件简介
    intro? : string;
    
}

declare var $: any;

@Component({
    selector:'article-box',
    templateUrl:'./article-box.component.html',
    styleUrls:['./article-box.component.scss']
})

export class ArticleComponent implements OnInit {


    public defaultBoxConfig : ArticleModel = {
        size : "1",
        title : "默认标题",
        intro : "默认介绍"
    }

    @Input()
    public articleID;

    @Input()
    public size = this.defaultBoxConfig.size;

    @Input()
    public title = this.defaultBoxConfig.title;

    @Input()
    public intro = this.defaultBoxConfig.intro;
    
    @Input()
    public type;

    constructor(

    ) { }

    ngOnInit() {
       
    }

}