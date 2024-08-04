import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEuBlogThirtyThreeComponent } from './home-eu-blog-thirty-three/home-eu-blog-thirty-three.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeEuBlogThirtyThreeComponent },
];

@NgModule({
  declarations: [HomeEuBlogThirtyThreeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyThreeEuBlogModule {}
