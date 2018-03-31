/**
 * 注册数据模型
 * @export
 * @interface registerDataModal
 */
export class registerDataModal {
    id?: number;
    userName: string;
    passWord: string;
    confirmPassWord: string;
    email: string;
    registerDate: string;
    [propName: string]: any;
  }