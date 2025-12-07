import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredFourComponent } from './home-ru-blog-onehundred-four/home-ru-blog-onehundred-four.component';



import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredFourComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredFourComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class OnehundredFourRuBlogModule { }
