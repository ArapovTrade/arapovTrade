import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-thirty-two',
  templateUrl: './home-uk-thirty-two.component.html',
  styleUrl: './home-uk-thirty-two.component.scss',
})
export class HomeUkThirtyTwoComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Стоп-ордер - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Стоп ордери що це та як використовувати?',
    });
  }
}
