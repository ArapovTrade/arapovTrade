import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-thirty-one',
  templateUrl: './home-uk-thirty-one.component.html',
  styleUrl: './home-uk-thirty-one.component.scss',
})
export class HomeUkThirtyOneComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Ринковий ордер - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Ринкові ордери, що це і як використовувати?',
    });
  }
}
