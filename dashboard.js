const vDashboard = visual({screen: "Dashboard"});
const vDashboardModal = visual({screen: "Dashboard", modal: true});

let about = context(() => {
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    intent('(I want a | It\' for) $(TITLE* .+)' , p => {
        p.play(`You have made an appiontment about ${p.TITLE.value} on ${new Date(p.state.start).toLocaleDateString(undefined, dateOptions)} to ${new Date(p.state.end).toLocaleDateString(undefined, dateOptions)}`);
        p.play({ 
            command:"createEvent", eventInfo : {title: p.TITLE.value, start: p.state.start, end: p.state.end}
        });
    });
});

intent(vDashboard, "Make an appointment (on | at) $(DATE)", p => {
    p.play(p.DATE.luxon.toISO()); 
    p.state.start = p.DATE.luxon.toISO();
    p.state.end = p.DATE.luxon.toISO();
    p.play('what you want to make an appointment for?');
    p.then(about, {state: p.state});
});

//Only day and time, default 1 hout appointment.
intent(vDashboard, "Make an appointment (on | at) $(DATE) at $(TIME)", p => {
    p.state.start = p.DATE.luxon.toISO();
    p.state.end = p.DATE.luxon.toISO();

    p.play('Ok, what you want to make an appointment for?');
    p.then(about, {state: p.state});
});

intent(vDashboard, "Make an appointment (on | at) $(fromDate DATE) to $(toDate DATE)", p => {
   p.state.start = p.fromDate.luxon.toISO();
   p.state.end = p.toDate.luxon.toISO();
   p.play('Ok, what you want to make an appointment for?');
   p.then(about, {state: p.state});
});

//Given starting time and end time
intent(vDashboard, "Make an appointment from $(fromDate DATE) $(fromTime TIME) to $(toDate DATE) $(toTime TIME)", p => {
    const startTime = p.fromDate.luxon.plus({seconds: p.fromTime.time}).toISO();
    const endTime = p.toDate.luxon.plus({seconds: p.toTime.time}).toISO();
    
    p.state.start = startTime;
    p.state.end = endTime;
    p.play('what you want to make an appointment for?');
    p.then(about, {state: p.state});
});

intent("(close | got it | thank you)", p => {
    p.play({command: "closeEvent"});
})

intent("delete this event", p => {
    p.play({command: "deleteEvent"});
})

intent("(view | show) event $(EVENT* .+)", p => {
   p.play({command: "viewEvent", title: p.EVENT.value}) 
});
