import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogComponent } from './blog.component';

import { BlogDefaultComponent } from './blog-default/blog-default.component';

import { ArticleDetailComponent } from './blog-article-detail/blog-article-detail.component';

import { BlogWritePostComponent } from './blog-write-post/blog-write-post.component';

import { BlogAboutComponent } from './blog-about/blog-about.component';

// import { AuthGuard } from './auth-guard';

/**
 * 博客路由
 * 
 * default	---- 博客首页
 * about	---- 关于作者
 */
const routes: Routes = [
	{
		path: '',
		component: BlogComponent,
		// canActivate: [AuthGuard],
		children: [
			{
				path: 'default/:currentBlogUserID',
				component:BlogDefaultComponent
			},
			{
				path: 'articleDetail/:articleID',
				component:ArticleDetailComponent
			},
			{
				path: 'about/:currentBlogUserID',
				component:BlogAboutComponent
			},
			{
				path: 'writePost',
				component: BlogWritePostComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BlogRoutingModule { }
