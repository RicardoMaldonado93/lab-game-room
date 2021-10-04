import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AgeRangeValidator,
  PhoneValidator,
} from '../../helpers/Custom-Validators';
import { DialogFactoryService } from './../../services/dialog-factory.service';
import { EGames } from './../../services/game-stats.service';
import { SnackbarService } from './../../services/snackbar.service';
import { ISurvey, SurveyService } from './../../services/survey.service';

@Component({
  selector: 'lb-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.sass'],
})
export class SurveyComponent implements OnInit {
  @ViewChild('surveyTemplate') surveyTemplate!: TemplateRef<any>;
  survey!: FormGroup;
  rating: number = 0;
  games!: { key: string; value: EGames }[];

  constructor(
    private dialog: DialogFactoryService,
    private surveyService: SurveyService,
    private snackbar: SnackbarService
  ) {
    this.survey = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      age: new FormControl('', [
        AgeRangeValidator(18, 99),
        Validators.required,
        Validators.maxLength(2),
      ]),
      phone: new FormControl('', [
        PhoneValidator,
        Validators.maxLength(10),
        Validators.required,
      ]),
      likePage: new FormControl(null, [Validators.required]),
      favouriteGame: new FormControl('', [Validators.required]),
      rating: new FormControl('', [Validators.required]),
    });

    this.setGames();
  }

  cancel() {
    this.dialog.close();
  }
  
  ngOnInit() {
    setTimeout(() => {
      this.dialog.open({ template: this.surveyTemplate });
    }, 20);
  }

  async submit() {
    const survey: ISurvey = {
      age: this.survey.get('age')?.value,
      favouriteGame: this.survey.get('favouriteGame')?.value,
      lastName: this.survey.get('lastName')?.value,
      name: this.survey.get('name')?.value,
      likePage: this.survey.get('likePage')?.value!,
      phone: this.survey.get('phone')?.value,
      rating: this.survey.get('rating')?.value,
    };

    const result = await this.surveyService.saveSurvey(survey);

    if (result) {
      this.snackbar.openSuccess('Thank you! 😊');
      this.survey.reset();
      this.dialog.close();
    } else this.snackbar.openError('Ups error has been occurred ☹️');
  }

  private setGames() {
    this.games = [
      { key: 'Hangman', value: EGames.hangman },
      { key: 'Asked', value: EGames.asked },
      { key: 'Minor or Mayor', value: EGames['minor-mayor'] },
      { key: 'Earth Collapse', value: EGames['earth-collapse'] },
    ];
  }
}
