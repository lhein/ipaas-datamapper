import { Component, Input } from '@angular/core';

import { ErrorInfo, ErrorLevel } from '../models/error.model';
import { ErrorHandlerService } from '../services/error.handler.service';

@Component({
	selector: 'data-mapper-error',
	template: `
		<div class="DataMapperErrorComponent" *ngIf="errorService && errorService.errors.length">
			<div class="alert alert-danger" *ngFor="let e of errorService.errors">
				<a class="close" (click)="handleClick($event)"><i class="fa fa-close" attr.errorIdentifier="{{e.identifier}}"></i></a>
	            <span class="pficon pficon-error-circle-o"></span>{{e.message}}
	        </div>
        </div>
	`
})

export class DataMapperErrorComponent { 
	public errorService: ErrorHandlerService;

	private handleClick(event: MouseEvent) {
		// need to extract this so typescript doesnt throw compiler error
    	var eventTarget: any = event.target;
    	var errorIdentifier: string = eventTarget.attributes.getNamedItem("errorIdentifier").value;
    	this.errorService.removeError(errorIdentifier);
	}
}

