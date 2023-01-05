import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  projectForm!: FormGroup;
  actionBtn: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      projectname: ['', Validators.required],
      startdate: ['', Validators.required],
      enddate: ['', Validators.required],
      skillsrequired: ['', Validators.required],
      projectmanager: ['', Validators.required],
      mglead: ['', Validators.required],
      millennialspoc: ['', Validators.required],
      millennials: ['', Validators.required],
      staff: ['', Validators.required],
      status: ['', Validators.required],
      projectstatus: ['', Validators.required],
      currentmillenials: ['', Validators.required],
      projectlinks: ['', Validators.required],
      comments: ['', Validators.required],
      track: ['', Validators.required],
      SUBBU: ['', Validators.required],
      supplyskill: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.projectForm.controls['projectname'].setValue(
        this.editData.projectname
      );
      this.projectForm.controls['startdate'].setValue(this.editData.start_date);
      this.projectForm.controls['enddate'].setValue(this.editData.end_date);
      this.projectForm.controls['skillsrequired'].setValue(
        this.editData.skills_required
      );
      this.projectForm.controls['projectmanager'].setValue(
        this.editData.project_manager
      );
      this.projectForm.controls['mglead'].setValue(this.editData.mg_lead);
      this.projectForm.controls['millennialspoc'].setValue(
        this.editData.millennial_spoc
      );
      this.projectForm.controls['millennials'].setValue(
        this.editData.millennials
      );
      this.projectForm.controls['staff'].setValue(this.editData.staff);
      this.projectForm.controls['status'].setValue(this.editData.status);
      this.projectForm.controls['projectstatus'].setValue(
        this.editData.project_status
      );
      this.projectForm.controls['currentmillenials'].setValue(
        this.editData.current_millenials
      );
      this.projectForm.controls['projectlinks'].setValue(
        this.editData.Project_links
      );
      this.projectForm.controls['comments'].setValue(this.editData.comments);
      this.projectForm.controls['track'].setValue(this.editData.track);
      this.projectForm.controls['SUBBU'].setValue(this.editData.SUB_BU);
      this.projectForm.controls['supplyskill'].setValue(
        this.editData.Supply_skill
      );
    }
  }

  addthedata() {
    console.log(this.projectForm.value);
    if (!this.editData) {
      console.log(this.projectForm.value);
      if (this.projectForm.valid) {
        this.api.postProjectDetails(this.projectForm.value).subscribe({
          next: (res) => {
            alert('Added Successfully');
            this.projectForm.reset();
            this.dialogRef.close('save');
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
    this.api.putProject(this.projectForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('Updated Successfully');
        this.projectForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        alert('Error while updating the record');
      },
    });
  }
}
