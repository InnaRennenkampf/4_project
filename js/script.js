// прокрутка карусели
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

//валидация формы
function validateForm(form) {

  function removeError(input) { // создаем функцию, которая будет удалять ошибку
    const parent = input.parentNode;
    if (parent.classList.contains('error')) {
      parent.classList.remove('error');
      parent.querySelector('.error-label').remove();
    }
  }

  function createError(input, text) { // создаем функцию, которая будет создавать ошибку
    const parent = input.parentNode;
    const errorLabel = document.createElement('label')
    errorLabel.classList.add('error-label')

    errorLabel.innerHTML = text;

    parent.appendChild(errorLabel);
    parent.classList.add('error'); // добавляем класс error
  }

  let result = true;

  const allInputs = form.querySelectorAll('input');

  for (const input of allInputs) {
    removeError(input) // удаляем ошибку, если она есть

    if (input.dataset.maxLength) { // проверяем, если ли у поля атрибут maxLenght
      removeError(input)
      if (input.value.length > input.dataset.maxLength) {
        console.log('Ошибка валидации');
        createError(input, 'Максимальная длина поля ' + input.dataset.maxLength + ' символов')
        result = false
      }
    }

    if (input.dataset.required == 'true') { // проверяем, если ли у поля атрибут required
  
      if (input.value == '') {
        removeError(input)
        console.log('Ошибка валидации');
        createError(input, 'Поле не должно быть пустым');
        result = false;
      }
    }
  }
  return result;
}

// вешаем обработчик события на форму
document.getElementById('add-form').addEventListener('submit', function (event) {
  event.preventDefault()

  if (validateForm(this) == true) {
    alert('Форма отправлена')
  }
}
)