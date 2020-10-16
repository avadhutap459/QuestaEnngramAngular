import { Component, OnInit, Input } from '@angular/core';
import { ClsQuestionModel, ClsTypeModel, ClsSet6ScoreModel } from 'src/app/Model/question';
import { GooleChart2Service } from './Service/goole-chart.service';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/Service/question.service';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';

declare var google: any;

@Component({
  selector: 'app-score-template',
  templateUrl: './score-template.component.html',
  styleUrls: ['./score-template.component.css']
})
export class ScoreTemplateComponent implements OnInit {

  ScoreDetail: ClsTypeModel[];
  TopScoreDetail: ClsTypeModel[];
  BelowScoreDetail: ClsTypeModel[];
  ScoreDetailForSet6: ClsSet6ScoreModel[];
  height: number;
  weight: number;
  private gLib: any;
  loading = false;
  CurrentTestId: number;
  @Input() Question: ClsQuestionModel;
  error: string;
  ErrorLog: HttpErrorResponse;
  constructor(private gChartService: GooleChart2Service,
    private QuesSVC: QuestionService,
    private _router: Router,
    private _ErrorHandlerService: ErrorHandlerService) { }

  ngOnInit() {

    this.CurrentTestId = this.Question.TestId;
    this.ScoreDetail = Object.assign([], this.Question.ScoreBoard);
    this.ScoreDetailForSet6 = Object.assign([], this.Question.ScoreCardForSet6);
    if (this.Question.CurrentSetId === 1) {
      this.height = 650;
      this.weight = 750;
    } else if (this.Question.CurrentSetId === 2) {
      this.height = 150;
      this.weight = 700;
    } else if (this.Question.CurrentSetId === 3) {
      this.height = 220;
      this.weight = 650;
    } else if (this.Question.CurrentSetId === 4) {
      this.height = 470;
      this.weight = 750;
    } else if (this.Question.CurrentSetId === 5) {
      this.height = 220;
      this.weight = 650;
    }
    else if (this.Question.CurrentSetId === 6) {
      this.height = 250;
      this.weight = 650;
    }


    if (this.Question.CurrentSetId === 6) {
      this.gLib = this.gChartService.getGoogle();
      this.gLib.charts.load('current', { 'packages': ['bar'] });
      this.gLib.charts.setOnLoadCallback(this.drawBarChartForSet6.bind(this));
    } else {
      this.gLib = this.gChartService.getGoogle();
      this.gLib.charts.load("current", { packages: ["corechart"] });
      this.gLib.charts.setOnLoadCallback(this.drawBarChart.bind(this));
    }


  }

  public drawBarChart() {
    try {
      var data = [];
      var Header = ['TypeName', 'Score', { role: 'style' }];
      data.push(Header);
      this.ScoreDetail.forEach(item => {
        var temp = [];
        temp.push(item.TypeName);
        temp.push(item.Score);
        temp.push(item.ColorCode);
        data.push(temp);
      });
      var Chartdata = google.visualization.arrayToDataTable(data);

      var view = new google.visualization.DataView(Chartdata);
      view.setColumns([0, 1,
        {
          calc: "stringify",
          sourceColumn: 1,
          type: "string",
          role: "annotation"
        },
        2]);

      var options = {
        title: 'Typewise Scorecard',
        width: this.weight,
        height: this.height,
        titleTextStyle: {
          color: '#3D414D',
          fontName: "Roboto",
          fontSize: 15,
          bold: false
        },
        fontName: "Roboto",
        legend: {
          position: 'none'
        },
        chart: { title: 'Typewise Scorecard' },
        fontSize: 11,
        bars: 'horizontal', // Required for Material Bar Charts.
        tooltip: { textStyle: { fontName: 'Roboto', fontSize: 12, bold: false } },
        axes: {
          x: {
            0: { side: 'top', label: 'Score' }// Top x-axis.
          }
        },
        hAxis: {
          viewWindow: {
            min: 0,
            max: 100
          },
          ticks: [0, 25, 50, 75, 100]
        },
        bar: { groupWidth: "65%" },

      };


      var barchart = new google.visualization.BarChart(document.getElementById('barchart'));
      barchart.draw(view, options);
    }
    catch (error) {
      this.ErrorLog = error;
      this._ErrorHandlerService.SaveErrorForChartLog(this.ErrorLog, this.CurrentTestId).subscribe(
        data => {
          this._router.navigate(['/ErrorPage', this.CurrentTestId]);
        },
        error => { }
      )

      //  console.log(e); 
    }


  }

