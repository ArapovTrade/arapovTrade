import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogNintyFourComponent } from './home-en-blog-ninty-four/home-en-blog-ninty-four.component';



import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogNintyFourComponent }];

@NgModule({
  declarations: [HomeEnBlogNintyFourComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class NintyFourEnBlogModule { }
