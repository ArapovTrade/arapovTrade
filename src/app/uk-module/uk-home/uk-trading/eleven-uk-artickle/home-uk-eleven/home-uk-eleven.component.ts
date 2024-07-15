import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-eleven',
  templateUrl: './home-uk-eleven.component.html',
  styleUrl: './home-uk-eleven.component.scss',
})
export class HomeUkElevenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Дата валютування - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Що таке СВОП на ринку Форекс?',
    });
  }
}
