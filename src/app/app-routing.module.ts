import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './common/not-found/not-found.component';

/**
 * 根路由
 * 
 * blog ---- 博客
 * 以后会添加官网路由
 */
const routes: Routes = [
    {
        path: '',
        redirectTo: 'timeWait',
        pathMatch: 'full'
    },
    {
        path: 'timeWait',
        loadChildren:'./time-wait/time-wait.module#TimeWaitModule'
    },
    {   
        path: 'blog',
        loadChildren: './blog/blog.module#BlogModule'
    },
    {
        path: '**',
        component: NotFoundComponent
    }
    // ,
    // {
    //     path: 'admin',
    //     loadChildren: './admin/admin.module#AdminModule'
    // }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}