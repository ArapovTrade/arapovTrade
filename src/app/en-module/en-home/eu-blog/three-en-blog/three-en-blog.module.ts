import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogThreeComponent } from './home-en-blog-three/home-en-blog-three.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogThreeComponent }];

@NgModule({
  declarations: [HomeEnBlogThreeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThreeEnBlogModule {}
