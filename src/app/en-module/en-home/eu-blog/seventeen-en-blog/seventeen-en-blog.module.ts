import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogSeventeenComponent } from './home-en-blog-seventeen/home-en-blog-seventeen.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogSeventeenComponent }];

@NgModule({
  declarations: [HomeEnBlogSeventeenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SeventeenEnBlogModule {}
