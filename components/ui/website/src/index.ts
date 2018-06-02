import {HelloWorldClient} from './HelloWorldClient';

window.onload = () => {
   const http = new HelloWorldClient({baseURL: window.location.host});
   const msg = document.querySelector('.message');
   if (!msg) {
       throw new Error('Message placeholder not found');
   }
   http.hello().then((response: any) => {
       msg.innerHTML = response.reply;
   }).catch((err) => {
       console.error(err); //tslint:disable-line
       document.body.innerHTML = 'Snap! Something went wrong.';
   });
};
