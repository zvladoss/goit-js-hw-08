const images = [
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const refs = {
  galleryList: document.querySelector('.gallery'),
  galleryListItem: document.querySelectorAll('li'),
};
// CREATE-AND-ADD-ELEMENTS
//
//
const createGallery = ({ preview, original, description }) => {
  return `<li class="gallery-item">
  <a class="gallery-link" href="${original}">
    <img
      class="gallery-image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
`;
};

const addGalleryItem = images.map(image => createGallery(image)).join('');

refs.galleryList.insertAdjacentHTML('beforeend', addGalleryItem);
//----

// CREATE-NEW-CONTAINER
//
//
const galleryBox = document.createElement('div');

galleryBox.classList.add('gallery-container');
//----

//ADD-LIST-TO-CONTAINER
//
//
document.body.insertBefore(galleryBox, refs.galleryList);

galleryBox.appendChild(refs.galleryList);
//----

//MODAL
//
//
const activeModal = basicLightbox.create(
  `
    <img src=" " alt=" " />
    `,
  {
    className: 'modal-wrap',
    onShow: () => document.addEventListener('keydown', onEscDown),
    onClose: () => document.removeEventListener('keydown', onEscDown),
  }
);
const clickEvent = event => {
  event.preventDefault();
  const currentCard = event.target.closest('.gallery-image');
  if (!currentCard) {
    return;
  }
  const modalImg = activeModal.element().querySelector('img');
  modalImg.src = event.target.dataset.source;
  modalImg.alt = event.target.alt;

  activeModal.show();
};

const onEscDown = event => {
  if (event.key === 'Escape' && activeModal) {
    activeModal.close();
  }
};

refs.galleryList.addEventListener('click', clickEvent);
//----

const refs = {
  feedbackForm: document.querySelector('.js-feedback-form'),
};
let formData = {};

const fillFormFields = feedbackForm => {
  // Створюємо функцію,яка буде заповнювати поля форми,при повторному відкритті після перезавантаження або закриття сторінки.
  // Буде викликатися одразу при відкритті сторінки.

  const formDataFromLS = JSON.parse(localStorage.getItem('feedback-form-state'));

  // Звертаємося до localStorage за допомогою getItem і передаємо йому ключ 'feedback-form-state' данні під яким ми хочемо дістати.
  // Дані у вигляді рядка у JSON- форматі.Тому треба розпарсити.

  if (formDataFromLS === null) {
    return;
  }
  // Якщо користувач заходить вперше і ще не заповнював форму - повертається null тому,потрібна перевірка, щоб не виникала помилка. Якщо null - функція не виконується.Скрипт очікує на заповнення форми.

  formData = formDataFromLS;
  // Щоб при редагуванні вже заповненого поля не перезаписувався повністю об'єкт,а перезаписувалось значення властивості,яка  була змінена.

  const formDataKeys = Object.keys(formDataFromLS);
  formDataKeys.forEach(key => {
    feedbackForm.elements[key].value = formDataFromLS[key];
  });
};

// Зчитує данні з localStorage, парсить ці данні, з якими вже можна працювати.

fillFormFields(refs.feedbackForm);

const onFormFieldChange = ({ target: formField }) => {
  // Деструктуризуємо об'єкт який передають і дістаємо із нього значення властивості target до змінної форм field

  /** 
  const { target: formField } = event; ---- другий спосіб вивести значення ім'я атрибуту(назви поля) і значення інпуту,що ввів користувач  
  const fieldName = formField.name;
  const fieldValue = formField.value;
  */

  const fieldName = formField.name;
  const fieldValue = formField.value;

  // Створюємо змінну і записуєм значення властивостей

  /**
    formData.test = 'some test' ---- додаємо нову властивість test із значенням some test.Синтаксис через крапку, один із способів.
  */
  formData[fieldName] = fieldName;

  // Заповнюємо об'єкт. в якості ключа використовуємо значення змінної fieldName(значення атрибута name цільового елемента. formField.name)
  // B якості значення властивості використовуємо значення змінної fieldValue(значення атрибута value цільового елемента formField.value. Значення,яке користувач вводив).
  // formData[formfieldName] = formfieldValue //

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));

  // Відправляємо об'єкт до localStorage
  // 'feedback-form-state' --- ключ,під яким буде зберігатися
  // JSON.stringify(formData) --- передаємо об'єкт у вигляді рядка за допомогою конструктора JSON. ЦЕ буде значенням ключа 'feedback-form-state'.
};

const onFeedbackFormSubmit = event => {
  event.preventDefailt();
  localStorage.removeItem('feedback-on-state');
  event.currentTarget.reset();
};

// При submit чистимо localStorage та форму.

refs.feedbackForm.addEventListener('change', onFormFieldChange);
refs.feedbackForm.addEventListener('submit', onFeedbackFormSubmit);
