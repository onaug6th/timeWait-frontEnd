import {
    Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChange,
    SimpleChanges
  } from '@angular/core';
  import * as _ from "lodash";
  import {Util} from "../../common/util";
  import { PaginationModel } from './pagination.model';
  
  /**
   * 默认分页组件配置
   */
  export const DEFAULT_PAGINATION_CONFIG: PaginationModel = {
    currentPageNum: 1,
    totalPages: 1,
    pagesShow: 5,
    pagesShowList: [],
    prevPageText: "‹",
    nextPageText: "›",
    firstPageText: "«",
    lastPageText: "»",
    firstPageShow: true,
    lastPageShow: true
  };
  
  /**
   * 分页组件默认样式配置对象
   * @type {{pagination: boolean; pagination-sm: boolean; no-margin: boolean; pull-right: boolean}}
   */
  export const DEFAULT_PAGINATION_CLASS_CONFIG: { [propName: string]: boolean } = {
    pagination: true,
    "pagination-sm": true,
    "no-margin": true,
    "pull-right": true
  };
  
  @Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
  })
  export class AppPaginationComponent implements OnInit, OnChanges {
    
  
    public showPrevMore: boolean = false;
    
    public showNextMore: boolean = false;
  
  
    @Input()
    public pageClassConfig: { [propName: string]: boolean } = Object.assign({}, DEFAULT_PAGINATION_CLASS_CONFIG);
  
    /**
     * 当前页码
     */
    @Input()
    public currentPageNum: number = DEFAULT_PAGINATION_CONFIG.currentPageNum;
  
    /**
     * 当前分页条件下的总页数
     */
    @Input()
    public totalPages: number = DEFAULT_PAGINATION_CONFIG.totalPages;
  
    /**
     * 当前分页条件下的页码显示数
     */
    @Input()
    public pagesShow: number = DEFAULT_PAGINATION_CONFIG.pagesShow;
  
    /**
     * 当前分页条件下的显示的页码数组
     */
    @Input()
    public pagesShowList: Array<number> = DEFAULT_PAGINATION_CONFIG.pagesShowList;
  
    /**
     * 前一页页码显示文本
     */
    @Input()
    public prevPageText: string = DEFAULT_PAGINATION_CONFIG.prevPageText;
  
    /**
     * 后一页页码显示文本
     */
    @Input()
    public nextPageText: string = DEFAULT_PAGINATION_CONFIG.nextPageText;
  
    /**
     * 前往第一页按钮的显示文本
     */
    @Input()
    public firstPageText: string = DEFAULT_PAGINATION_CONFIG.firstPageText;
  
    /**
     * 前往最后一页按钮的显示文本
     */
    @Input()
    public lastPageText: string = DEFAULT_PAGINATION_CONFIG.lastPageText;
  
    /**
     * 前往第一页按钮是否显示
     */
    @Input()
    public firstPageShow: boolean = DEFAULT_PAGINATION_CONFIG.firstPageShow;
  
    /**
     * 前往最后一页按钮是否显示
     */
    @Input()
    public lastPageShow: boolean = DEFAULT_PAGINATION_CONFIG.lastPageShow;
  
    /**
     * 页码发生改变后事件触发器对象
     * @type {EventEmitter<number>}
     */
    @Output()
    public pageChanged: EventEmitter<number> = new EventEmitter<number>();
  
    /**
     * 页码发生向前翻页改变后事件触发器对象
     * @type {EventEmitter<number>}
     */
    @Output()
    public pagePrevChanged: EventEmitter<number> = new EventEmitter<number>();
  
    /**
     * 页码发生向后翻页改变后事件触发器对象
     * @type {EventEmitter<number>}
     */
    @Output()
    public pageNextChanged: EventEmitter<number> = new EventEmitter<number>();
  
    /**
     * 页码发生翻页，并且翻页后为第一页时的事件触发器对象
     * @type {EventEmitter<boolean>}
     */
    @Output()
    public firstPageChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  
    /**
     * 页码发生翻页，并且翻页后为最后一页时的事件触发器对象
     * @type {EventEmitter<boolean>}
     */
    @Output()
    public lastPageChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  
    constructor(public render: Renderer2, public element: ElementRef) {
    }
  
    ngOnInit() {}
  
    ngOnChanges(changes: SimpleChanges): void {
      this.pagesShowList = this.makePagers(this.currentPageNum, this.totalPages)
    }
  
  
    static pagerGenerator(minValue: number): number[] {
      const target: number[] = new Array(5).fill('').map((v, i) => i + minValue)
      return target
    }
  
  
    /**
     * 根据页码请求查询相关基金配置列表数据,如果当前活动页码就是目标页码，则不进行任何查询
     * 直接返回 -1
     * @param pageNum
     * @returns {number}
     */
    public pageNavigation(pageNum: number): number {
      if (pageNum !== this.currentPageNum) {
        this.currentPageNum = pageNum;
        this.pageChanged.emit(pageNum);
        return pageNum;
      }
      return -1;
    }
  
    /**
     * 基于现有分页信息，查询上一页码的数据,并返回上一页页码，
     * 如果现在是第一页则不进行任何导航，返回-1
     */
    public prevPageNavigation(): number {
      const currentPageNum: number = this.currentPageNum;
      const prevPageNum: number = currentPageNum - 1;
      if (currentPageNum === 1) {
        return -1;
      }
      this.pageNavigation(prevPageNum);
      this.pagePrevChanged.emit(prevPageNum);
      if (prevPageNum === 1) {
        this.firstPageChanged.emit(true);
      }
      return prevPageNum;
    }
  
    /**
     *  基于现有分页信息，查询下一页码的数据，并返回下一页页码，
     *  如果现在是最后一页则不进行任何导航，返回-1
     * @returns {number}
     */
    public nextPageNavigation(): number {
      const totalPages: number = this.totalPages;
      const currentPageNum: number = this.currentPageNum;
      const nextPageNum: number = currentPageNum + 1;
      if (currentPageNum === totalPages) {
        return -1;
      }
      this.pageNavigation(nextPageNum);
      this.pageNextChanged.emit(nextPageNum);
      if (nextPageNum === totalPages) {
        this.lastPageChanged.emit(true);
      }
      return nextPageNum;
    }
  
    //  跳转到指定页数
    public jumpHandle(step: number): void {
      const nextPage = this.currentPageNum + step;
      this.currentPageNum = nextPage < 1 ? 1 : nextPage > this.totalPages ? this.totalPages : nextPage;
      this.pageChanged.emit(this.currentPageNum);
    }
  
    //  生成页码
    public makePagers(current: number, count: number): number[] {
      const pagerCount: number = 7
      if (count < pagerCount) {
        this.setMoreBtn(false, false)
        const target: number[] = AppPaginationComponent.pagerGenerator(2)
        target.length = count - 2 >= 0 ? count - 2 : 0
        return target
      }
      
      const max: number = current + 2
      const min: number = current - 2
      if (max >= count) {
        this.setMoreBtn(true, false)
        return AppPaginationComponent.pagerGenerator(count - 5)
      }
      if (min <= 2) {
        this.setMoreBtn(false, true)
        return AppPaginationComponent.pagerGenerator(2)
      }
      this.setMoreBtn(true, true)
      return AppPaginationComponent.pagerGenerator(min)
    }
  
    
    //  显示更多按钮
    public setMoreBtn(prev: boolean, next: boolean): void {
      this.showPrevMore = prev
      this.showNextMore = next
    }
  
  }
  