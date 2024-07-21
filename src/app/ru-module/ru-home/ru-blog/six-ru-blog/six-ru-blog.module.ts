import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogSixComponent } from './home-ru-blog-six/home-ru-blog-six.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogSixComponent }];

@NgModule({
  declarations: [HomeRuBlogSixComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SixRuBlogModule {}
