import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-sixteen',
  templateUrl: './home-ru-sixteen.component.html',
  styleUrl: './home-ru-sixteen.component.scss',
})
export class HomeRuSixteenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Поведенческие риски - Arapov.trade');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Психология трейдинга. Поведенческие риски',
    });
  }
}
