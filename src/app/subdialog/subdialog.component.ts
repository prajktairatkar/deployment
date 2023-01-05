import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-subdialog',
  templateUrl: './subdialog.component.html',
  styleUrls: ['./subdialog.component.css'],
})
export class SubdialogComponent implements OnInit {
  subtaskForm!: FormGroup;
  readData: any;
  actionBtn: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editsubData: any,
    private dialogSubRef: MatDialogRef<SubdialogComponent>
  ) {}

  ngOnInit(): void {
    this.getAllData();
    this.subtaskForm = this.formBuilder.group({
      projectname: [this.readData],
      taskname: ['', Validators.required],
      startdate: ['', Validators.required],
      duration: ['', Validators.required],
      progress: ['', Validators.required],
    });
    // this.subtaskForm = this.formBuilder.group({
    //   projectname: [this.readData[1]],
    // });

    if (this.editsubData) {
      this.actionBtn = 'Update';
      this.subtaskForm.controls['projectname'].setValue(
        this.editsubData.project_name
      );
      this.subtaskForm.controls['taskname'].setValue(this.editsubData.tsk_name);
      this.subtaskForm.controls['startdate'].setValue(
        this.editsubData.tsk_startdate
      );
      this.subtaskForm.controls['duration'].setValue(this.editsubData.duration);
      this.subtaskForm.controls['progress'].setValue(this.editsubData.progress);
    }
  }

  getAllData() {
    this.api.getAllData().subscribe((res) => {
      console.log('Get All Data', res);
      this.readData = res.data;
      console.log(this.readData);
    });
  }
  addthesubdata() {
    if (!this.editsubData) {
      if (this.subtaskForm.valid) {
        console.log(this.subtaskForm.value);
        this.api.postSubtaskDetails(this.subtaskForm.value).subscribe({
          next: (res) => {
            alert('Added Successfully');
            this.subtaskForm.reset();
            this.dialogSubRef.close('save');
            window.location.reload();
          },
          error: () => {
            alert('Error while adding');
          },
        });
      }
    } else {
      this.updateSubtask();
    }
  }
  updateSubtask() {
    this.api
      .putSubtask(this.subtaskForm.value, this.editsubData.tsk_id)
      .subscribe({
        next: (res) => {
          alert('Task Added SUccessfully');
          this.subtaskForm.reset();
          this.dialogSubRef.close('Update');
          window.location.reload();
        },
        error: () => {
          alert('Error While Updating the record');
        },
      });
  }
}
