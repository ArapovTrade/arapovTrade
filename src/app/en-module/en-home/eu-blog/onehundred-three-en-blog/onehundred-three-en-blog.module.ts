import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredThreeComponent } from './home-en-blog-onehundred-three/home-en-blog-onehundred-three.component';


import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredThreeComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredThreeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class OnehundredThreeEnBlogModule { }
