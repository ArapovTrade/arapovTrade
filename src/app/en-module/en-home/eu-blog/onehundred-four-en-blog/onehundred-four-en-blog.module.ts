import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogOnehundredFourComponent } from './home-en-blog-onehundred-four/home-en-blog-onehundred-four.component';



import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogOnehundredFourComponent }];

@NgModule({
  declarations: [HomeEnBlogOnehundredFourComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class OnehundredFourEnBlogModule { }
