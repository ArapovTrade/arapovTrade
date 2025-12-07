import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredComponent } from './home-uk-blog-onehundred/home-uk-blog-onehundred.component';



import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class OnehundredUkBlogModule { }
