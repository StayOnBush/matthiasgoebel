//import events from '../../public/events.json';

// async function loadNames() {
//     const response = await fetch('https://janheye.de/events.json');
//     events = await response.json();
//     console.log(events); 
// }

const res = await fetch('https://janheye.de/events.json');
const events = await res.json();


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

let event_row
let event_date;
let event_time;
let event_title;
let event_desc;
let event_buttons;

let modal = document.querySelector('.modal');
let modal_container = document.querySelector('.modal-container');

let modal_headline = document.createElement('div')
modal_headline.classList.add('modal-headline');

let modal_content = document.createElement('div');
modal_content.classList.add('modal-content');

let modal_actions = document.createElement('div');
modal_actions.classList.add('modal-actions');

let modal_action_safe = document.createElement('button');
modal_action_safe.classList.add('action-save');
modal_action_safe.innerHTML = 'Speichern';
let modal_action_del = document.createElement('button');
modal_action_del.classList.add('action-delete');
modal_action_del.innerHTML = 'Löschen';

let modal_action_cancel = document.createElement('button');
modal_action_cancel.classList.add('action-cancel');
modal_action_cancel.innerHTML = 'Abbrechen';
let i = 0;

function down() {
    for (i=0;i<events_events_length;i++) {
        // create table row
        event_row = document.createElement('div');
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
        event_buttons = document.createElement('div');
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
            if(item.target == event_edit) {
                let headline = 'Event Bearbeiten';
                //removeModal();
                showModal(headline, i, "edit");
            } else if(item.target == event_del) {
                let headline = 'Event Löschen';
                //removeModal();
                showModal(headline, i, "del");
            } else {
                console.log("Fehler: Dieser Button existiert nicht.");
            }
        });
    }
}
down();
function up() {
    for(i=events_events_length-1;i>=0;i--) {
        console.log(i);
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
        event_buttons = document.createElement('div');
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
            if(item.target == event_edit) {
                let headline = 'Event Bearbeiten';
                //removeModal();
                showModal(headline, i, "edit");
            } else if(item.target == event_del) {
                let headline = 'Event Löschen';
                //removeModal();
                showModal(headline, i, "del");
            } else {
                console.log("Fehler: Dieser Button existiert nicht.");
            }
        });
    }
}

function showModal(headline, i, type) {

    modal.appendChild(modal_container);

    modal_headline.innerHTML = `<h3>${headline}</h3>`;

    let eventDate = events.events[i].date;
    let year = eventDate.slice(6, 10);
    let month = eventDate.slice(3, 5);
    let day = eventDate.slice(0, 2);
    let finalDate = year + "-" + month + "-" + day;

    let finalTime = events.events[i].time;

    modal_content.innerHTML =
                            `<div class="modal-content-date">
                                <label>Datum</label>
                                <input type="date" value="${finalDate}">
                            </div>
                            <div class="modal-content-time">
                                <label>Uhrzeit</label>
                                <input type="time" value="${finalTime}" step="3600">
                            </div>
                            <div class="modal-content-title">
                                <label>Name</label>
                                <input value="${events.events[i].title}">
                            </div>
                            <div class="modal-content-description">
                                <label>Beschreibungstext</label>
                                <textarea>${events.events[i].description}</textarea>
                            </div>`;
                            
    let modal_message_del = document.createElement('div');
    modal_message_del.classList.add('modal-message');
    modal_message_del.innerHTML = 
                                `
                                Möchtest du dieses Event wirklich löschen?<br><br>
                                ${events.events[i].date}<br>
                                ${events.events[i].title}
                                `; 

    modal.style.display = 'flex';

    modal_container.appendChild(modal_headline);
    modal_container.appendChild(modal_content);


    if(type == "edit") {
        modal_actions.appendChild(modal_action_safe);
        modal_actions.appendChild(modal_action_cancel);
    } else if(type == "del") {
        modal_actions.appendChild(modal_action_del);
        modal_actions.appendChild(modal_action_cancel);
        modal_container.removeChild(modal_content);
        modal_container.appendChild(modal_message_del);
    }

    modal_container.appendChild(modal_actions);

    modal_action_cancel.addEventListener('click', function closeModal() {
        modal.style.display = 'none';
        modal_container.remove();
        modal_message_del.remove();
        modal_action_del.remove();
        modal_action_safe.remove();
    });
}

let spinner = document.querySelector('.button-refresh').addEventListener('click', () => {
    document.querySelector('.icon-refresh').classList.toggle('spin');
});

let sort = document.querySelector('.sort');
sort.addEventListener('click', () => {
    if(sort.classList.contains('up')) {
        up();
        sort.classList.remove('up');
        sort.classList.add('down');
    } else if(sort.classList.contains('down')) {
        event_content.remove();
        down();
        sort.classList.remove('down');
        sort.classList.add('up');
    }

});