import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogSixtyComponent } from './home-ru-blog-sixty/home-ru-blog-sixty.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogSixtyComponent }];

@NgModule({
  declarations: [HomeRuBlogSixtyComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SixtyRuBlogModule {}
