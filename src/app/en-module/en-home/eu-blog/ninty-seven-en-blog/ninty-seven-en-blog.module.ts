import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogNintySevenComponent } from './home-en-blog-ninty-seven/home-en-blog-ninty-seven.component';



import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogNintySevenComponent }];

@NgModule({
  declarations: [HomeEnBlogNintySevenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class NintySevenEnBlogModule { }
