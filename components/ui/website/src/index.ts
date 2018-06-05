import {HelloWorldClient} from './HelloWorldClient';

window.onload = () => {
    const http = new HelloWorldClient({baseURL: 'https://localhost:443/'});
    const msg = document.querySelector('.message');
    if (!msg) {
        throw new Error('Message placeholder not found');
    }

    http
        .hello({firstName: 'Test', lastName: 'User', email: 'my@email.com'})
        .then((response: any) => {
            msg.innerHTML = `<h1>${response.data.reply}</h1>`;
        })
        .catch((err) => {
            console.error(err); //tslint:disable-line
            document.body.innerHTML = 'Snap! Something went wrong.';
        });
};
