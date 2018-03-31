import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminSystemComponent } from './adminSystem/adminSystem.component';

import { AdminSystemLoginComponent } from './adminSystemLogin/adminSystemLogin.component';

import { AuthGuard } from './auth.guard';

/**
 * 用户空间路由
 * 
 * default	---- 博客首页
 * about	---- 关于作者
 */
const routes: Routes = [
	{
		path: '',
		component: AdminSystemLoginComponent
    },
    {
        path: 'adminSystem',
        component:AdminSystemComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule { }
