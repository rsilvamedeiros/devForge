import './academy/typescript-academy.js';

const root=document.querySelector<HTMLDivElement>('#app');
if(!root)throw new Error('App root not found.');
root.innerHTML='<typescript-academy></typescript-academy>';
