import { Component, OnInit, HostListener,AfterViewInit, ChangeDetectorRef, OnDestroy} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router ,NavigationEnd } from '@angular/router';
import { ThemeservService } from '../../../../servises/themeserv.service';
 import { Subscription } from 'rxjs';
declare var AOS: any;

@Component({
  selector: 'app-en-crypto-homepage',
  templateUrl: './en-crypto-homepage.component.html',
  styleUrl: './en-crypto-homepage.component.scss'
})
export class EnCryptoHomepageComponent  implements OnInit, AfterViewInit, OnDestroy{
  constructor(
        private meta: Meta,
        private titleService: Title,
        private router: Router,
        private cdr:ChangeDetectorRef,
        private themeService:ThemeservService
      ) {
        
      }
    
      ngAfterViewInit() {
      setTimeout(() => {
        if (typeof AOS !== 'undefined') {
          AOS.init({
            duration: 1000,
            once: false,
            offset: 100
          });
        }
      }, 500); // Задержка 0.5s
    }
      isDark!:boolean  ;
      languages = ['ua', 'en', 'ru']; // какие языки нужны
      currentLang = 'en';
      dropdownOpen = false;
      menuOpen: boolean = false;
      ngOnInit() {
        this.titleService.setTitle(
          'Stock Market Trading Training for Traders | Trading Course by Igor Arapov'
        );
        this.meta.updateTag({ name: 'robots', content: 'index, follow' });
        this.meta.addTag({
          name: 'description',
          content:
            'Igor Arapov`s Free Trading Course: 130+ Articles and 70 Videos. Study Technical Analysis, Risk Management, and Trading Strategies Online',
        });
    
        this.meta.addTag({
          name: 'keywords',
          content:
            'Trading, Trading education , Technical analysis, Financial exchange, Trading system, Igor Arapov',
        });
    
        this.meta.updateTag({ name: 'datePublished', content: '2025-06-07' });
        this.meta.updateTag({
          property: 'og:image',
          content: 'assets/img/photo_mainpage.jpg',
        });
    
         
        this.themeSubscription =this.themeService.getTheme().subscribe(data=>{
          this.isDark=data;
            this.cdr.detectChanges();
        })
    
    
        this.routerSubscription = this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
            if (typeof window !== 'undefined') {
              window.scrollTo(0, 0);
            }
          }
        });
      }
      toggleTheme() {
        this.isDark = !this.isDark;
        this.themeService.setTheme(this.isDark)
         
         this.refreshAOS();
    
    
      }
    refreshAOS() {
        if (typeof AOS !== 'undefined') {
          setTimeout(() => {
            AOS.refresh(); // Обновление позиций AOS
            this.cdr.detectChanges(); // Принудительное обнаружение изменений
          }, 100); // Задержка для синхронизации
        } else {
          console.warn('AOS is not defined, refresh skipped');
        }
      }
       
      toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
      }
      selectLang(lang: string) {
        this.currentLang = lang;
    
        this.dropdownOpen = false;
    
         
      }
      navigateTo(path: string) {
        this.router.navigate([path]);
      }
      toggleMenu(): void {
        this.menuOpen = !this.menuOpen;
        if (this.menuOpen) {
          this.dropdownOpen = false; // Закрываем меню языков, если открываем навигацию
        }
      } 
       private routerSubscription!: Subscription;
      private themeSubscription!: Subscription;
       ngOnDestroy() {
        // Отписка от подписок
        if (this.routerSubscription) {
          this.routerSubscription.unsubscribe();
        }
        if (this.themeSubscription) {
          this.themeSubscription.unsubscribe();
        }
      } 
      hovered: string | null = null;
}
