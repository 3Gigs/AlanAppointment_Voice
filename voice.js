intent ('(guide|help|teach|what I do here)', p=> {
   intro(p);
});

function intro (p)
{ 
    p.play('This is a website intergrated with voice AI that can help you to manage your schedules');
}

intent (('Get started'), p=> {
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
    
intent(('Sign in'), p =>{
    p.play({
        command : "navigate:SignIn"
    });
    p.play('login');
    p.play('enter your email and password');
});

intent(("Make an appointment on $(DATE)"), p => {
    p.play('make an appointment on ');
    p.play(p.DATE.value); 
    p.play({
        command : "schedules($(p.DATE))"
    });
});

intent(("Make an appointment on $(DATE) at $(TIME)"), p => {
    p.play('make an appointment on ');
    p.play(p.DATE.value); 
    p.play("at $(p.TIME.value)");
    p.play({
        command : "schedules($(p.DATE),$(p.TIME))"
    });
});
