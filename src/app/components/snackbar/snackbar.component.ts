import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'lb-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.sass'],
})
export class SnackbarComponent implements OnInit {

  

  @ViewChild('register') succesTemplate!: TemplateRef<any>

  constructor(private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  private getStandarConfig(): MatSnackBarConfig<any> {
    return {
      duration: 2000,
      horizontalPosition: 'end',
    }
  }

  openSucess(textContent:string) {
    this.snackbar.openFromComponent(SnackbarComponent, {
      ...this.getStandarConfig(),
      panelClass: ['green-snackbar', 'login-snackbar'],
      data:{ message: textContent }
    })
    
  }

  openTemplate() {
    this.snackbar.openFromTemplate(this.succesTemplate, {
      ...this.getStandarConfig(),
      panelClass: ['green-snackbar', 'login-snackbar']
    })
  }

}
