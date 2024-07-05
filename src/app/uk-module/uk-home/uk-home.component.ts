import {
  Component,
  Inject,
  OnInit,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-uk-home',
  templateUrl: './uk-home.component.html',
  styleUrl: './uk-home.component.scss',
})
export class UkHomeComponent implements OnInit {
  private renderer: Renderer2;
  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private meta: Meta,
    private titleService: Title
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (typeof window !== 'undefined') {
          // Ваш код, который использует window
          window.scrollTo(0, 0);
        }
      }
    });
  }
  ngOnInit(): void {
    this.titleService.setTitle('Навчання трейдингу');
    this.setCanonicalURL('https://arapov.trade/uk/home');
  }
  setCanonicalURL(url: string) {
    // const canURL = url === undefined ? window.location.href : url;
    // this.meta.updateTag({ rel: 'canonical', href: canURL });
    const link: HTMLLinkElement = this.renderer.createElement('link');
    this.renderer.setAttribute(link, 'rel', 'canonical');
    this.renderer.setAttribute(link, 'href', url); // Ошибка возникает здесь, если url может быть undefined
    const head = this.document.getElementsByTagName('head')[0];
    const existingLink = this.document.querySelector('link[rel="canonical"]');
    if (existingLink) {
      this.renderer.removeChild(head, existingLink);
    }
    this.renderer.appendChild(head, link);
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
}
