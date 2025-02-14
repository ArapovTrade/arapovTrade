import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogSeventyThreeComponent } from './home-uk-blog-seventy-three/home-uk-blog-seventy-three.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeUkBlogSeventyThreeComponent },
];

@NgModule({
  declarations: [HomeUkBlogSeventyThreeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SeventyThreeUkBlogModule {}
