import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogSixtyThreeComponent } from './home-en-blog-sixty-three/home-en-blog-sixty-three.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogSixtyThreeComponent }];

@NgModule({
  declarations: [HomeEnBlogSixtyThreeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SixtyThreeEnBlogModule {}
