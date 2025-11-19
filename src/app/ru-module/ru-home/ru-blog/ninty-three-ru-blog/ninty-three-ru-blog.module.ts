import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogNintyThreeComponent } from './home-ru-blog-ninty-three/home-ru-blog-ninty-three.component';


import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogNintyThreeComponent }];

@NgModule({
  declarations: [HomeRuBlogNintyThreeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class NintyThreeRuBlogModule { }
