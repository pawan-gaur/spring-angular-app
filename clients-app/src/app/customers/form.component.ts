import {Component, OnInit} from '@angular/core';
import {Customer} from './customer';
import {CustomerService} from './customer.service';
import {Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private customer: Customer = new Customer();
  private title: string = 'Create Customer';
  private errors: string[];

  constructor(private customerService: CustomerService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.loadCustomer();
  }

  loadCustomer(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.customerService.getCustomer(id).subscribe((customer) => this.customer = customer);
      }
    });
  }

  create(): void {
    this.customerService.create(this.customer)
      .subscribe(customer => {
          this.router.navigate(['/customers']);
          swal.fire('New Customer', `The customer ${customer.firstName} has been successfully created`, 'success');
        },
        err => {
          this.errors = err.error.errors as string[];
          console.error('error code from the backend');
          console.error(err.error.errors);
        }
      );
  }

  update(): void {
    this.customerService.updateCustomer(this.customer)
      .subscribe(json => {
        this.router.navigate(['/customers']);
        swal.fire('Updated Customer', `${json.message}: ${json.customer.firstName}`, 'success');
      },
        err => {
          this.errors = err.error.errors as string[];
          console.error('error code from the backend');
          console.error(err.error.errors);
        }
      );
  }

}
