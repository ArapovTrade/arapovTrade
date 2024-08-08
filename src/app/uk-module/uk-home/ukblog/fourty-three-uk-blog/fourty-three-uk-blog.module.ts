import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogFourtyThreeComponent } from './home-uk-blog-fourty-three/home-uk-blog-fourty-three.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeUkBlogFourtyThreeComponent },
];

@NgModule({
  declarations: [HomeUkBlogFourtyThreeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtyThreeUkBlogModule {}
