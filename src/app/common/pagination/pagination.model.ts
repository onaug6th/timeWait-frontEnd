/**
 * 分页信息数据模型
 */
export interface PaginationModel {
    /**
     * 当前页码
     */
    currentPageNum?: number;
  
    /**
     * 当前分页条件下的总页数
     */
    totalPages?: number;
  
    /**
     * 当前分页条件下的页码显示数
     */
    pagesShow?: number;
  
    /**
     * 当前分页条件下的显示的页码数组
     */
    pagesShowList?: Array<number>;
  
    /**
     * 前一页页码显示文本
     */
    prevPageText?: string;
  
    /**
     * 后一页页码显示文本
     */
    nextPageText?: string;
  
    /**
     * 前往第一页按钮的显示文本
     */
    firstPageText?: string;
  
    /**
     * 前往最后一页按钮的显示文本
     */
    lastPageText?: string;
  
    /**
     * 前往第一页按钮是否显示
     */
    firstPageShow?: boolean;
  
    /**
     * 前往最后一页按钮是否显示
     */
    lastPageShow?: boolean;
  
    /**
     * 用户自定义字段
     */
    [propName: string]: any;
  }