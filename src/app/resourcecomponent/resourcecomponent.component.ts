import { Component, OnInit, ViewChild } from '@angular/core';
import { resourceNewData } from 'src/data';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
// import {  PageEvent } from '@angular/material';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DatePipe } from '@angular/common';
import { ApiService } from '../shared/api.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogresourceComponent } from '../dialogresource/dialogresource.component';
import { ActivatedRoute } from '@angular/router';
import { SrcollService } from './srcoll.service';

export interface ResourceData {
  EmpId: number;
  // position: number;
  EmpName: string;
  Email: string;
  ProjectName: string;
  ProjectStartDate: Date;
  ProjectEndDate: Date;
  // ProjectStatus: string;
  AccountMappedto: string;
  Capgeminijoiningdate: Date;
  MGJoiningdate: Date;
  Grade: string;
  Mentor: string;
  Primaryskill: string;
  Secondaryskill: string;
  Training1: string;
  Training2: string;
  BaseLocation: string;
  ReportingLocation: string;
  Gender: string;
  Assetusing: string;
  phoneno: number;
  ProjectName1: string;
  ProjectStartDate1: Date;
  ProjectEndDate1: Date;
  ProjectName2: string;
  ProjectStartDate2: Date;
  ProjectEndDate2: Date;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     EmpId: 45674510,
//     EmpName: 'Abcdef',
//     Email: 'abc@.com',
//     ProjectName: `asdf`,
//     ProjectStartDate: `5/6/22`,
//     ProjectEndDate: `5/1/22`,
//     AccountMappedto: `MG`,
//     Capgeminijoiningdate: `05-05-2022`,
//     MGJoiningdate: `19-06-2022`,
//     Grade: `A4`,
//     Mentor: `Sumitha`,
//     Primaryskill: `Python,Java,C++,SQL`,
//     Secondaryskill: `AWS,Scala,Html,CSS,PySpark`,
//     Training1: `AGILE,AWS`,
//     Training2: `Automation`,
//     BaseLocation: `Bengaluru`,
//     ReportingLocation: `Bengaluru`,
//     Gender: `Female`,
//     Assetusing: `Laptop`,
//     phoneno: 123,
//     ProjectName1: `aaaa`,
//     ProjectStartDate1: '23/05/2022',
//     ProjectEndDate1: '23/06/2022',
//     ProjectName2: `eee`,
//     ProjectStartDate2: `20/06/2022`,
//     ProjectEndDate2: '9/09/2022',
//   },
//   {
//     EmpId: 46231189,
//     EmpName: 'Apeksha Santhosh Kohle',
//     Email: 'apeksha-santosh.kolhe@capgemini.com',
//     ProjectName: `Resource Utilization site`,
//     ProjectStartDate: `10/6/22`,
//     ProjectEndDate: `15/1/22`,
//     AccountMappedto: `MG`,
//     Capgeminijoiningdate: `05-05-2022`,
//     MGJoiningdate: `19-06-2022`,
//     Grade: `A4`,
//     Mentor: `Sumitha`,
//     Primaryskill: `Python`,
//     Secondaryskill: `AWS,Scala,Html,CSS,PySpark`,
//     Training1: `AGILE,AWS`,
//     Training2: `Django`,
//     BaseLocation: `Mumbai`,
//     ReportingLocation: `Pune`,
//     Gender: `Female`,
//     Assetusing: `Laptop`,
//     phoneno: 345,
//     ProjectName1: `fefe`,
//     ProjectStartDate1: '30/06/2022',
//     ProjectEndDate1: '30/09/2022',
//     ProjectName2: `-`,
//     ProjectStartDate2: `-`,
//     ProjectEndDate2: `-`,
//   },
//   {
//     EmpId: 46231520,
//     EmpName: 'Prajakta Ashok Iratkar',
//     Email: 'prajkta-ashok.iratkar@capgemini.com',
//     ProjectName: `Resource Utilization site`,
//     ProjectStartDate: `15/6/22`,
//     ProjectEndDate: `20/1/22`,
//     AccountMappedto: `MG`,
//     Capgeminijoiningdate: `05-05-2022`,
//     MGJoiningdate: `19-06-2022`,
//     Grade: `A4`,
//     Mentor: `Sumitha`,
//     Primaryskill: `Python,Java,C++`,
//     Secondaryskill: `AWS,Scala,Html,CSS,PySpark,Kafka`,
//     Training1: `AGILE,AWS`,
//     Training2: `Django,flask`,
//     BaseLocation: `Mumbai`,
//     ReportingLocation: `Pune`,
//     Gender: `Female`,
//     Assetusing: `Laptop`,
//     phoneno: 567,
//     ProjectName1: `bbb`,
//     ProjectStartDate1: '2/09/2022',
//     ProjectEndDate1: '15/09/2022',
//     ProjectName2: `-`,
//     ProjectStartDate2: `-`,
//     ProjectEndDate2: `-`,
//   },
//   {
//     EmpId: 46231184,
//     EmpName: 'Rajeshwari N S',
//     Email: 'rajeshwari.c.rajeshwari@capgemini.com',
//     ProjectName: `Resource Utilization site`,
//     ProjectStartDate: `20/6/22`,
//     ProjectEndDate: `25/1/22`,
//     AccountMappedto: `MG`,
//     Capgeminijoiningdate: `05-05-2022`,
//     MGJoiningdate: `19-06-2022`,
//     Grade: `A4`,
//     Mentor: `Sumitha`,
//     Primaryskill: `Python,Java`,
//     Secondaryskill: `AWS,Scala,Html,CSS,PySpark,Kafka`,
//     Training1: `AGILE,AWS`,
//     Training2: `Automation`,
//     BaseLocation: `Bengaluru`,
//     ReportingLocation: `Bengaluru`,
//     Gender: `Female`,
//     Assetusing: `Laptop`,
//     phoneno: 789,
//     ProjectName1: `aeae`,
//     ProjectStartDate1: '05/07/2022',
//     ProjectEndDate1: '25/07/2022',
//     ProjectName2: `drdr`,
//     ProjectStartDate2: `23/07/2022`,
//     ProjectEndDate2: `30/09/2022`,
//   },
//   {
//     EmpId: 46230570,
//     EmpName: 'Shivram B Singh',
//     Email: 'shivram-b.singh@capgemini.com',
//     ProjectName: `Resource Utilization site`,
//     ProjectStartDate: `25/6/22`,
//     ProjectEndDate: `30/1/22`,
//     AccountMappedto: `MG`,
//     Capgeminijoiningdate: `05-05-2022`,
//     MGJoiningdate: `19-06-2022`,
//     Grade: `A4`,
//     Mentor: `Sumitha`,
//     Primaryskill: `Python,sql`,
//     Secondaryskill: `AWS`,
//     Training1: `AGILE,AWS`,
//     Training2: ``,
//     BaseLocation: `Bengaluru`,
//     ReportingLocation: `Bengaluru`,
//     Gender: `Male`,
//     Assetusing: `Laptop`,
//     phoneno: 7019596991,
//     ProjectName1: `-`,
//     ProjectStartDate1: '-',
//     ProjectEndDate1: '-',
//     ProjectName2: `-`,
//     ProjectStartDate2: `-`,
//     ProjectEndDate2: `-`,
//   },
//   {
//     EmpId: 46230691,
//     EmpName: 'Sneha Gawai',
//     Email: 'sneha-dayaram.gawai@capgemini.com',
//     ProjectName: `Resource Utilization site`,
//     ProjectStartDate: `1/7/22`,
//     ProjectEndDate: `5/7/22`,
//     AccountMappedto: `MG`,
//     Capgeminijoiningdate: `05-05-2022`,
//     MGJoiningdate: `19-06-2022`,
//     Grade: `A4`,
//     Mentor: `Sumitha`,
//     Primaryskill: `Python`,
//     Secondaryskill: `AWS,redshift,s3,snowflake`,
//     Training1: `AGILE,AWS`,
//     Training2: `Azure900`,
//     BaseLocation: `Mumbai`,
//     ReportingLocation: `Mumbai`,
//     Gender: `Female`,
//     Assetusing: `Laptop`,
//     phoneno: 1234,
//     ProjectName1: `-`,
//     ProjectStartDate1: '-',
//     ProjectEndDate1: '-',
//     ProjectName2: `indind`,
//     ProjectStartDate2: `23/08/2022`,
//     ProjectEndDate2: `30/10/2022`,
//   },
//   {
//     EmpId: 46177562,
//     EmpName: 'Sowmya Ranjan Nayak',
//     Email: 'soumya-ranjan.nayak@capgemini.com',
//     ProjectName: `Resource Utilization site`,
//     ProjectStartDate: `6/7/22`,
//     ProjectEndDate: `11/7/22`,
//     AccountMappedto: `MG`,
//     Capgeminijoiningdate: `01-12-2022`,
//     MGJoiningdate: `19-12-2021`,
//     Grade: `A4`,
//     Mentor: `Sumitha`,
//     Primaryskill: `HTML,CSS,Javascript`,
//     Secondaryskill: `AWS,redshift,s3,snowflake`,
//     Training1: `AGILE,AWS`,
//     Training2: `Angular`,
//     BaseLocation: `Bengaluru`,
//     ReportingLocation: `Bengaluru`,
//     Gender: `Male`,
//     Assetusing: `Laptop`,
//     phoneno: 2345,
//     ProjectName1: `trtr`,
//     ProjectStartDate1: '31/08/2022',
//     ProjectEndDate1: '30/10/2022',
//     ProjectName2: `-`,
//     ProjectStartDate2: `-`,
//     ProjectEndDate2: `-`,
//   },
// ];

@Component({
  selector: 'app-resourcecomponent',
  templateUrl: './resourcecomponent.component.html',
  styleUrls: ['./resourcecomponent.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ResourcecomponentComponent implements OnInit {
  dataSource!: MatTableDataSource<ResourceData>;
  staffid!: string;
  length: any;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(
    private api: ApiService,
    private resdialog: MatDialog,
    public datepipe: DatePipe,
    private scrollService: SrcollService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => (this.staffid = params['id']));
  }
  readData: any;
  readProData: any;
  elementid: any;

  ngOnInit(): void {
    this.getResAllData();

    if (this.staffid) {
      this.getstaffid(this.staffid);
    }
  }

  title = 'f_s_p';
  // displayedColumns: string[] = ['EmpId', 'EmpName', 'Email', 'Grade'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);

  columnsToDisplay = ['EmpId', 'EmpName', 'Grade', 'Email'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: ResourceData | null;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.dataSource.data = data;
  }
  getstaffid(val: any) {
    var found: boolean;
    var searchitem = val;
    this.api.getAllResData().subscribe((res) => {
      // console.log('Get All Data', res);
      this.readData = res.data;
      for (let i = 0; i < this.readData.length; i++) {
        this.readData[i]['EmpFirstName'] = this.readData[i]['EmpName']
          .split(' ')
          .slice(0, -1)
          .join(' ')
          .toLowerCase();
        // console.log(this.readData[i]['EmpFirstName']);
      }
      for (var i = 0; i < this.length; i++) {
        // console.log(this.readData[i].EmpFirstName);
        if (this.readData[i].Email == searchitem) {
          this.elementid = this.readData[i].id;
          this.scrollService.scrollToElementById(this.elementid);
          found = true;
          break;
        }
      }
      if (!found) {
        alert('No such Record Found');
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openResDialog() {
    this.resdialog
      .open(DialogresourceComponent, {
        width: '60%',
        height: '90%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'save') {
          this.getResAllData();
        }
      });
  }

  getResAllData() {
    this.api.getAllResData().subscribe((res) => {
      console.log('Get All Data', res);
      this.readData = res.data;
      this.length = this.readData.length;
      this.dataSource = new MatTableDataSource(this.readData);
      for (let i = 0; i < this.readData.length; i++) {
        this.readData[i]['EmpFirstName'] = this.readData[i]['EmpName']
          .split(' ')
          .slice(0, -1)
          .join(' ')
          .toLowerCase();
        // console.log(this.readData[i]['EmpFirstName']);
      }
    });
  }

  getResoucePro(val: any) {
    this.api.getProjectName(val).subscribe((res) => {
      console.log('Get All pro name Data', res);
      this.readProData = res.data;
    });
  }

  editresource(val: any) {
    this.resdialog
      .open(DialogresourceComponent, {
        width: '60%',
        height: '90%',
        data: val,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'update') {
          this.getResAllData();
        }
      });
  }
  deleteresource(id: any) {
    this.api.deleteResource(id).subscribe({
      next: (res) => {
        alert('Deleted Successfully');
        this.getResAllData();
      },
      error: () => {
        alert('Error While deleting the record');
      },
    });
  }
}
