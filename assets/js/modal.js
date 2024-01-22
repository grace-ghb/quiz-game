// eslint-env es6

// Get the modal
var modal = document.getElementById('modalPlay');

// Get the button open modal
var openModalBtn = document.getElementById('openModalBtn');

// Get the close button
var closeModal = document.getElementsByClassName('closeModal')[0];

// User click the button to open the modal
openModalBtn.onclick = function () {
    modal.style.display = 'block';
};

// User click on the 'x' to close the modal and redirect to index page
closeModal.onclick = function () {
    modal.style.display = 'none';
    window.location.href = 'index.html';
};

// User click on the outside of the modal to close the modal and redirect to index page
window.onclick = function (e) {
    if (e.target == modal) {
        modal.style.display = 'none';
        window.location.href = 'index.html';
    }
};
