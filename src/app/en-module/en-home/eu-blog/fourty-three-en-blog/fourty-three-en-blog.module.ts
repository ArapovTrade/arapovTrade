import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogFourtyThreeComponent } from './home-en-blog-fourty-three/home-en-blog-fourty-three.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeEnBlogFourtyThreeComponent },
];

@NgModule({
  declarations: [HomeEnBlogFourtyThreeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtyThreeEnBlogModule {}
