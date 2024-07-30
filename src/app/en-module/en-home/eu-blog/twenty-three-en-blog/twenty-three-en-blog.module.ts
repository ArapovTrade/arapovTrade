import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogTwentyThreeComponent } from './home-en-blog-twenty-three/home-en-blog-twenty-three.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeEnBlogTwentyThreeComponent },
];

@NgModule({
  declarations: [HomeEnBlogTwentyThreeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentyThreeEnBlogModule {}
