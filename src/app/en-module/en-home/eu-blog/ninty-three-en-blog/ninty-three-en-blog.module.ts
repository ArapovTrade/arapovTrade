import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogNintyThreeComponent } from './home-en-blog-ninty-three/home-en-blog-ninty-three.component';



import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogNintyThreeComponent }];

@NgModule({
  declarations: [HomeEnBlogNintyThreeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class NintyThreeEnBlogModule { }
