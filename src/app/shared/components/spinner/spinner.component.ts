import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '@app/shared/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  providers: [SpinnerService]
})
export class SpinnerComponent implements OnInit {
  isloading$;
  constructor(private spinnerService: SpinnerService) {
    this.isloading$ = this.spinnerService.isLoading$;
  }

  ngOnInit(): void {}
}
