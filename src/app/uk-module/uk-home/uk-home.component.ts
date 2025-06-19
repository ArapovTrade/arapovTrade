import {
  Component,
  Inject,
  OnInit,
  Renderer2,
  RendererFactory2,
} from '@angular/core';

import { NavigationEnd } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

import { LangService } from '../../servises/lang.service';

@Component({
  selector: 'app-uk-home',
  templateUrl: './uk-home.component.html',
  styleUrl: './uk-home.component.scss',
})
export class UkHomeComponent implements OnInit {
  private renderer: Renderer2;
  constructor(
    private meta: Meta,
    private router: Router,

    private titleService: Title,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
    private lang: LangService
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0);
        }
      }
    });
  }

  isMenuOpen = false;

  openMenu() {
    this.isMenuOpen = true;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit() {
    this.titleService.setTitle('Авторське навчання трейдингу від Ігоря Арапова');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Онлайн-курс трейдингу від Ігоря Арапова — стартуйте з нуля і навчіться впевнено торгувати на фінансових ринках крок за кроком.',
    });
    this.meta.addTag({
      name: 'keywords',
      content:
        'курси трейдингу, трейдинг, валюти, навчання трейдингу, безкоштовне навчання трейдингу, навчання трейдингу безкоштовно, навчання трейдингу криптовалют, трейдинг курси безкоштовно, трейдинг з нуля, курси по трейдингу',
    });

    this.lang.setNumber(1);
  }
  
  scrollToRegistration() {
    const element = document.getElementById('registration');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  navigateToStudy() {
    this.router.navigateByUrl('/uk/studying');
  }
}
