import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-six',
  templateUrl: './home-uk-six.component.html',
  styleUrl: './home-uk-six.component.scss',
})
export class HomeUkSixComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Основні учасники біржі - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Основні учасники біржі. Класифікація та функціонал',
    });
  }
}
