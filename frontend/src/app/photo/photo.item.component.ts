import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-photo-item',
  templateUrl: '../templates/photo/photo.item.component.html',
  styles: []
})
export class PhotoItemComponent {

  @Output() setmain = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() editphoto = new EventEmitter();
  @Input() photo: any;

}
