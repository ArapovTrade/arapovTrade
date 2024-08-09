import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogFiftyTwoComponent } from './home-ru-blog-fifty-two/home-ru-blog-fifty-two.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogFiftyTwoComponent }];

@NgModule({
  declarations: [HomeRuBlogFiftyTwoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FiftyTwoRuBlogModule {}
