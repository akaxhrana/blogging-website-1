
//////////////////////////////////////////////////////
// on click listener for 'Create Post' without login//
//////////////////////////////////////////////////////

var button = document.getElementById('createButton');

button.addEventListener('click', function (e) {
    onclick = document.getElementById('id03').style.display = 'block'
});

////////////////////////////////////////////////////////////
// on click listener to open 'Signup form from Login form'//
////////////////////////////////////////////////////////////

var butt1 = document.getElementById('createnewaccountbutton1');

butt1.addEventListener('click', function (e) {
    onclick = document.getElementById('id01').style.display = 'none';
});

var butt3 = document.getElementById('createnewaccountbutton3');

butt3.addEventListener('click', function (e) {
    onclick = document.getElementById('id03').style.display = 'none';


});
