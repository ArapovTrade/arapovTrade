import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredFiveComponent } from './home-uk-blog-onehundred-five/home-uk-blog-onehundred-five.component';



import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredFiveComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredFiveComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class OnehundredFiveUkBlogModule { }
