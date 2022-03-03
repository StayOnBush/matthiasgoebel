import events from '../../public/events.json';

var events_length =  Object.entries(events).length;
let events_items = document.querySelectorAll('.calendar-event-inner');

events_items.forEach(function(item, index) {

    let html = events.events[index];

    events_items[index].innerHTML =
    `<div class='calendar-event-date'>
        <h3>${html.date}</h3>
        <span>${html.time}</span>
    </div>
    <div class='calendar-event-name'>
        <h4>${html.title}</h4>
        <p>${html.description}</p>
    </div>`;
});