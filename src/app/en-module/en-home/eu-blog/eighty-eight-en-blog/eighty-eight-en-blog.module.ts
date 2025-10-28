import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogEightyEightComponent } from './home-en-blog-eighty-eight/home-en-blog-eighty-eight.component';



import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogEightyEightComponent }];

@NgModule({
  declarations: [HomeEnBlogEightyEightComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EightyEightEnBlogModule { }
