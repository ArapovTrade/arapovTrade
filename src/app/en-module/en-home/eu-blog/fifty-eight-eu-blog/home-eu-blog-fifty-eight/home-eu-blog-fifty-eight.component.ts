import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-eu-blog-fifty-eight',
  templateUrl: './home-eu-blog-fifty-eight.component.html',
  styleUrl: './home-eu-blog-fifty-eight.component.scss',
})
export class HomeEuBlogFiftyEightComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Averaging in trading - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Averaging in trading, what is it and how to use it?',
    });
  }
}
