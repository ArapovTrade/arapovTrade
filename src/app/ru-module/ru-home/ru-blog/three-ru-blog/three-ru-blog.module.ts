import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogThreeComponent } from './home-ru-blog-three/home-ru-blog-three.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogThreeComponent }];

@NgModule({
  declarations: [HomeRuBlogThreeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThreeRuBlogModule {}
