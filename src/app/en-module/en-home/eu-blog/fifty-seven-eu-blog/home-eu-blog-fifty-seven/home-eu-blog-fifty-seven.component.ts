import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-eu-blog-fifty-seven',
  templateUrl: './home-eu-blog-fifty-seven.component.html',
  styleUrl: './home-eu-blog-fifty-seven.component.scss',
})
export class HomeEuBlogFiftySevenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Indicators in trading - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Indicators in trading - all the pros and cons of using them',
    });
  }
}
