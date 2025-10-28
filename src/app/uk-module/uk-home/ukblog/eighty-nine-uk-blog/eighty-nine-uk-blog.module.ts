import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogEightyNineComponent } from './home-uk-blog-eighty-nine/home-uk-blog-eighty-nine.component';



import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogEightyNineComponent }];

@NgModule({
  declarations: [HomeUkBlogEightyNineComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EightyNineUkBlogModule { }
