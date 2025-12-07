import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredTwoComponent } from './home-uk-blog-onehundred-two/home-uk-blog-onehundred-two.component';



import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredTwoComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredTwoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class OnehundredTwoUkBlogModule { }
