import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '@app/shared/services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // this.dataService.getDataAPI();
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
