import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ru-studying-home',
  templateUrl: './ru-studying-home.component.html',
  styleUrl: './ru-studying-home.component.scss',
})
export class RuStudyingHomeComponent implements OnInit {
  constructor(
    private router: Router,
    private meta: Meta,
    private titleService: Title
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0);
        }
      }
    });
  }
  ngOnInit(): void {
    this.titleService.setTitle(
      ' Авторское обучение трейдингу онлайн | Курсы трейдинга | Игорь Арапов'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Авторское ⏩ обучение трейдингу от ArapovTrade. ⭐ Дистанционное обучение трейдингу онлайн с нуля от Игоря Арапова.',
    });
    this.meta.addTag({
      name: 'keywords',
      content:
        'курсы трейдинга, трейдинг, обучение трейдингу, обучение трейдингу онлайн, бесплатное обучение трейдингу, дистанционное обучение трейдингу ',
    });
  }
  navigateToHomeWithId() {
    this.router
      .navigateByUrl('/ru/home')
      .then(() => {
        setTimeout(() => {
          this.scrollToRegistration();
        }, 100);
      })
      .catch((err) => {
        console.error('Navigation error:', err);
      });
  }
  scrollToRegistration() {
    const element = document.getElementById('registrationRu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.error('Element with id "registrationRu" not found');
    }
  }
}
