import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredFiveComponent } from './home-ru-blog-onehundred-five/home-ru-blog-onehundred-five.component';



import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredFiveComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredFiveComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class OnehundredFiveRuBlogModule { }
