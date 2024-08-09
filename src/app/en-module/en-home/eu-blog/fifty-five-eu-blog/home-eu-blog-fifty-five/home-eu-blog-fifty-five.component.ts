import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-eu-blog-fifty-five',
  templateUrl: './home-eu-blog-fifty-five.component.html',
  styleUrl: './home-eu-blog-fifty-five.component.scss',
})
export class HomeEuBlogFiftyFiveComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Scalping in trading - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Scalping in trading: what do beginners need to know?',
    });
  }
}
