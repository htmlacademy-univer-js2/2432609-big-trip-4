import { render } from '../render.js';
import EditPoint from '../view/edit-point.js';
import NewPoint from '../view/new-point.js';
import Point from '../view/event.js';
import Sort from '../view/sort.js';
import EventList from '../view/event-list.js';

export default class EventsPresenter {
    eventsComponent = new EventList();
  
    constructor({eventsContainer}) {
      this.eventsContainer = eventsContainer;
    }
  
    init() {
      console.log('init method is called');
      render(new Sort(), this.eventsContainer);
      render(this.eventsComponent, this.eventsContainer);
      render(new NewPoint(), this.eventsComponent.getElement());
      render(new EditPoint(), this.eventsComponent.getElement());
  
      for (let i = 0; i < 3; i++) {
        render(new Point(), this.eventsComponent.getElement());
      }
    }
  }