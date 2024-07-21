import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogThreeComponent } from './home-uk-blog-three/home-uk-blog-three.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogThreeComponent }];

@NgModule({
  declarations: [HomeUkBlogThreeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThreeUkBlogModule {}
