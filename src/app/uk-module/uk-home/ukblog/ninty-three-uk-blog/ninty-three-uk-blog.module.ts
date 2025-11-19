import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogNintyThreeComponent } from './home-uk-blog-ninty-three/home-uk-blog-ninty-three.component';


import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component:  HomeUkBlogNintyThreeComponent }];

@NgModule({
  declarations: [HomeUkBlogNintyThreeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class NintyThreeUkBlogModule { }
