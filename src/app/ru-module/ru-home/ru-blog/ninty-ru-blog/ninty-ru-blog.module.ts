import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogNintyComponent } from './home-ru-blog-ninty/home-ru-blog-ninty.component';



import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogNintyComponent }];

@NgModule({
  declarations: [HomeRuBlogNintyComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class NintyRuBlogModule { }
