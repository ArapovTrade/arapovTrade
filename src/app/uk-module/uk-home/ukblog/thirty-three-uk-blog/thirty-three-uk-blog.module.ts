import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogThirtyThreeComponent } from './home-uk-blog-thirty-three/home-uk-blog-thirty-three.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeUkBlogThirtyThreeComponent },
];

@NgModule({
  declarations: [HomeUkBlogThirtyThreeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyThreeUkBlogModule {}
