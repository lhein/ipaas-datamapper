import { Component, OnInit, Input, ViewChild, ViewChildren, DoCheck, QueryList,
	ViewContainerRef, Directive, Type, ComponentFactoryResolver, AfterViewInit, SimpleChange } from '@angular/core';

import { HelloWorldComponent } from './hello.world.component';

// source: http://www.w3schools.com/howto/howto_css_modals.asp

@Component({
	selector: 'modal-window',
	template: `
		<div id="modalWindow" class="modalWindow" *ngIf="visible">
			<div class="modal-content">
				<div class="modal-header">
					<a (click)="close($event)"><span class='close'>&times;</span></a>
					<h2>Modal Header</h2>
				</div>
				<div class="modal-body">
					<template #dyn_target></template>
				</div>
				<div class="modal-footer">
					<h3>Modal Footer</h3>
				</div>
			</div>

		</div>
    `
})

export class ModalWindowComponent implements AfterViewInit { 
	@Input() parentComponent: Component;
	@Input() nestedComponentType: Type<any>;
	@Input() visible: boolean = false;
	protected componentLoaded: boolean = false;
	@ViewChildren('dyn_target', {read: ViewContainerRef}) myTarget: QueryList<ViewContainerRef>;

	constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

	ngAfterViewInit() {
		//from: http://stackoverflow.com/questions/40811809/add-component-dynamically-inside-an-ngif
		this.myTarget.changes.subscribe(changes => {
			if (!this.componentLoaded && this.visible && this.myTarget && (this.myTarget.toArray().length)) {
				this.loadComponent();
			}    		
  		});
	}

	public loadComponent() {
		var viewContainerRef: ViewContainerRef = this.myTarget.toArray()[0];
		viewContainerRef.clear();
	    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.nestedComponentType);	    
	    let componentRef = viewContainerRef.createComponent(componentFactory);
	    //(<NestedComponentDirective>componentRef.instance).data = adItem.data;
  	}

	public close(event: MouseEvent) { this.visible = false; }
}

@Component({
	selector: 'test-modal',
	template: `<modal-window #modalWindow></modal-window>`
})

export class TestModalComponent implements OnInit { 
	@ViewChild('modalWindow')
  	private modalWindow: ModalWindowComponent;

	ngOnInit(): void {
		console.log("test model init");
		this.modalWindow.nestedComponentType = HelloWorldComponent;
	}  	

	public show() { this.modalWindow.visible = true; }
	public hide() { this.modalWindow.visible = false; }
}
