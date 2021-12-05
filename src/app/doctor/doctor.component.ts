import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  constructor(private http:HttpClient) { }

  departments:any=[];
  doctors:any=[];

  modalTitle ="";
  DoctorId = 0;
  DoctorName = "";
  Department="";
  AvailableTime="";
  PhotoFileName="anonymous.png";
  PhotoPath=environment.PHOTO_URL;

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(){
    this.http.get<any>(environment.API_URL+'doctor')
    .subscribe(data=>{
      this.doctors=data;
    });

    this.http.get<any>(environment.API_URL+'department')
    .subscribe(data=>{
      this.departments=data;
    });
  }

  addClick(){
    this.modalTitle="Add Doctor";
    this.DoctorId=0;
    this.DoctorName="";
    this.Department="";
    this.AvailableTime="";
    this.PhotoFileName="anonymous.png";
  }

  editClick(doc:any){
    this.modalTitle="Edit Doctor";
    this.DoctorId=doc.DoctorId;
    this.DoctorName=doc.DoctorName;
    this.Department=doc.Department;
    this.AvailableTime=doc.AvailableTime;
    this.PhotoFileName=doc.PhotoFileName;
  }

  createClick(){
    var val={
      DoctorName:this.DoctorName,
      Department:this.Department,
      AvailableTime:this.AvailableTime,
      PhotoFileName:this.PhotoFileName
    };

    this.http.post(environment.API_URL+'doctor',val)
    .subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    });
  }

  updateClick(){
    var val={
      DoctorId:this.DoctorId,
      DoctorName:this.DoctorName,
      Department:this.Department,
      AvailableTime:this.AvailableTime,
      PhotoFileName:this.PhotoFileName
    };

    this.http.put(environment.API_URL+'doctor',val)
    .subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    });
  }

  deleteClick(id:any){
    if(confirm('Are you sure?')){
    this.http.delete(environment.API_URL+'doctor/'+id)
    .subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    });
    }
  }


 imageUpload(event:any){ 
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('file',file,file.name);
    
    this.http.post(environment.API_URL+'doctor/SaveFile',formData)
    .subscribe((data:any)=>{
      this.PhotoFileName=data.toString();
    });
  }

}