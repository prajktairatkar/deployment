import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-dialogresource',
  templateUrl: './dialogresource.component.html',
  styleUrls: ['./dialogresource.component.css'],
})
export class DialogresourceComponent implements OnInit {
  resourceForm!: FormGroup;
  actionBtn: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogResRef: MatDialogRef<DialogresourceComponent>
  ) {}

  ngOnInit(): void {
    this.resourceForm = this.formBuilder.group({
      EmpId: ['', Validators.required],
      EmpName: ['', Validators.required],
      Email: ['', Validators.required],
      ProjectName: ['', Validators.required],
      ProjectStartDate: ['', Validators.required],
      ProjectEndDate: ['', Validators.required],
      AccountMappedto: ['', Validators.required],
      Capgeminijoiningdate: ['', Validators.required],
      MGJoiningdate: ['', Validators.required],
      Grade: ['', Validators.required],
      Mentor: ['', Validators.required],
      Primaryskill: ['', Validators.required],
      Secondaryskill: ['', Validators.required],
      Training1: ['', Validators.required],
      Training2: ['', Validators.required],
      BaseLocation: ['', Validators.required],
      ReportingLocation: ['', Validators.required],
      Gender: ['', Validators.required],
      Assetusing: ['', Validators.required],
      phoneno: ['', Validators.required],
      ProjectName1: ['', Validators.required],
      ProjectStartDate1: ['', Validators.required],
      ProjectEndDate1: ['', Validators.required],
      ProjectName2: ['', Validators.required],
      ProjectStartDate2: ['', Validators.required],
      ProjectEndDate2: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.resourceForm.controls['EmpId'].setValue(this.editData.EmpId);
      this.resourceForm.controls['EmpName'].setValue(this.editData.EmpName);
      this.resourceForm.controls['Email'].setValue(this.editData.Email);
      this.resourceForm.controls['ProjectName'].setValue(
        this.editData.ProjectName
      );
      this.resourceForm.controls['ProjectStartDate'].setValue(
        this.editData.ProjectStartDate
      );
      this.resourceForm.controls['ProjectEndDate'].setValue(
        this.editData.ProjectEndDate
      );
      this.resourceForm.controls['AccountMappedto'].setValue(
        this.editData.AccountMappedto
      );
      this.resourceForm.controls['Capgeminijoiningdate'].setValue(
        this.editData.Capgeminijoiningdate
      );
      this.resourceForm.controls['MGJoiningdate'].setValue(
        this.editData.MGJoiningdate
      );
      this.resourceForm.controls['Grade'].setValue(this.editData.Grade);
      this.resourceForm.controls['Mentor'].setValue(this.editData.Mentor);
      this.resourceForm.controls['Primaryskill'].setValue(
        this.editData.Primaryskill
      );
      this.resourceForm.controls['Secondaryskill'].setValue(
        this.editData.Secondaryskill
      );
      this.resourceForm.controls['Training1'].setValue(this.editData.Training1);
      this.resourceForm.controls['Training2'].setValue(this.editData.Training2);
      this.resourceForm.controls['BaseLocation'].setValue(
        this.editData.BaseLocation
      );
      this.resourceForm.controls['ReportingLocation'].setValue(
        this.editData.ReportingLocation
      );
      this.resourceForm.controls['Gender'].setValue(this.editData.Gender);
      this.resourceForm.controls['Assetusing'].setValue(
        this.editData.Assetusing
      );
      this.resourceForm.controls['phoneno'].setValue(this.editData.phoneno);
      this.resourceForm.controls['ProjectName1'].setValue(
        this.editData.ProjectName1
      );
      this.resourceForm.controls['ProjectStartDate1'].setValue(
        this.editData.ProjectStartDate1
      );
      this.resourceForm.controls['ProjectEndDate1'].setValue(
        this.editData.ProjectEndDate1
      );
      this.resourceForm.controls['ProjectName2'].setValue(
        this.editData.ProjectName2
      );
      this.resourceForm.controls['ProjectStartDate2'].setValue(
        this.editData.ProjectStartDate2
      );
      this.resourceForm.controls['ProjectEndDate2'].setValue(
        this.editData.ProjectEndDate2
      );
    }
  }

  addthedata() {
    console.log(this.resourceForm.value);
    if (!this.editData) {
      console.log(this.resourceForm.value);
      if (this.resourceForm.valid) {
        this.api.postResourceDetails(this.resourceForm.value).subscribe({
          next: (res) => {
            alert('Added Successfully');
            this.resourceForm.reset();
            this.dialogResRef.close('save');
          },
          error: () => {
            alert('Error while adding');
          },
        });
      }
    } else {
      this.updateProject();
    }
  }
  updateProject() {
    console.log(this.editData.id);
    this.api
      .putResourcest(this.resourceForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert('Updated Successfully');
          this.resourceForm.reset();
          this.dialogResRef.close('update');
        },
        error: () => {
          alert('Error while updating the record');
        },
      });
  }
}
