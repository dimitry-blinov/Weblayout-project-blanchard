window.addEventListener('DOMContentLoaded', function () {
  const widthScreen = window.innerWidth
  const headerMenu = document.querySelector('.header-menu');
  const header = document.querySelector('.header');
  const modalScreenItem = document.querySelector('.gallery-block');
  const body = document.body;

  window.__forceSmoothScrollPolyfill__ = true;

  /* Burger-menu */
  const btnOut = document.querySelector('.btn-out')
  const listLink = document.querySelectorAll('.nav-list__link');

  /* Inert */
  const btnBurger = document.querySelector('.header-burger');
  if (widthScreen <= 1024) {
    headerMenu.inert = true;
  }
  let previousActiveElement;

  function showMenu() {
    headerMenu.classList.add('menu-is-active')
    previousActiveElement = document.activeElement;
    Array.from(body.children).forEach((child) => {
      if (child !== header) {
        child.inert = true;
      }
      headerMenu.inert = false;
      btnOut.focus()
    })
    bodyScrollLock.disableBodyScroll(headerMenu)
  }

  function closeMenu() {
    document.querySelector('.header-menu').classList.remove('menu-is-active')
    Array.from(body.children).forEach((child) => {
      if (child !== headerMenu) {
        child.inert = false;
      }
      headerMenu.inert = true;
      btnBurger.focus()
    })
    bodyScrollLock.enableBodyScroll(headerMenu)
  }

  btnBurger.addEventListener('click', showMenu)
  btnOut.addEventListener('click', closeMenu)

  listLink.forEach(item => {
    item.addEventListener('click', () => {
      document.querySelector('.header-menu').classList.remove('menu-is-active')
      bodyScrollLock.enableBodyScroll(headerMenu)
      Array.from(body.children).forEach((child) => {
        child.inert = false
      })
      headerMenu.inert = true;
    })
  })

  /* Search < 1024px */
  if (widthScreen <= 1024) {
    document.querySelector('.header-top__search-btn').addEventListener('click', function () {
      document.querySelector('.header-burger').classList.add('header-content');
      document.querySelector('.header-logo').classList.add('header-content');
      document.querySelector('.header-top__search').classList.add('search-top-active');
    })

    document.querySelector('.btn-close').addEventListener('click', function () {
      document.querySelector('.header-burger').classList.remove('header-content');
      document.querySelector('.header-logo').classList.remove('header-content');
      document.querySelector('.header-top__search').classList.remove('search-top-active');
    })

    document.addEventListener('click', (event) => {
      const e = event.target;
      const btnSearch = document.querySelector('.header-top__search-btn');
      const search = document.querySelector('.top-search');
      const blockSearch = document.querySelector('.header-top__search')
      if (((e.closest('.header-top__search-btn') !== btnSearch))) {
        if (e !== search) {
          blockSearch.classList.remove('search-top-active')
          document.querySelector('.header-burger').classList.remove('header-content');
          document.querySelector('.header-logo').classList.remove('header-content');
        }
      }

      // 1. Если клик не является тултипом, то закрыть все тултипы
      if (!e.closest('.section-projects__tooltip')) {
        document.querySelectorAll('.section-projects__tooltip').forEach((item) => {
          item.classList.remove('btn-tooltip')
        })
      }
    });
  }

  /* Dropdown */
  document.addEventListener('click', function (event) {
    const activeDropdown = document.querySelector('.dropdown-is-active')
    const activeDropdownButton = activeDropdown && activeDropdown.querySelector('.header-bottom__btn')
    const tabIndex = document.querySelectorAll('.dropdown-link');
    const el = event.target

    activeDropdown && activeDropdown.classList.remove('dropdown-is-active')
    tabIndex.forEach(function (tabElem) {
      tabElem.setAttribute('tabindex', '-1')
    })

    const dropList = document.querySelectorAll('.simplebar-content');
    dropList.forEach(drop => {
      if (drop === el) {
        el.closest('.header-bottom__item').classList.add('dropdown-is-active')
        let parentDrop = el.closest('.header-bottom__item').querySelector('.dropdown-list')
        parentDrop.querySelectorAll('.dropdown-link').forEach(ev => {
          ev.setAttribute('tabindex', '0')
        })
      }
    })

    if (Array.from(el.classList).includes('header-bottom__btn') && (activeDropdownButton !== el)) {
      el.closest('.header-bottom__item').classList.add('dropdown-is-active')
      let parentDrop = el.closest('.header-bottom__item').querySelector('.dropdown-list')
      parentDrop.querySelectorAll('.dropdown-link').forEach(ev => {
        ev.setAttribute('tabindex', '0')
      })
    }
  })

  /* Modal Screen */
  const btnList = document.querySelectorAll('.slide-card__link');
  const modalScreen = document.querySelectorAll('.gallery-block');
  const modalCloseBtn = document.querySelectorAll('.modal-btn');
  btnList.forEach((item) => {
    item.addEventListener('click', (e) => {
      const path = e.currentTarget.dataset.path
      modalScreen.forEach((block) => {
        block.classList.remove('content-active');
      })
      document.querySelector(`[data-target="${path}"]`).classList.add('content-active')
      e.preventDefault();
      bodyScrollLock.disableBodyScroll(modalScreenItem);
    })
  })

  modalCloseBtn.forEach((link) => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.gallery-block').forEach((item) => {
        item.classList.remove('content-active')
      })
      bodyScrollLock.enableBodyScroll(modalScreenItem);
    })
  })

  /* Tooltip */
  document.querySelectorAll('.section-projects__tooltip').forEach((btnTooltip, numberIndex) => {
    btnTooltip.onclick = () => {
      document.getElementById(`tooltipPopup-${numberIndex}`).classList.toggle('btn-tooltip')
      document.querySelectorAll('.section-projects__tooltip').forEach((btnTooltipOne, numberIndexOne) => {
        if (numberIndex !== numberIndexOne) {
          btnTooltipOne.classList.remove('btn-tooltip')
        }
      })
    }
  })

  /* Catalog-country */
  const btnPainter = document.querySelectorAll('.accordion-btn');

  btnPainter.forEach(function (tabsBtn) {
    tabsBtn.addEventListener('click', function (eventTab) {
      const path = eventTab.currentTarget.dataset.path
      document.querySelectorAll('.section-catalog__card').forEach(function (tabContent) {
        tabContent.classList.remove('card-is-active')
      })
      document.querySelector(`[data-target="${path}"]`).classList.add('card-is-active')
    })
  })

  btnPainter.forEach(function (activeBtn) {
    activeBtn.addEventListener('click', function (clickBtn) {
      btnPainter.forEach(function (eventBtn) {
        eventBtn.classList.remove('btn-active')
      })
      clickBtn.target.classList.add('btn-active')
    })
  })

  // Scroll for Mobile
  if (widthScreen <= 576) {
    btnPainter.forEach((item) => {
      item.addEventListener('click', () => {
        window.location.href = '#content-card';
      })
    })
  }

  /* Swiper */
  /* Swiper-Hero */
  new Swiper('.swiper-hero', {
    renderExternalUpdate: false,
    longSwipes: false,
    autoplay: {
      delay: 9000,
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
  });

  /* Swiper-Gallery */
  new Swiper('.swiper-gallery', {
    pagination: {
      el: '.swiper-pagination-gallery',
      type: 'fraction',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        spaceBetween: 22,
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      376: {
        spaceBetween: 38,
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      769: {
        spaceBetween: 34,
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      1025: {
        spaceBetween: 42,
        slidesPerView: 3,
        slidesPerGroup: 3,
      }
    }
  });

  /* Swiper-Events */
  new Swiper('.swiper-events', {
    loop: false,
    pagination: {
      el: '.swiper-pagination-events',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        spaceBetween: 20,
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      577: {
        spaceBetween: 34,
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      769: {
        spaceBetween: 27,
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      1025: {
        spaceBetween: 50,
        slidesPerView: 3,
        slidesPerGroup: 3,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      }
    }
  })

  /* Section-Projects */
  new Swiper('.swiper-projects', {
    longSwipes: false,
    loop: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        spaceBetween: 50,
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      321: {
        spaceBetween: 20,
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      768: {
        spaceBetween: 34,
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      769: {
        spaceBetween: 49,
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      1025: {
        spaceBetween: 50,
        slidesPerView: 3,
        slidesPerGroup: 3,
      }
    },
  });

  /* Select-menu */
  const element = document.querySelector('#gallery-select');
  new Choices(element, {
    searchEnabled: false,
    position: 'bottom',
    placeholder: false,
  });

  /* Accordion */
  $(function () {
    $("#accordion").accordion({
      collapsible: true,
      heightStyle: "content",
    });
  });

  /* Form-Mask */
  let selector = document.querySelector("input[type='tel']");
  let im = new Inputmask("+7 (999)-999-99-99");
  im.mask(selector);


  // Модальное окно для формы
  const modalForm = document.querySelector('.form-modal');
  const btnForm = document.querySelector('.form-btn');
  const btnModalForm = document.querySelector('.form-modal__btn');
  const contacts = document.querySelector('.section-contacts')
  const contactsContent = document.querySelector('.contacts-content')
  const contactsContainer = document.querySelector('.contacts-container');
  const main = document.querySelector('.main')
  let previousActiveFormElement;
  modalForm.inert = true;

  function lockedChild(parent, section) {
    Array.from(parent.children).forEach((child) => {
      if (child !== section) {
        child.inert = true;
      }
    })
  }

  function unlockedChild(parent, section) {
    Array.from(parent.children).forEach((child) => {
      if (child !== section) {
        child.inert = false;
      }
    })
  }

  function showModal() {
    modalForm.classList.add('form-modal__active');
    previousActiveFormElement = document.activeElement;
    lockedChild(body, main);
    lockedChild(main, contacts);
    lockedChild(contacts, contactsContent);
    lockedChild(contactsContainer, modalForm);
    modalForm.inert = false;
    btnModalForm.focus()
    bodyScrollLock.disableBodyScroll(modalForm);
  }

  function closeModal() {
    modalForm.classList.remove('form-modal__active');
    unlockedChild(body, main);
    unlockedChild(main, contacts);
    unlockedChild(contacts, contactsContent);
    unlockedChild(contactsContainer, modalForm);
    modalForm.inert = true;
    btnForm.focus()
    bodyScrollLock.enableBodyScroll(modalForm);
  }

  btnModalForm.addEventListener('click', closeModal)

  new JustValidate('.js-form', {
    rules: {
      name: {
        required: true,
        minLength: 3,
        maxLength: 15,
        function: (name, value) => {
          let arrayCheck = /(?=.*\d)|(?=.*[.,#?№;%!:@$^&*"'{}|=+()-])/;
          return !arrayCheck.test(String(value))
        },
      },
      tel: {
        required: true,
        function: () => {
          const phone = selector.inputmask.unmaskedvalue()
          return Number(phone) && phone.length === 10
        },
      },
    },
    messages: {
      name: {
        minLength: 'Мин. количество символов :value',
        maxLength: 'Макс. количество символов :value',
        required: 'Введите имя',
      },
      tel: {
        required: 'Введите номер',
        function: 'Введите не менее 10 символов',
      },
    },

    // Отправка на почту формы
    submitHandler: function (thisForm) {
      let formData = new FormData(thisForm);

      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            setTimeout(showModal, 500)
          }
        }
      }

      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);

      thisForm.reset();
    }
  })

  /* Yandex-map */
  function init() {
    let center = [55.758468, 37.601088];
    let myMap = new ymaps.Map("map", {
      center: center,
      zoom: 15,
      controls: ['smallMapDefaultSet'],
    });
    let placeMarkCustom = new ymaps.Placemark(center, {
      balloonContent: 'Леонтьевский переулок, дом 5/1'
    }, {
      iconLayout: 'default#image',
      iconImageHref: '../image/marker.svg',
      iconImageSize: [20, 20],
      iconImageOffset: [0, 0]
    });
    myMap.controls.remove('searchControl');
    myMap.controls.remove('trafficControl');
    myMap.controls.remove('fullscreenControl');
    myMap.controls.remove('rulerControl');
    myMap.behaviors.disable('scrollZoom');
    // myMap.behaviors.disable('multiTouch');
    myMap.behaviors.disable('drag')
    myMap.controls.remove('typeSelector');
    myMap.geoObjects.add(placeMarkCustom);
  }

  let flag = 0;
  let coordinate = document.documentElement.scrollTop;

  if (widthScreen >= 1025) {
    if (coordinate >= 4000) {
      ymaps.ready(init)
      flag = 1;
    }
  }
  if (widthScreen <= 1024 && widthScreen >= 769) {
    if (coordinate >= 4600) {
      ymaps.ready(init)
      flag = 1;
    }
  }

  if (widthScreen <= 768 && widthScreen >= 321) {
    if (coordinate >= 5500) {
      ymaps.ready(init)
      flag = 1;
    }
  }

  if (widthScreen <= 320) {
    if (coordinate >= 5200) {
      ymaps.ready(init)
      flag = 1;
    }
  }

  window.addEventListener('scroll', () => {
    let mapOffset = document.querySelector('#map').offsetTop;
    let scrollY = window.scrollY;
    if ((scrollY >= mapOffset - 1500) && (flag === 0)) {
      ymaps.ready(init)
      flag = 1;
    }
  });

  /* TabIndex */
  document.querySelector('.choices').removeAttribute('role')
  document.querySelectorAll('.simplebar-content-wrapper').forEach(el => {
    el.setAttribute('tabindex', '-15')
  })

  /* Tippy */
  function trigger() {
    if (widthScreen <= 1024) {
      return 'click'
    } else {
      return 'mouseenter'
    }
  }

  function hideOnClick() {
    if (widthScreen >= 1025) {
      return 'false'
    } else {
      return true
    }
  }

  tippy('[data-tippy-content]', {
    hideOnClick: hideOnClick(),
    trigger: trigger(),
  });
})
