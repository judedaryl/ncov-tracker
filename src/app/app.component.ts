import { Component, OnInit } from '@angular/core';
import { HeaderService } from './services/header.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  today = new Date();

  showAlert = true;

  showHeader$: Observable<boolean>;
  constructor(headerService: HeaderService) {

    this.showHeader$ = headerService.showChanges
    this.showAlert = localStorage.getItem('show-alert') !== 'false';
  }


 
  closeAlert() {
    this.showAlert = false;
    localStorage.setItem('show-alert', 'false')
  }

  ngOnInit(): void {

  }

}