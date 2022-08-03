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
        command: "Dashboard"
    });
});

intent (('home'), p=> {
    p.play({
        command: "home"
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
        command: 'go-back'
    });
    p.play('going back', 'last page', 'going to previous page');
});
    
intent(('Sign in'), p =>{
    p.play({
        command : "sign in"
    });
    p.play('login');
    p.play('enter your email and password');
});

onCreateUser(p => {
    p.userData.month = {en: "January|February|March|April|May|June|July|August|September|October|November|December"};
    p.userData.day = {en: ""};
});

intent(("Make an appointment on $(MONTH p: month) $(DAY p: day)"), p => {
    p.play('make an appointment on ${p.MONTH.value} + ${p.DAY.number}'); 
    p.play({
        command : "schedules($MONTH, $DAY)"
    });
});