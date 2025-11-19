import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogNintyOneComponent } from './home-ru-blog-ninty-one/home-ru-blog-ninty-one.component';



import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogNintyOneComponent }];

@NgModule({
  declarations: [HomeRuBlogNintyOneComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class NintyOneRuBlogModule { }