  public drawBarChartForSet6() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'TypeName');
    data.addColumn('number', 'Personality');
    data.addColumn('number', 'Presence');

    this.ScoreDetailForSet6.forEach(item => {
      data.addRows([
        [item.SubModuleName, item.PersonalityScore, item.PresenceScore]
      ]);
    });
    var options = {
      width: this.weight,
      height: this.height,
      titleTextStyle: {
        color: '#3D414D',
        fontName: "Roboto",
        fontSize: 15,
        bold: true
      },
      fontName: "Roboto",
      legend: {
        position: 'bottom',
        textStyle: {
          color: '#3D414D',
          fontName: "Roboto"
        }
      },
      fontSize: 11,
      tooltip: { textStyle: { fontName: 'Roboto', fontSize: 5, bold: false } },
      chart: {
        title: 'TypeWise Scorecard'
      },
      bars: 'horizontal', // Required for Material Bar Charts.
     
      hAxis: {
        format: 'number'
      }
    };

    var barchart = new google.charts.Bar(document.getElementById('barchart'));
    barchart.draw(data, options);
 /*google.visualization.events.addListener(barchart, 'ready', function () {
  var canvas;
  var domURL;
  var imageNode;
  var imageURL;
  var svgParent;

  // add svg namespace to chart
  domURL = window.URL || window.webkitURL || window;
  svgParent = document.getElementById('barchart').getElementsByTagName('svg')[0];
  svgParent.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  imageNode = document.getElementById('barchart').cloneNode(true);
  imageURL = domURL.createObjectURL(new Blob([svgParent.outerHTML], {type: 'image/svg+xml'}));
  var image = new Image();
  image.onload = function() {
    canvas = document.getElementById('canvas');
    canvas.setAttribute('width', parseFloat(svgParent.getAttribute('width')));
    canvas.setAttribute('height', parseFloat(svgParent.getAttribute('height')));
    canvas.getContext('2d').drawImage(image, 0, 0);
    console.log(canvas.toDataURL('image/png'));
  }
  image.src = imageURL;
});*/
   
    
  }
  GoToNextSet(UserId, SetId, TestId, TypeId) {
    let IsSuccess;
    this.loading = true;
    this.QuesSVC.SaveAndNextSetOpen(UserId, SetId, TestId, TypeId).subscribe(
      data => {
        IsSuccess = data.isSuccess;
        if (IsSuccess) {
          this._router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
          }
          this._router.onSameUrlNavigation = 'reload';
          this._router.navigate(['/QuestionSeries', TestId]);

          this.loading = false;
        }
      },
      error => {
        if (error.status !== 500) {
          this.ErrorLog = error;
          this._ErrorHandlerService.SaveErrorLog(this.ErrorLog).subscribe(
            data => {
              this._router.navigate(['/ErrorPage', TestId]);
            },
            error => { }
          )
        } else {
          this._router.navigate(['/ErrorPage', TestId]);
        }
      }
    );
  }
  CompleteTest(UserId, TestId) {
    let IsSuccess;
    this.loading = true;
    this.QuesSVC.CompleteUserTest(UserId, TestId).subscribe(
      data => {
        IsSuccess = data.isSuccess;
        if (IsSuccess) {
          this._router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
          }
          this._router.onSameUrlNavigation = 'reload';
          this._router.navigate(['/QuestionSeries', TestId]);

          this.loading = false;
        }
      },
      error => {
        if (error.status !== 500) {
          this.ErrorLog = error;
          this._ErrorHandlerService.SaveErrorLog(this.ErrorLog).subscribe(
            data => {
              this._router.navigate(['/ErrorPage', TestId]);
            },
            error => { }
          )
        } else {
          this._router.navigate(['/ErrorPage', TestId]);
        }
      }
    );
  }





}
