import { AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  RendererFactory2, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
  import { Subscription } from 'rxjs';
  declare var AOS: any;
  import { ThemeservService } from '../../servises/themeserv.service';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { LangService } from '../../servises/lang.service';

@Component({
  selector: 'app-ru-home',
  templateUrl: './ru-home.component.html',
  styleUrl: './ru-home.component.scss',
})
export class RuHomeComponent implements OnInit, AfterViewInit, OnDestroy {
    private renderer: Renderer2;
  constructor(
    private router: Router,
    private meta: Meta,
    private titleService: Title,
    private lang: LangService,
    private cdr:ChangeDetectorRef,
     private themeService:ThemeservService,

    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
  ) {
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     if (typeof window !== 'undefined') {
    //       // Ваш код, который использует window
    //       window.scrollTo(0, 0);
    //     }
    //   }
    // });
    this.renderer = rendererFactory.createRenderer(null, null);

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
  isMenuOpen = false;

  openMenu() {
    this.isMenuOpen = true;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  // toggleMenu() {
  //   this.isMenuOpen = !this.isMenuOpen;
  // }
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      this.dropdownOpen = false; // Закрываем меню языков, если открываем навигацию
    }
  } 
  isDark!:boolean  ;
  languages = ['ua', 'en', 'ru']; // какие языки нужны
  currentLang = 'ru';
  dropdownOpen = false;
  menuOpen: boolean = false;




  registForm: any;

  ngOnInit(): void {
    this.lang.setNumber(2);

    this.registForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      userEmail: new FormControl(null, [Validators.email, Validators.required]),
      userMessage: new FormControl('', Validators.required),
    });
    this.titleService.setTitle(
      'Обучение трейдингу с нуля бесплатно | Игорь Арапов'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.addTag({
      name: 'description',
      content:
        'Авторские курсы трейдинга от Игоря Арапова: обучение с нуля, стратегии, психология и успех на крипто и фондовых рынках с ArapovTrade.',
    });
    this.meta.addTag({
      name: 'keywords',
      content:
        'курсы трейдинга, трейдинг,  валюты, обучение трейдингу, бесплатное обучение трейдингу, обучение трейдингу бесплатно, обучение трейдингу криптовалют, трейдинг курсы бесплатно, трейдинг с нуля, курсы по трейдингу',
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
  
    scrollToRegistration() {
      const element = document.getElementById('registration');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  
    navigateToStudy() {
      this.router.navigateByUrl('/ru/studying');
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
  //popup
  flag: boolean = false;
  flagTrue: boolean = true;
  popuptoggle() {
    this.flag = !this.flag;
    this.flagTrue = !this.flagTrue;
    // this.registForm.reset();
  }

  onSubmit(registForm: FormGroup) {
    if (
      registForm.value.userName &&
      registForm.value.userEmail &&
      registForm.value.userMessage
    ) {
      const templateParams = {
        userName: registForm.value.userName,
        userEmail: registForm.value.userEmail,
        userMessage: registForm.value.userMessage,
      };

      emailjs
        .send(
          'service_qomgf4f',
          'template_jif62uq',
          templateParams,
          'zvCuOnVqiMJMycGQ0'
        )
        .then(
          (result: EmailJSResponseStatus) => {
            console.log(result.text);
            this.registForm.reset(); // Сброс формы после успешной отправки
          },
          (error) => {
            console.error(error.text);
          }
        );
    }
  }
  close() {
    this.registForm.reset();

    this.flag = true;
    this.flagTrue = false;
  }

  //
  scrollToRegistrationRu() {
    const element = document.getElementById('registrationRu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  // navigateToStudy() {
  //   this.router.navigateByUrl('/ru/studying');
  // }
}
