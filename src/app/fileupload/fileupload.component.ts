import { Component, OnInit } from '@angular/core';
// import { appendFile } from 'fs';
import * as XLSX from 'xlsx';
import { ApiService } from '../shared/api.service';
import { projectdetailsModel } from './fileupload.model';
import { subtaskModel } from './fileupload.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css'],
})
export class FileuploadComponent implements OnInit {
  constructor(private api: ApiService, public datepipe: DatePipe) {}
  datapjct: any;
  datasub: any;

  projectdetailsModelObj: projectdetailsModel = new projectdetailsModel();
  subtaskModelObj: subtaskModel = new subtaskModel();

  ngOnInit(): void {}

  onFileChange(event: any) {
    console.log(event.target.files);
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event: any) => {
      console.log(event);
      let binaryData = event.target.result;
      let workbook = XLSX.read(binaryData, {
        type: 'binary',
        cellDates: true,
        // dateNF: 'dd/mm/yyyy;@',
      });
      workbook.SheetNames.forEach((sheet) => {
        this.datapjct = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
          header: 0,
          // raw: false,
          dateNF: 'yyyy-mm-dd',
        });
        console.log(this.datapjct.length);
        // for (let i = 0; i < this.datapjct.length; i++) {
        //   this.datapjct[i]['start_date'] = this.datepipe.transform(
        //     this.datapjct[i]['start_date'],
        //     'yyyy-MM-dd'
        //   );
        // }
        // for (let i = 0; i < this.datapjct.length; i++) {
        //   this.datapjct[i]['end_date'] = this.datepipe.transform(
        //     this.datapjct[i]['end_date'],
        //     'yyyy-MM-dd'
        //   );
        // }

        console.log(this.datapjct);

        // for (let i = 0; i < this.data.length; i++)
        //   console.log(this.data[i]['startdate']);
      });
    };
  }

  uploadFile() {
    // this.api.getAllData().subscribe
    this.deleteExistRecrd();
    for (let i = 0; i < this.datapjct.length; i++) {
      this.projectdetailsModelObj.projectname =
        this.datapjct[i]['Project Name'];
      this.projectdetailsModelObj.startdate = this.datapjct[i]['Start Date'];
      this.projectdetailsModelObj.enddate = this.datapjct[i]['End Date'];
      this.projectdetailsModelObj.skillsrequired =
        this.datapjct[i]['Skills Required'];
      this.projectdetailsModelObj.projectmanager =
        this.datapjct[i]['Project Manager'];
      this.projectdetailsModelObj.mglead = this.datapjct[i]['MG Lead'];
      this.projectdetailsModelObj.millennialspoc =
        this.datapjct[i]['Millennial Spoc'];
      this.projectdetailsModelObj.staff = this.datapjct[i]['Team members'];
      this.projectdetailsModelObj.millennials =
        this.datapjct[i]['Millennials Count'];
      this.projectdetailsModelObj.status = this.datapjct[i]['Status'];
      this.projectdetailsModelObj.projectstatus =
        this.datapjct[i]['Project Status'];
      this.projectdetailsModelObj.currentmillenials =
        this.datapjct[i]['Current Millennials'];
      this.projectdetailsModelObj.Projectlinks =
        this.datapjct[i]['Project Details Link'];
      this.projectdetailsModelObj.comments = this.datapjct[i]['Comments'];
      this.projectdetailsModelObj.track = this.datapjct[i]['track'];
      this.projectdetailsModelObj.SUBBU = this.datapjct[i]['SUB_BU'];
      this.projectdetailsModelObj.Supplyskill =
        this.datapjct[i]['Supply_skill'];

      console.log(this.projectdetailsModelObj);

      this.api.postProjectDetails(this.projectdetailsModelObj).subscribe(
        (res) => {
          console.log(res);
        },
        (error) => {
          alert('Something Went Wrong');
        }
      );
    }
    alert('Data upload Successfull');
    // this.api.postProjectDetails(this.data).subscribe(
    //   (res) => {
    //     console.log(res);
    //     alert('Data upload Successfull');
    //   },
    //   (error) => {
    //     alert('Something Went Wrong');
    //   }
    // );
    window.location.reload();
  }
  deleteExistRecrd() {
    this.api.deleteData().subscribe((res) => {
      console.log(res, 'Data deleted');
    });
  }

  onFileChangeNew(event: any) {
    console.log(event.target.files);
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event: any) => {
      console.log(event);
      let binaryData = event.target.result;
      let workbook = XLSX.read(binaryData, {
        type: 'binary',
        cellDates: true,
        // dateNF: 'dd/mm/yyyy;@',
      });
      workbook.SheetNames.forEach((sheet) => {
        this.datasub = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
          header: 0,
          raw: false,
          dateNF: 'yyyy-mm-dd',
        });
        console.log(this.datasub.length);
        for (let i = 0; i < this.datasub.length; i++) {
          this.datasub[i]['Start date'] = this.datepipe.transform(
            this.datasub[i]['Start date'],
            'yyyy-MM-dd'
          );
        }

        console.log(this.datasub);

        // for (let i = 0; i < this.data.length; i++)
        //   console.log(this.data[i]['startdate']);
      });
    };
  }
  uploadFileNew() {
    for (let i = 0; i < this.datasub.length; i++) {
      this.subtaskModelObj.taskname = this.datasub[i]['Task name'];
      this.subtaskModelObj.startdate = this.datasub[i]['Start date'];
      this.subtaskModelObj.duration = this.datasub[i]['Duration'];
      this.subtaskModelObj.progress = this.datasub[i]['Progress'];
      this.subtaskModelObj.projectname = this.datasub[i]['Project Name'];

      console.log(this.subtaskModelObj);

      this.api.postSubtaskDetails(this.subtaskModelObj).subscribe(
        (res) => {
          console.log(res);
        },
        (error) => {
          alert('Something Went Wrong');
        }
      );
    }
    alert('Data upload Successfull');
    window.location.reload();
  }
}
