import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogNintyOneComponent } from './home-en-blog-ninty-one/home-en-blog-ninty-one.component';



import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogNintyOneComponent }];

@NgModule({
  declarations: [HomeEnBlogNintyOneComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class NintyOneEnBlogModule { }
