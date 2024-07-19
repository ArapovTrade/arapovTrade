import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-thirty',
  templateUrl: './home-uk-thirty.component.html',
  styleUrl: './home-uk-thirty.component.scss',
})
export class HomeUkThirtyComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Види та типи ордерів - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Види та типи ордерів на біржі',
    });
  }
}
