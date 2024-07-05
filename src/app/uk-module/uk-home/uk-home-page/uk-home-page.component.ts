import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-uk-home-page',
  templateUrl: './uk-home-page.component.html',
  styleUrl: './uk-home-page.component.scss',
})
export class UkHomePageComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Авторське навчання трейдингу');
    // this.meta.addTag({
    //   rel: 'canonical',
    //   href: 'https://arapov-trading.vercel.app/uk/home',
    // });
    this.setCanonicalURL('https://arapov.trade/uk/home');
  }

  setCanonicalURL(url?: string) {
    const canURL = url === undefined ? window.location.href : url;
    this.meta.updateTag({ rel: 'canonical', href: canURL });
  }

  scrollToRegistration() {
    const element = document.getElementById('registration');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
