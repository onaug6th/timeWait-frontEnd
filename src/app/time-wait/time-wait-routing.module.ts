import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { SquareComponent } from './square/square.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { UserForgetComponent } from './user-space/user-forget/user-forget.component';
import { UserSettingComponent } from './user-space/user-setting/user-setting.component';

import { ForumComponent } from './forum/forum.component';
import { ForumPostDetailComponent } from './forum/forum-post-detail/forum-post-detail.component';

import { WallComponent } from './wall/wall.component';

import { SearchComponent } from './search/search.component';

import { NotFoundComponent } from '../common/not-found/not-found.component';
/**
 * 博客路由
 * 
 * default	---- 博客首页
 * about	---- 关于作者
 */
const routes: Routes = [
    {
        path: '',
        redirectTo: 'homePage',
        pathMatch:'full'
    },
    {
        path: 'homePage',
        component: HomePageComponent
    },
    {
        path: 'square',
        component: SquareComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'userSpace',
        loadChildren: './user-space/user-space.module#UserSpaceModule'
    },
    {
        path: 'userSetting',
        component: UserSettingComponent
    },
    {
        path: 'userForget',
        component: UserForgetComponent
    },
    {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule'
    },
    {
        path: 'forum',
        component: ForumComponent
    },
    {
        path: 'forum/forumPostDetail/:postID',
        component: ForumPostDetailComponent
    },
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'search/:param',
        component: SearchComponent
    },
    {
        path: 'wall',
        component: WallComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TimeWaitRoutingModule { }
