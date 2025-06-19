import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { LangService } from '../../../../servises/lang.service';

@Component({
  selector: 'app-uk-studying-home',
  templateUrl: './uk-studying-home.component.html',
  styleUrl: './uk-studying-home.component.scss',
})
export class UkStudyingHomeComponent implements OnInit {
  constructor(
    private router: Router,
    private meta: Meta,
    private titleService: Title,
    private lang: LangService
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
    this.lang.setNumber(1);

    this.titleService.setTitle(
      'Курси трейдингу онлайн від Ігоря Арапова | ArapovTrade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Дистанційне навчання трейдингу з нуля від Ігоря Арапова: авторські курси, стратегії, психологія для успіху на ринках з ArapovTrade.',
    });
    this.meta.addTag({
      name: 'keywords',
      content:
        'курси трейдингу, трейдинг, навчання трейдингу, навчання трейдингу онлайн, безкоштовне навчання трейдингу, дистанційне навчання трейдингу, ',
    });
  }
  navigateToHomeWithId() {
    this.router.navigateByUrl('/uk').then(() => {
      setTimeout(() => {
        this.scrollToRegistration();
      }, 100);
    });
  }
  scrollToRegistration() {
    const element = document.getElementById('registration');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
