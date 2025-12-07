import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredFiveComponent } from './home-en-blog-onehundred-five/home-en-blog-onehundred-five.component';



import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredFiveComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredFiveComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class OnehundredFiveEnBlogModule { }
