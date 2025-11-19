import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogNintyFourComponent } from './home-ru-blog-ninty-four/home-ru-blog-ninty-four.component';



import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogNintyFourComponent }];

@NgModule({
  declarations: [HomeRuBlogNintyFourComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class NintyFourRuBlogModule { }
