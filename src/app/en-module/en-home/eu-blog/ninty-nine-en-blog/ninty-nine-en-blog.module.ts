import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogNintyNineComponent } from './home-en-blog-ninty-nine/home-en-blog-ninty-nine.component';



import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogNintyNineComponent }];

@NgModule({
  declarations: [HomeEnBlogNintyNineComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class NintyNineEnBlogModule { }
