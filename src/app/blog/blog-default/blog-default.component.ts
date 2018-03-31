import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ArticleComponent } from '../../common/article-box/article-box.component'
import { BlogDefaultService } from './blog-default.service';

import { CommonService } from '../../services/common.service';
import { PaginationModel } from '../../common/pagination/pagination.model';
import { simAnim } from '../../common/sim-anim';

declare var $: any;

@Component({
    templateUrl:'./blog-default.component.html',
    styleUrls:['./blog-default.component.scss'],
    animations: [simAnim]
})

export class BlogDefaultComponent implements OnInit {

    public windowHeight = $(window).height() - $('html').height();

    //  当前博客文章类型
    public nowBlogType:string = "";

    //  当前这个博客的用户ID
    public currentBlogUserID;

    //  当前博客文章列表数据
    public articleList:any = [];


    //  页码样式
    public pageClass:{[propName:string]:boolean} = {
        pagination: true,
        "pagination-sm": true,
        "no-margin": true,
        "pull-right": true,
        "blog":true
    }

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

    constructor(
        public router: Router,
        public CommonService:CommonService,
        public activeRoute: ActivatedRoute,
        public BlogDefaultService:BlogDefaultService
    ) { }

    ngOnInit() {
        // 根据地址参数进行ajax查询
        this.activeRoute.params.subscribe(
            params => {
                this.getArticleList(params["currentBlogUserID"]);
                this.currentBlogUserID = params["currentBlogUserID"];
            }
        );
        this.CommonService.blogDefaultMethod.subscribe(result =>{
            if(result){
                this.togglePostType(result.param);
            }
        });
    }

    /**
     * 切换板块
     * @param {any} num 板块编号
     */
    public togglePostType(num) {
        this.nowBlogType = num;
        this.pageInfo.currentPageNum = 1;
        this.getArticleList(this.currentBlogUserID);
    }


    //  获取当前用户文章列表
    public getArticleList(userID){
        const that = this;
        const param = {
            userID : userID,
            type : this.nowBlogType,
            currentPageNum: this.pageInfo.currentPageNum,
            pageSize: this.pageInfo.pageSize
        };
        return this.BlogDefaultService.getArticleList(param).subscribe(result => {
            if(result){
                if(result.code == 0){
                    this.articleList = [];
                    this.articleList = result.data.list;
                    this.pageInfo.totalPages = result.data.pages;
                }
                if(result.code == 1){
                    window["swal"]({
                        title: "没有找到这个人的博客",
                        text: "去别的地方看看吧",
                        type: "info",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "我知道了"
                    },
                        function (isConfirm) {
                            if (isConfirm) {
                                that.router.navigateByUrl("/timeWait/square");
                            }
                        });
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
        this.getArticleList(this.currentBlogUserID);
    }
}