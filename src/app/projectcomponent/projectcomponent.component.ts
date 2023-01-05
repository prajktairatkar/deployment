import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { projectNewData } from 'src/data';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '../shared/api.service';
import * as XLSX from 'xlsx';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DatePipe } from '@angular/common';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { SubdialogComponent } from '../subdialog/subdialog.component';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { response } from 'express';

export interface ProjectData {
  projectname: string;
  // Id: string;
  start_date: Date;
  end_date: Date;
  skills_required: string;
  project_manager: string;
  mg_lead: string;
  millennial_spoc: string;
  millennials: string;
  staff: string;
  status: string;
  project_status: string;
  current_millenials: string;
  Project_links: string;
  comments: string;
  track: string;
  SUB_BU: string;
  Supply_skill: string;
}
export interface SubTask {
  taskid: string;
  taskname: string;
  startdate: string;
  duration: number;
  progress: number;
}

@Component({
  selector: 'app-projectcomponent',
  templateUrl: './projectcomponent.component.html',
  styleUrls: ['./projectcomponent.component.css'],
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
export class ProjectcomponentComponent implements OnInit {
  content: any = '';
  dataSource: MatTableDataSource<ProjectData>;
  dataSource2!: MatTableDataSource<SubTask>;
  ItemsArray: any[] = [];
  searchIn = 0;
  fileName= 'ExcelSheet.xlsx';
  @ViewChild(MatSort)
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  

  constructor(
    private api: ApiService,
    public datepipe: DatePipe,
    private dialog: MatDialog,
    private subdialog: MatDialog,
    private router: Router
  ) {}
  readData: any;
  readSubData: any;

  ngOnInit(): void {
    this.getAllData();
  }

  title = 'f_s_p';

  columnsToDisplay = ['projectname', 'start_date', 'end_date', 'status'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: ProjectData | null;
  pipe: DatePipe;

  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });

  get fromDate() {
    // console.log(this.filterForm.get('fromDate').value);
    return this.filterForm.get('fromDate').value.toISOString();
  }
  get toDate() {
    // console.log(this.filterForm.get('toDate').value);
    return this.filterForm.get('toDate').value.toISOString();
  }

  showme: boolean = false;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getAllData();
  }

  applyFilter(event: Event) {
    this.searchIn = 0;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyDateFilter() {
    this.searchIn = 1;
    this.dataSource.filter = '' + Math.random();
     //console.log(this.dataSource.filter);
  }

  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: '60%',
        height: '90%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'save') {
          this.getAllData();
        }
      });
  }
  openSubDialog() {
    this.subdialog.open(SubdialogComponent, {
      width: '60%',
      height: '90%',
    });
    // .afterClosed()
    // .subscribe((val) => {
    //   if (val == 'save') {
    //     this.getAllData();
    //   }
    // });
  }
  getSubtaskID(name: any) {
    this.api.gettaskData(name).subscribe((res) => {
      console.log('Get All Sub Data', res);
      this.ItemsArray = res.data;
      this.dataSource2 = new MatTableDataSource(this.readData);
    });
  }
  getAllData() {
    this.api.getAllData().subscribe(
      (res) => {
        // console.log('Get All Data', res);
        this.readData = res.data;
        console.log(this.readData);
        // console.log(this.readData);
        for (let i = 0; i < this.readData.length; i++) {
          this.readData[i]['stafflist'] = this.readData[i]['staff'].split(',');

          // console.log(this.readData[i]['stafflist']);
        }
        // for (let i = 0; i < this.readData.length; i++) {
        //   for (let j = 0; j < this.readData[i]['stafflist'].length; j++) {
        //     // console.log(this.readData[i].stafflist[j]);
        //     var myHTML =
        //       '<a href = "/resorce/">' + this.readData[i].stafflist[j] + '</a>';

        //     this.readData[i].stafflist[j] = myHTML.replace(/<[^>]+>/g, '');
        //     console.log(this.readData[i].stafflist[j]);
        //   }
        // }
        // for (let i = 0; i < this.readData.length; i++) {
        //   this.readData[i]['start_date'] = this.datepipe.transform(
        //     this.readData[i]['start_date'],
        //     'yyyy-MM-dd'
        //   );
        // }
        // for (let i = 0; i < this.readData.length; i++) {
        //   this.readData[i]['end_date'] = this.datepipe.transform(
        //     this.readData[i]['end_date'],
        //     'yyyy-MM-dd'
        //   );
        //   console.log(this.readData[i]['id']);
        // }
        this.dataSource = new MatTableDataSource(this.readData);
        console.log(this.dataSource);
        this.content = this.dataSource;
        console.log(this.content);
      },
      (errorResponse) => {
        console.log(errorResponse);
      },
      () => {
        this.pipe = new DatePipe('en');
        this.dataSource.filterPredicate = (data, filter) => {
          // console.log('Byee');
          if (this.searchIn == 1) {
            if (this.fromDate && this.toDate) {
              // var val =
              //   data.end_date >= this.fromDate && data.end_date <= this.toDate;
              // console.log(val);
              return (
                data.end_date >= this.fromDate &&
                data.end_date <= this.toDate &&
                data.status == 'Complete'
              );
            }
          } else {
            const datasrc =
              data['projectname'] +
              data['skills_required'] +
              data['project_manager'] +
              data['mg_lead'] +
              data['millennial_spoc'] +
              data['millennials'] +
              data['staff'] +
              data['status'] +
              data['project_status'] +
              data['current_millenials'] +
              data['Project_links'] +
              data['comments'] +
              data['track'] +
              data['SUB_BU'] +
              data['Supply_skill'];

            return datasrc.trim().toLowerCase().indexOf(filter) != -1;
          }
          return true;
        };
      }
    );
  }

  editproject(val: any) {
    this.dialog
      .open(DialogComponent, {
        width: '60%',
        height: '90%',
        data: val,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'update') {
          this.getAllData();
        }
      });
  }
  deleteproject(id: any) {
    this.api.deleteProject(id).subscribe({
      next: (res) => {
        alert('Deleted Successfully');
        this.getAllData();
      },
      error: () => {
        alert('Error While deleting the record');
      },
    });
  }
  editsubtask(subval: any) {
    this.subdialog.open(SubdialogComponent, {
      width: '60%',
      height: '90%',
      data: subval,
    });
    // .afterClosed()
    // .subscribe((val) => {
    //   if (val == 'update') {
    //     this.getAllData();
    //   }
    // });
  }
  deletesubtask(id: any) {
    this.api.deleteTask(id).subscribe({
      next: (res) => {
        alert('Deleted Successfully');
        window.location.reload();
      },
      error: () => {
        alert('Error While deleting the record');
      },
    });
  }
  
  }