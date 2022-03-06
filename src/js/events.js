import events from '../../public/events.json';
var events_length =  Object.entries(events).length;

// calendar-teaser on start page
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


// calendar on standalone page
let events_events_length =  Object.entries(events.events).length;
let event_content = document.querySelector('.calendar-full-main-table-content');

let event_date;
let event_time;
let event_title;
let event_desc;
let modalvalue;
let modalitem;
let buttonType;
let buttonTypeString;

for (let i=0;i<events_events_length;i++) {

    // create table row
    let event_row = document.createElement('div');
    event_row.classList.add('calendar-full-main-table-row');

    // create column for date
    event_date = document.createElement('div');
    event_date.classList.add('calendar-full-main-table-date'); 
    event_date.innerHTML = events.events[i].date;

    // create column for time
    event_time = document.createElement('div');
    event_time.classList.add('calendar-full-main-table-time'); 
    event_time.innerHTML = events.events[i].time;

    // create column for title
    event_title = document.createElement('div');
    event_title.classList.add('calendar-full-main-table-title'); 
    event_title.innerHTML = events.events[i].title;

    // create column for description
    event_desc = document.createElement('div');
    event_desc.classList.add('calendar-full-main-table-description'); 
    event_desc.innerHTML = events.events[i].description;

    // create column for action buttons
    let event_edit = document.createElement('button');
    event_edit.classList.add('action_edit');
    event_edit.innerHTML = `Bearbeiten`;
    let event_del = document.createElement('button');
    event_del.classList.add('action_del');
    event_del.innerHTML = `Löschen`;
    let event_buttons = document.createElement('div');
    event_buttons.classList.add('calendar-full-main-table-actions'); 
    event_buttons.appendChild(event_edit);
    event_buttons.appendChild(event_del);

    event_row.appendChild(event_date);
    event_row.appendChild(event_time);
    event_row.appendChild(event_title);
    event_row.appendChild(event_desc);
    event_row.appendChild(event_buttons);
    event_content.appendChild(event_row);

    event_buttons.addEventListener('click', function(item) {
        modalvalue = i;
        buttonType = item.target.classList;
        buttonTypeString = buttonType.toString();

        if(buttonTypeString === 'action_edit') {
            let headline = 'Event Bearbeiten';
            let edit;
            showModal(edit, headline);
        } else if(buttonTypeString === 'action_del') {
            let headline = 'Event Löschen';
            let del;
            showModal(del, headline);
        } 
    }); 
}

function showModal(a,b) {
    let modal = document.querySelector('.modal');
    let modal_container = document.querySelector('.modal-container');
    let modal_headline = document.querySelector('.modal-headline');
    modal_headline.innerHTML = b;
    let modal_content = document.querySelector('.modal-content');
    let modal_actions = document.querySelector('.modal-actions');

    let modal_action_safe = document.createElement('button');
    modal_action_safe.classList.add('action-save');
    let modal_action_del = document.createElement('button');
    modal_action_del.classList.add('action-delete');
    let modal_action_cancel = document.createElement('button');
    modal_action_cancel.classList.add('action-cancel');
    modal_action_cancel.innerHTML = 'Abbrechen';

    modal_actions.appendChild(modal_action_cancel);

    modal_container.appendChild(modal_headline);
    modal_container.appendChild(modal_content);
    modal_container.appendChild(modal_actions);
    modal.style.display = 'flex';

    if(a = edit) {
        console.log('1');
    } else if(a = del) {
        console.log('2');
    }
}



let spinner = document.querySelector('.button-refresh').addEventListener('click', () => {
    document.querySelector('.icon-refresh').classList.toggle('spin');
});