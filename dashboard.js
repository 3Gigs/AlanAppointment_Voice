const vDashboard = visual({screen: "Dashboard"});

let about = context(() => {
    intent('I want a $(app~ doctor appointment~doctor|meeting~business meeting|due date ~ due date of|counseling~conversation|class~course)' , p => {
        p.play(`You have made an appiontment about ${p.app.label}`);
        p.play({ 
            command:"createEvent", eventInfo : {title: p.app.label, start: p.state.start, end: p.state.end, id: null}
        });
    });
});

intent(vDashboard, ("Make an appointment on $(DATE)"), p => {
    p.play('make an appointment on ');
    p.play(p.DATE.luxon.toISO()); 
    p.play({
        command : `schedules(${p.DATE.luxon.toISO()})`
    });
    p.state.start = p.DATE.luxon.toISO();
    p.state.end = p.DATE.luxon.toISO();
    p.play('what you want to make an appointment for?');
    p.then(about, {state: p.state});
});

intent(vDashboard, ("View event $(EVENT* .+)"), p => {
    p.play('Viewing event: ' + p.EVENT.value);
    p.play({command: 'viewEvent', title: p.EVENT.value});
});

//Only day and time, default 1 hout appointment.
intent(vDashboard, ("Make an appointment on $(DATE) at $(TIME)"), p => {
    p.play('make an appointment on ');
    p.play(p.DATE.value); 
    p.play(`at ${p.TIME.value}`);
    p.play('what you want to make an appointment for?');
    p.then(about, {state: p.state});
});

//Given starting time and end time
intent(vDashboard, ("Make an appointment from $(fromDate DATE) $(fromTime TIME) to $(toDate DATE) $(toTime TIME)"), p => {
    p.play('make an appointment from ');
    p.play(p.fromDate.value); 
    p.play(p.fromTime.value);
    p.play("to");
    p.play(p.toDate.value); 
    p.play(p.toTime.value);
    p.play({
        command : `schedules(${p.fromDate},${p.fromTime},${p.toDate},${p.toTime})`
    });
    p.play('what you want to make an appointment for?');
    p.then(about);
});
