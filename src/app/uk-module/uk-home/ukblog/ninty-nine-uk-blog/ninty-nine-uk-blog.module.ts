import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogNintyNineComponent } from './home-uk-blog-ninty-nine/home-uk-blog-ninty-nine.component';



import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogNintyNineComponent }];

@NgModule({
  declarations: [HomeUkBlogNintyNineComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class NintyNineUkBlogModule { }
