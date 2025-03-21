import { Component } from '@angular/core';
import { LangService } from '../../../../servises/lang.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-disclaimerua',
  templateUrl: './disclaimerua.component.html',
  styleUrl: './disclaimerua.component.scss',
})
export class DisclaimeruaComponent {
  constructor(private meta: Meta,
    private titleService: Title,private lang: LangService) {}

  ngOnInit(): void {
    this.lang.setNumber(1);

    this.titleService.setTitle('Відмова від відповідальності - ArapovTrade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        "Будь-яка інформація, що розміщується на даному Веб-ресурсі або надається в процесі        навчання є інформацією загального        характеру і може використовуватись лише як освітня або пізнавальна.",
    });
  }
}
