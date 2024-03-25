$(document).ready(function () {
  $('#popupButton').click(function () {
    // Check the current visibility of the popup container
    if ($('#popupContainer').is(':visible')) {
      // If the container is visible, hide it
      $('#popupContainer').hide();
    } else {
      // If the container is hidden, show it
      $('#popupContainer').show();
    }
  });
});
