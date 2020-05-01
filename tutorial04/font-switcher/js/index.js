const makeBigger = () => {
   // alert('make bigger!');
   document.querySelector('.content').style.fontSize= '3.4em';
   document.querySelector('.content').style.backgroundColor = 'hotpink';
   document.querySelector('.content').innerHTML = 'Hello!';
};

const makeSmaller = () => {
   // alert('make smaller!');
   document.querySelector('.content').style.fontSize = '1.4em';
   document.querySelector('.content').style.backgroundColor = 'lavender';
   document.querySelector('.content').innerHTML = 'Goodbye!';
};

document.querySelector('.a1').onclick = makeBigger;
document.querySelector('.a2').onclick = makeSmaller;
