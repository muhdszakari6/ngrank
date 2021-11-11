import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-error-state',
  templateUrl: './error-state.component.html',
  styleUrls: ['./error-state.component.scss']
})
export class ErrorStateComponent implements OnInit {

  @Output() retry = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  emitRetry(){
    this.retry.emit();
  }


}
