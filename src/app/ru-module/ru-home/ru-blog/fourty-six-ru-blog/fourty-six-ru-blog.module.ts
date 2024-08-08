import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogFourtySixComponent } from './home-ru-blog-fourty-six/home-ru-blog-fourty-six.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogFourtySixComponent }];

@NgModule({
  declarations: [HomeRuBlogFourtySixComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtySixRuBlogModule {}
