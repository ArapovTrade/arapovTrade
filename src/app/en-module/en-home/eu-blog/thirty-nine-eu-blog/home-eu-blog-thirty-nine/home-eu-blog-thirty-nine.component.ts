import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-eu-blog-thirty-nine',
  templateUrl: './home-eu-blog-thirty-nine.component.html',
  styleUrl: './home-eu-blog-thirty-nine.component.scss',
})
export class HomeEuBlogThirtyNineComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Volumetric Market Analysis - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'SmartMoney| SMART MANI | Volumetric Market Analysis',
    });
  }
}
