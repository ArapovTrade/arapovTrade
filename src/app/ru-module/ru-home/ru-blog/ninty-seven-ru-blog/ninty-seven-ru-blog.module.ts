import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogNintySevenComponent } from './home-ru-blog-ninty-seven/home-ru-blog-ninty-seven.component';



import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogNintySevenComponent }];

@NgModule({
  declarations: [HomeRuBlogNintySevenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class NintySevenRuBlogModule { }
