// Use this sample to create your own voice commands
intent('hello', p => {
    p.play('(hello|hi there|hey)');
});
intent ('(guide|help|teach)', p=> {
    p.play('This is a website intergrated with voice AI that can help you to manage your scheduals');
});