import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogFiftyNineComponent } from './home-ru-blog-fifty-nine/home-ru-blog-fifty-nine.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogFiftyNineComponent }];

@NgModule({
  declarations: [HomeRuBlogFiftyNineComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FiftyNineRuBlogModule {}
