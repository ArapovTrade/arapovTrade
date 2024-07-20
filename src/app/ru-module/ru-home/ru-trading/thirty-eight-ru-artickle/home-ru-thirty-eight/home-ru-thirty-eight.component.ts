import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-thirty-eight',
  templateUrl: './home-ru-thirty-eight.component.html',
  styleUrl: './home-ru-thirty-eight.component.scss',
})
export class HomeRuThirtyEightComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Специфика управления капиталом в трейдинге - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Управление капиталом в трейдинге',
    });
  }
}
