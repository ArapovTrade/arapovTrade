import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEuBlogFiftySevenComponent } from './home-eu-blog-fifty-seven/home-eu-blog-fifty-seven.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEuBlogFiftySevenComponent }];

@NgModule({
  declarations: [HomeEuBlogFiftySevenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FiftySevenEuBlogModule {}
