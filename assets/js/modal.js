// Get the modal
const modal = document.getElementById('modalPlay');

// Get the button open modal
const openModalBtn = document.getElementById('openModalBtn');

// Get the close button
const closeModal = document.getElementById('closeModal');

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
