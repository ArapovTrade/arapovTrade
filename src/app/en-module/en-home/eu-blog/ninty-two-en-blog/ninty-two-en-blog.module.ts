import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogNintyTwoComponent } from './home-en-blog-ninty-two/home-en-blog-ninty-two.component';



import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogNintyTwoComponent }];

@NgModule({
  declarations: [HomeEnBlogNintyTwoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class NintyTwoEnBlogModule { }
