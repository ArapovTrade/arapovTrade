import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-fourty-seven',
  templateUrl: './home-en-blog-fourty-seven.component.html',
  styleUrl: './home-en-blog-fourty-seven.component.scss',
})
export class HomeEnBlogFourtySevenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Fundamental Market Analysis - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Fundamental Analysis | Volumetric market analysis',
    });
  }
}
