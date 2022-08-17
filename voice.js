const vHome = visual({screen: "Home"});
const vLogin = visual({screen: "Login"});

intent ('(guide|help|teach|what I do here)', p=> {
   intro(p);
});

function intro (p)
{ 
    p.play('This is a website intergrated with voice AI that can help you to manage your schedules');
}

intent (vHome, 'Get started', p=> {
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

intent(('Set theme (mode |) to $(MODE dark | light) (mode |)'), p => {
    p.play('Switching theme');
    p.play({command: 'switchThemeMode', theme: p.MODE.value});
});
