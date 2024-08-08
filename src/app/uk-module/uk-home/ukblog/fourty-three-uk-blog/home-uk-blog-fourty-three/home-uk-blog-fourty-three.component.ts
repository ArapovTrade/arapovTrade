import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-fourty-three',
  templateUrl: './home-uk-blog-fourty-three.component.html',
  styleUrl: './home-uk-blog-fourty-three.component.scss',
})
export class HomeUkBlogFourtyThreeComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Смарт Мані - стратегія за якою торгують Банки - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Смарт Мані - стратегія за якою торгують Банки! Навчання трейдингу',
    });
  }
}
