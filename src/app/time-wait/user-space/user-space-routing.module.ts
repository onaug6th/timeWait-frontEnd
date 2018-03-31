import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserSpaceComponent } from './user-space.component';

import { UserSpaceLayoutComponent } from './user-space-layout/user-space-layout.component';

import { BlogSettingComponent } from './user-space-layout/user-space-default/blog-setting/blog-setting.component';
import { ForumSettingComponent } from './user-space-layout/user-space-default/forum-setting/forum-setting.component';

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
		component: UserSpaceComponent,
		canActivate: [AuthGuard],
		children: [
            {
                path: '',
                redirectTo: 'default',
                pathMatch: 'full'
			},
			{
				path:'default',
				component:UserSpaceLayoutComponent
			},
			{
				path:'blogSetting',
				component:BlogSettingComponent
			},
			{
				path:'forumSetting',
				component:ForumSettingComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UserSpaceRoutingModule { }
