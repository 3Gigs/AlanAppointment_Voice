const vDashboard = visual({screen: "Dashboard"});
const vHome = visual({screen: "Home"});
const vLogin = visual({screen: "Login"});

intent ('(guide|help|teach|what I do here)', p=> {
   intro(p);
});

function intro (p)
{ 
    p.play('This is a website intergrated with voice AI that can help you to manage your schedules');
}

intent (vHome, ('Get started'), p=> {
    intro(p);
    p.play({
        command: "navigate:Dashboard"
    });
});

intent (('home'), p=> {
    p.play({
        command: "navigate:Home"
    });
    p.play("home");
});

const BACK_PAGE = [
    'go back',
    'take me back',
    'Previous page',
    'go to last page',
    'go to Previous page',
];
    
intent(BACK_PAGE, p => {
    p.play({
        command: 'go:Back'
    });
    p.play('going back', 'last page', 'going to previous page');
});
    
intent(('(Sign in| I want to sign in)'), p =>{
    p.play({
        command : "navigate:SignIn"
    });
    p.play('login');
    p.play('enter your email and password. If you don\'t have an account yet. Please sign up for one.');
});

let about = context(() => {
    intent('I want a $(app~ doctor appiontment~doctor|meeting~business meeting|due date ~ due date of|counseling~conversation|class~course)' , p => {
        p.play(`You have made an appiontment about ${p.app.label}`);
        p.play({ 
            command : `appointmentLabel(${p.app.label})`
        });
    });
});

intent(vDashboard, ("Make an appointment on $(DATE)"), p => {
    p.play('make an appointment on ');
    p.play(p.DATE.value); 
    p.play({
        command : `schedules(${p.DATE})`
    });
    p.play('what you want to make an appointment for?');
    p.then(about);
});

//Only day and time, default 1 hout appointment.
intent(vDashboard, ("Make an appointment on $(DATE) at $(TIME)"), p => {
    p.play('make an appointment on ');
    p.play(p.DATE.value); 
    p.play(`at ${p.TIME.value}`);
    p.play({
        command : "schedules($(p.DATE),$(p.TIME))"
    });
});
