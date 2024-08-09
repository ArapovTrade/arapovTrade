import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogFiftyEightComponent } from './home-ru-blog-fifty-eight/home-ru-blog-fifty-eight.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogFiftyEightComponent }];

@NgModule({
  declarations: [HomeRuBlogFiftyEightComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FiftyEightRuBlogModule {}
