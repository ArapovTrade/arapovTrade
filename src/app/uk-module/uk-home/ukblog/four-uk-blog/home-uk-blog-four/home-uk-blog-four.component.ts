import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-four',
  templateUrl: './home-uk-blog-four.component.html',
  styleUrl: './home-uk-blog-four.component.scss',
})
export class HomeUkBlogFourComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Основні причини втрати депозиту - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Основні причини втрати депозиту в Трейдінгу',
    });
  }
}
