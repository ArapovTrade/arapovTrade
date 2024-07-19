import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-twenty-eight',
  templateUrl: './home-uk-twenty-eight.component.html',
  styleUrl: './home-uk-twenty-eight.component.scss',
})
export class HomeUkTwentyEightComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Основні цінові фігури в технічному аналізі - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Цінові фігури технічного аналізу',
    });
  }
}
