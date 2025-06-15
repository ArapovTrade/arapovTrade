import { Component } from '@angular/core';
import { LangService } from '../../../../servises/lang.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrl: './disclaimer.component.scss',
})
export class DisclaimerComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private lang: LangService
  ) {}

  ngOnInit(): void {
    this.lang.setNumber(2);
    this.titleService.setTitle('Отказ от ответственности | ArapovTrade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Отказ от ответственности ArapovTrade: информация курса трейдинга носит общий характер и предназначена только для обучения.',
    });
  }
}
