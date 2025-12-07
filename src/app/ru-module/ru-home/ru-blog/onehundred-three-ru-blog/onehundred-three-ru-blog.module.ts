import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredThreeComponent } from './home-ru-blog-onehundred-three/home-ru-blog-onehundred-three.component';



import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredThreeComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredThreeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class OnehundredThreeRuBlogModule { }
