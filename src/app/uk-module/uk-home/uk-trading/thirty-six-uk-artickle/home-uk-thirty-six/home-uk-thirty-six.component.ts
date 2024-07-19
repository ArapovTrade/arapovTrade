import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-thirty-six',
  templateUrl: './home-uk-thirty-six.component.html',
  styleUrl: './home-uk-thirty-six.component.scss',
})
export class HomeUkThirtySixComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Розподіл торгових систем. Тривалість угоди - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Види торгових систем у трейдингу. По таймінгу угод',
    });
  }
}
