import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ru-home-page',
  templateUrl: './ru-home-page.component.html',
  styleUrl: './ru-home-page.component.scss',
})
export class RuHomePageComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  scrollToRegistrationRu() {
    const element = document.getElementById('registrationRu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  ngOnInit(): void {
    this.titleService.setTitle(
      'Курсы трейдинга Авторское обучение трейдингу онлайн | Игорь Арапов'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Авторские ⏩ курсы трейдинга от Игоря Арапова. ⭐ Обучение трейдингу с нуля от ArapovTrade.',
    });
    this.meta.addTag({
      name: 'keywords',
      content:
        'курсы трейдинга, трейдинг, биржа, финансы, акции, валюты, обучение трейдингу, курсы, бесплатное обучение трейдингу',
    });
  }
}
