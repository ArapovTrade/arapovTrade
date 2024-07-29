import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-seventeen',
  templateUrl: './home-en-blog-seventeen.component.html',
  styleUrl: './home-en-blog-seventeen.component.scss',
})
export class HomeEnBlogSeventeenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Top myths about Trading - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Top myths about Trading and mistakes made by beginners',
    });
  }
}
