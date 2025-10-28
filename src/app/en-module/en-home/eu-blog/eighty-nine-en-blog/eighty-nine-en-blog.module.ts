import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogEightyNineComponent } from './home-en-blog-eighty-nine/home-en-blog-eighty-nine.component';



import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogEightyNineComponent }];

@NgModule({
  declarations: [HomeEnBlogEightyNineComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EightyNineEnBlogModule { }
