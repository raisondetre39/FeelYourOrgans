import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { IIotIndicator, IIndicatorValue, IIndicatorList, IDotValue, IIndicatorInfo } from 'src/app/shared/interfaces/indicator.interface';
import { IOTInfo } from 'src/app/shared/interfaces/iot.interface';
import { Subject } from 'rxjs';
import { GraphsService } from './graphs.service';
import { takeUntil, take } from 'rxjs/operators';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { IUser, IFullUserInfo } from 'src/app/shared/interfaces/user.interface';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit, OnDestroy {

  generateData: IIndicatorList[] = [];
  indificators: IIndicatorInfo[];
  firstCall = false;
  public lineChartData: ChartDataSets[] = [
    { data: [0], label: 'Noun' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }
      ]
    },
    annotation: null
  };
  public lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(255,255,255)',
      borderColor: 'rgba(0,255,169)',
      pointBackgroundColor: 'rgba(0,255,169)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];
  currentUser: IUser;
  fullUserInfo: IFullUserInfo;
  deviceIndicator: IOTInfo;

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  private destroy$ = new Subject<void>();
  constructor(private analyticsService: GraphsService,
              private userService: UserService,
              private authenticationService: AuthenticationService) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.getIndicators();
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.userService.getUser(this.currentUser.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.fullUserInfo = res;
        this.getDeviceInfo();
      });
  }

  getDeviceInfo(): void {
    this.analyticsService.getDevice(this.fullUserInfo.iotId, this.fullUserInfo.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.deviceIndicator = res;
          this.setData();
        },
        () => {
        }
      );
  }

  setData(): void {
    this.deviceIndicator.iotIndicators.forEach((iotIndicator: IIotIndicator) => {
      const dataVal = [];
      iotIndicator.records.forEach(( data: IIndicatorValue ) => {
        dataVal.push({
          dataNumber: data.value,
          labelName: data.recordDate
        });
      });
      this.generateData.push(
        {
          display: false,
          id: iotIndicator.indicatorId,
          indicatorData: dataVal
        }
      );
    });
  }

  displayGrap(indicatorId: number): void {
    this.firstCall = true;
    const indicator = this.deviceIndicator
    .iotIndicators.find(x => x.indicatorId === indicatorId);
    const colorRed = indicator.records.some(x => x.isCritical);
    this.lineChartColors = [
      {
        backgroundColor: 'rgba(255,255,255)',
        borderColor: colorRed ? 'rgba(255,0,59)' : 'rgba(0,255,169)',
        pointBackgroundColor:  colorRed ? 'rgba(255,0,59)' : 'rgba(0,255,169)' ,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ];
    this.displayOn(indicatorId);
    this.getLineChartData(indicatorId);
    this.getlineChartLabels(indicatorId);
  }

  getActiveIndicatorName(): string {
    const name = this.getIndicatorName(this.generateData.find(x => x.display === true)?.id);
    return name;
  }

  getActiveIndicatorDescription(): string {
    const discription = this.getIndicatorDescription(this.generateData.find(x => x.display === true)?.id);
    return discription;
  }

  getLineChartData(indicatorId: number): void {
    const dataX = [];
    this.generateData.find(x => x.id === indicatorId)
      .indicatorData.forEach((data: IDotValue) => dataX.push(data.dataNumber));
    this.lineChartData = [{ data: dataX, label: 'Graphs'}];
  }

  getlineChartLabels(indicatorId: number): void {
    const dataY: Label[] = [];
    this.generateData.find(x => x.id === indicatorId)
      .indicatorData.forEach((data: IDotValue) => dataY.push(data.labelName));
    this.lineChartLabels = dataY;
  }

  displayOn(indicatorId: number) {
    this.generateData.forEach(x => x.display = false);
    this.generateData.find(x => x.id === indicatorId).display = true;
  }

  getIndicators(): void {
    this.analyticsService.getIndicators()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.indificators = data);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getIndicatorName(indicatorId: number): string {
    if (indicatorId !== null && indicatorId !== undefined) {
      return this.indificators.find(x => x.id === indicatorId).name;
    }
    return '';
  }

  getIndicatorDescription(indicatorId: number): string {
    if (indicatorId !== null && indicatorId !== undefined) {
      return this.indificators.find(x => x.id === indicatorId).description;
    }
    return '';
  }

}
