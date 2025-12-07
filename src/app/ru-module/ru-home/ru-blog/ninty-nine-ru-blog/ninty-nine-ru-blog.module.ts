import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogNintyNineComponent } from './home-ru-blog-ninty-nine/home-ru-blog-ninty-nine.component';



import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogNintyNineComponent }];

@NgModule({
  declarations: [HomeRuBlogNintyNineComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class NintyNineRuBlogModule { }
