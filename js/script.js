var swiper = new Swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween: 80,
  slidesPerGroup: 3,
  loop: true,
  loopFillGroupWithBlank: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

function validateForm(form) {
  function removeError(input) {
    const parent = $(input).parent();
    if (parent.hasClass('error')) {
      parent.removeClass('error');
      parent.find('.error-label').remove();
    }
  }

  function createError(input, text) {
    const parent = $(input).parent();
    const errorLabel = $('<label>').addClass('error-label').html(text);
    parent.append(errorLabel);
    parent.addClass('error');
  }

  let result = true;

  const allInputs = $('input', form);

  allInputs.each(function() {
    const input = this;
    removeError(input);

    if ($(input).data('maxLength')) {
      removeError(input);
      if (input.value.length > $(input).data('maxLength')) {
        console.log('Ошибка валидации');
        createError(input, 'Максимальная длина поля ' + $(input).data('maxLength') + ' символов');
        result = false;
      }
    }

    if ($(input).data('required') == true) {
      if (input.value == '') {
        removeError(input);
        console.log('Ошибка валидации');
        createError(input, 'Поле не должно быть пустым');
        result = false;
      }
    }
  });
  return result;
}

$('#add-form').on('submit', function (event) {
  event.preventDefault();

  if (validateForm(this) == true) {
    alert('Форма отправлена');
  }
});