import { LoaderService } from './../../services/loader.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { extend } from 'jquery';

@Component({
  selector: 'lb-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.sass']
})
export class SpinnerComponent implements OnInit {

  view: boolean = true;

  constructor(private loader: LoaderService) { }

  ngOnInit(): void {
    this.loader.isLoading.subscribe(value => {
      this.view = value
    })
  }

}
