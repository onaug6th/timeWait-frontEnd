import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CommonService } from '../../services/common.service';
import { SquareService } from './square.service';
import { simAnim } from '../../common/sim-anim';
@Component({
    templateUrl: './square.component.html',
    styleUrls: ['./square.component.scss'],
    providers: [SquareService],
    animations: [simAnim]
})

export class SquareComponent implements OnInit {

    public avatarCDN = "http://oz1y7s5ij.bkt.clouddn.com/images/common/head.jpg";

    //  公告列表
    public noticeList: Array<object>;

    constructor(
        public CommonService: CommonService,
        public SquareService: SquareService
    ) { }

    ngOnInit() {
        //  发射
        this.CommonService.subject.next(Object.assign({}, { isTimeWait: true }));
        this.getForumPostList();
    }

    //  获取论坛帖子列表
    public getForumPostList() {
        const param = {
            postType: 4,
            currentPageNum: 1,
            pageSize: 5
        }
        return this.SquareService.getForumPostList(param).subscribe(result => {
            if (result) {
                if (result.code == 0) {
                    this.noticeList = [];
                    this.noticeList = result.data.list;
                }
                if (result.code == 1) {
                    window['swal'](result.msg, result.detailMsg, "info");
                }
            }
        });
    }
}