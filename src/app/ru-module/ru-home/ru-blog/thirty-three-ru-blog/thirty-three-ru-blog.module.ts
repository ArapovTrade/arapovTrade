import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogThirtyThreeComponent } from './home-ru-blog-thirty-three/home-ru-blog-thirty-three.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeRuBlogThirtyThreeComponent },
];

@NgModule({
  declarations: [HomeRuBlogThirtyThreeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyThreeRuBlogModule {}
