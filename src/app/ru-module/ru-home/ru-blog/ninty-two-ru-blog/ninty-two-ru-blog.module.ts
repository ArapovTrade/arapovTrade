import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogNintyTwoComponent } from './home-ru-blog-ninty-two/home-ru-blog-ninty-two.component';



import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogNintyTwoComponent }];

@NgModule({
  declarations: [HomeRuBlogNintyTwoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class NintyTwoRuBlogModule { }
