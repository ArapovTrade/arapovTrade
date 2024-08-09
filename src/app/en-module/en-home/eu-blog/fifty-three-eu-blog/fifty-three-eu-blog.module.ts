import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEuBlogFiftyThreeComponent } from './home-eu-blog-fifty-three/home-eu-blog-fifty-three.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEuBlogFiftyThreeComponent }];

@NgModule({
  declarations: [HomeEuBlogFiftyThreeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FiftyThreeEuBlogModule {}
