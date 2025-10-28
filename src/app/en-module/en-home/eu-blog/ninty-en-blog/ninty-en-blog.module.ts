import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogNintyComponent } from './home-en-blog-ninty/home-en-blog-ninty.component';



import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogNintyComponent }];

@NgModule({
  declarations: [HomeEnBlogNintyComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class NintyEnBlogModule { }
