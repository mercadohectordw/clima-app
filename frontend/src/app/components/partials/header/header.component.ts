import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  lang: string = "en";

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.lang = this.translate.currentLang;
  }

  changeLang(newLang:string): void {
    if ( this.lang != newLang && (newLang == "es" || newLang == "en")){
      localStorage.setItem("lang", newLang);
      this.translate.use(newLang);
      window.location.reload();
    }
  }
}
