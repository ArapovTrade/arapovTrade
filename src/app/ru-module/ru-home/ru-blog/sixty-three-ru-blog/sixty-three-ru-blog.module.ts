import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogSixtyThreeComponent } from './home-ru-blog-sixty-three/home-ru-blog-sixty-three.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogSixtyThreeComponent }];

@NgModule({
  declarations: [HomeRuBlogSixtyThreeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SixtyThreeRuBlogModule {}
