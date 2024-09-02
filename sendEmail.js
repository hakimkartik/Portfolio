function sendEmails() {
    var params = {
        name: document.getElementsByName('name'),
        reply_email: document.getElementsByName('email'),
        message: document.getElementsByName('comments')
    };
    emailjs.send( 'gmail', 'feedback', params );
};