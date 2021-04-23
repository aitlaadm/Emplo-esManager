import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public employees: employee[];
  public employeeEdit: employee;
  suppEmployee: employee;

  constructor(private employeeService: EmployeeService){}

  ngOnInit(){
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: employee[])=>{
        this.employees=response;
      },
        (error: HttpErrorResponse)=>{
          alert(error.message);
      }
    );
  }

  public onOpenModal(mode:string , emp:employee):void{
    const container=document.getElementById('container-main')
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode==='ajouter'){
      button.setAttribute('data-target','#addEmployeeModal');
    }else if(mode==='modifier'){
      this.employeeEdit=emp;
      button.setAttribute('data-target','#updateEmployeeModal');
    }else{
      this.suppEmployee=emp;
      button.setAttribute('data-target','#deleteEmployeeModal');
    }
    container.appendChild(button);
    button.click();
  }

  public onAjouterForm(AForm: NgForm):void{
    document.getElementById('add-employee-form').click();
    this.employeeService.addEmployee(AForm.value).subscribe(
      (rep:employee)=>{
        this.getEmployees();
        AForm.resetForm();
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
        AForm.resetForm();
      }
    );
  }
  public onModifierForm(employee: employee):void{
    this.employeeService.updateEmployee(employee).subscribe(
      (rep:employee)=>{
        this.getEmployees();
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }
    public onSupprimerForm(employeeId: number):void{
      this.employeeService.deleteEmployee(employeeId).subscribe(
        (rep:void)=>{
          this.getEmployees();
        },
        (error:HttpErrorResponse)=>{
          alert(error.message);
        }
      );
    }
    public recherche(cle:string):void{
      const res: employee[]=[];
      for(const emp of this.employees){
        if(emp.nom.toLowerCase().indexOf(cle.toLowerCase())!==-1
        ||emp.prenom.toLowerCase().indexOf(cle.toLowerCase())!==-1
        ||emp.telephone.indexOf(cle)!==-1
        ||emp.mail.toLowerCase().indexOf(cle.toLowerCase())!==-1
        ||emp.poste.toLowerCase().indexOf(cle.toLowerCase())!==-1){
          res.push(emp);
        }
      }
      this.employees=res;
      if(res.length===0||!cle){
        this.getEmployees();
      }

    }
  }
