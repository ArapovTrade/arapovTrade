import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogSeventeenComponent } from './home-ru-blog-seventeen/home-ru-blog-seventeen.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogSeventeenComponent }];

@NgModule({
  declarations: [HomeRuBlogSeventeenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SeventeenRuBlogModule {}
