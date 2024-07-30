import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogTwentyThreeComponent } from './home-uk-blog-twenty-three/home-uk-blog-twenty-three.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeUkBlogTwentyThreeComponent },
];

@NgModule({
  declarations: [HomeUkBlogTwentyThreeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentyThreeUkBlogModule {}
