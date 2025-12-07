import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogOnehundredThreeComponent } from './home-uk-blog-onehundred-three/home-uk-blog-onehundred-three.component';



import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogOnehundredThreeComponent }];

@NgModule({
  declarations: [HomeUkBlogOnehundredThreeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class OnehundredThreeUkBlogModule { }
