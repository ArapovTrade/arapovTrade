import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogOnehundredOneComponent } from './home-ru-blog-onehundred-one/home-ru-blog-onehundred-one.component';



import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogOnehundredOneComponent }];

@NgModule({
  declarations: [HomeRuBlogOnehundredOneComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class OnehundredOneRuBlogModule { }
