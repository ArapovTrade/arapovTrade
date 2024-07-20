import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-twenty-eight',
  templateUrl: './home-ru-twenty-eight.component.html',
  styleUrl: './home-ru-twenty-eight.component.scss',
})
export class HomeRuTwentyEightComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Основные ценовые фигуры в техническом анализе - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Ценовые фигуры технического анализа ',
    });
  }
}
