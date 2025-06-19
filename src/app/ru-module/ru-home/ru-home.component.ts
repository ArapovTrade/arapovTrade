import { Component, OnInit } from '@angular/core';
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
export class RuHomeComponent implements OnInit {
  constructor(
    private router: Router,
    private meta: Meta,
    private titleService: Title,
    private lang: LangService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (typeof window !== 'undefined') {
          // Ваш код, который использует window
          window.scrollTo(0, 0);
        }
      }
    });
  }

  registForm: any;

  ngOnInit(): void {
    this.lang.setNumber(2);

    this.registForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      userEmail: new FormControl(null, [Validators.email, Validators.required]),
      userMessage: new FormControl('', Validators.required),
    });
    this.titleService.setTitle(
      'Авторское обучение трейдингу онлайн | Игорь Арапов'
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
  navigateToStudy() {
    this.router.navigateByUrl('/ru/studying');
  }
}
