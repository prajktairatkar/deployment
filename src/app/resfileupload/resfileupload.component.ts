import { Component, OnInit } from '@angular/core';
// import { appendFile } from 'fs';
import * as XLSX from 'xlsx';
import { ApiService } from '../shared/api.service';
import { resourcedetailsModel } from './resfileupload.model';
import { DatePipe } from '@angular/common';
import { getTaskData } from '@syncfusion/ej2-angular-gantt';

@Component({
  selector: 'app-resfileupload',
  templateUrl: './resfileupload.component.html',
  styleUrls: ['./resfileupload.component.css'],
})
export class ResfileuploadComponent implements OnInit {
  constructor(private api: ApiService, public datepipe: DatePipe) {}

  data: any;
  resourcedetailsModelObj: resourcedetailsModel = new resourcedetailsModel();

  ngOnInit(): void {}

  onresFileChange(event: any) {
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
        this.data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
          header: 0,
          raw: false,
          dateNF: 'yyyy-mm-dd',
        });

        for (let i = 0; i < this.data.length; i++) {
          this.data[i]['ProjectStartDate'] = this.datepipe.transform(
            this.data[i]['ProjectStartDate'],
            'yyyy-MM-dd'
          );
          this.data[i]['ProjectEndDate'] = this.datepipe.transform(
            this.data[i]['ProjectEndDate'],
            'yyyy-MM-dd'
          );
          this.data[i]['Capgeminijoiningdate'] = this.datepipe.transform(
            this.data[i]['Capgeminijoiningdate'],
            'yyyy-MM-dd'
          );
          this.data[i]['MGJoiningdate'] = this.datepipe.transform(
            this.data[i]['MGJoiningdate'],
            'yyyy-MM-dd'
          );
          this.data[i]['ProjectStartDate1'] = this.datepipe.transform(
            this.data[i]['ProjectStartDate1'],
            'yyyy-MM-dd'
          );
          this.data[i]['ProjectEndDate1'] = this.datepipe.transform(
            this.data[i]['ProjectEndDate1'],
            'yyyy-MM-dd'
          );
          this.data[i]['ProjectStartDate2'] = this.datepipe.transform(
            this.data[i]['ProjectStartDate2'],
            'yyyy-MM-dd'
          );
          this.data[i]['ProjectEndDate2'] = this.datepipe.transform(
            this.data[i]['ProjectEndDate2'],
            'yyyy-MM-dd'
          );
        }

        // for (let i = 0; i < this.data.length; i++) {
        //   console.log(this.data[i]['ProjectStartDate']);
        // }
        // for (let i = 0; i < this.data.length; i++) {
        //   console.log(this.data[i]['ProjectEndDate']);
        // }
        // for (let i = 0; i < this.data.length; i++) {
        //   console.log(this.data[i]['Capgeminijoiningdate']);
        // }
        // for (let i = 0; i < this.data.length; i++) {
        //   console.log(this.data[i]['MGJoiningdate']);
        // }
        // for (let i = 0; i < this.data.length; i++) {
        //   console.log(this.data[i]['ProjectStartDate1']);
        // }
        // for (let i = 0; i < this.data.length; i++) {
        //   console.log(this.data[i]['ProjectEndDate1']);
        // }
        // for (let i = 0; i < this.data.length; i++) {
        //   console.log(this.data[i]['ProjectStartDate2']);
        // }
        // for (let i = 0; i < this.data.length; i++) {
        //   console.log(this.data[i]['ProjectEndDate2']);
        // }
        // console.log(this.data[i]['startdate']);
        console.log(this.data);
      });
    };
  }

  uploadresFile() {
    this.deleteExistRecrdRes();
    for (let i = 0; i < this.data.length; i++) {
      this.resourcedetailsModelObj.EmpId = this.data[i]['EmpId'];
      this.resourcedetailsModelObj.EmpName = this.data[i]['EmpName'];
      this.resourcedetailsModelObj.Email = this.data[i]['Email'];
      this.resourcedetailsModelObj.ProjectName = this.data[i]['ProjectName'];
      this.resourcedetailsModelObj.ProjectStartDate =
        this.data[i]['ProjectStartDate'];
      this.resourcedetailsModelObj.ProjectEndDate =
        this.data[i]['ProjectEndDate'];
      this.resourcedetailsModelObj.AccountMappedto =
        this.data[i]['AccountMappedto'];
      this.resourcedetailsModelObj.Capgeminijoiningdate =
        this.data[i]['Capgeminijoiningdate'];
      this.resourcedetailsModelObj.MGJoiningdate =
        this.data[i]['MGJoiningdate'];
      this.resourcedetailsModelObj.Grade = this.data[i]['Grade'];
      this.resourcedetailsModelObj.Mentor = this.data[i]['Mentor'];
      this.resourcedetailsModelObj.Primaryskill = this.data[i]['Primaryskill'];
      this.resourcedetailsModelObj.Secondaryskill =
        this.data[i]['Secondaryskill'];
      this.resourcedetailsModelObj.Training1 = this.data[i]['Training1'];
      this.resourcedetailsModelObj.Training2 = this.data[i]['Training2'];
      this.resourcedetailsModelObj.BaseLocation = this.data[i]['BaseLocation'];
      this.resourcedetailsModelObj.ReportingLocation =
        this.data[i]['ReportingLocation'];
      this.resourcedetailsModelObj.Gender = this.data[i]['Gender'];
      this.resourcedetailsModelObj.Assetusing = this.data[i]['Assetusing'];
      this.resourcedetailsModelObj.phoneno = this.data[i]['phoneno'];
      this.resourcedetailsModelObj.ProjectName1 = this.data[i]['ProjectName1'];
      this.resourcedetailsModelObj.ProjectStartDate1 =
        this.data[i]['ProjectStartDate1'];
      this.resourcedetailsModelObj.ProjectEndDate1 =
        this.data[i]['ProjectEndDate1'];
      this.resourcedetailsModelObj.ProjectName2 = this.data[i]['ProjectName2'];
      this.resourcedetailsModelObj.ProjectStartDate2 =
        this.data[i]['ProjectStartDate2'];
      this.resourcedetailsModelObj.ProjectEndDate2 =
        this.data[i]['ProjectEndDate2'];

      console.log(this.resourcedetailsModelObj);
      console.log(this.resourcedetailsModelObj.EmpId);

      this.api.postResourceDetails(this.resourcedetailsModelObj).subscribe(
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
  deleteExistRecrdRes() {
    this.api.deleteResData().subscribe((res) => {
      console.log(res, 'Data deleted');
    });
  }
}
