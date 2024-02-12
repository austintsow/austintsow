let navOpen = false;
let navTimeout;

function toggleNav() {
  if (!navOpen) {
    document.getElementById("mySidenav").style.width = "150px";
    document.getElementById("main").style.marginLeft = "150px";
    navOpen = true;

    // time in milliseconds to close the nav
    navTimeout = setTimeout(closeNav, 10000);
  } else {
    clearTimeout(navTimeout);
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    navOpen = false;
  }
}

function openNav() {
  document.getElementById("mySidenav").style.width = "150px";
  document.getElementById("main").style.marginLeft = "150px";
}
  
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}

window.addEventListener('scroll', function() {
  if (navOpen) {
    closeNav();
  }
});

let elements = document.querySelectorAll('.rolling-text');

elements.forEach(element => {
  let innerText = element.innerText;
  element.innerHTML = '';
  
  let textContainer = document.createElement('div');
  textContainer.classList.add('block');
  
  for (let letter of innerText) {
    let span = document.createElement('span');
    span.innerText = letter.trim() === '' ? '\xa0': letter;
    span.classList.add('letter');
    textContainer.appendChild(span);
  }
  
  element.appendChild(textContainer);
  element.appendChild(textContainer.cloneNode(true));
});

// for presentation purpose
setTimeout(() => {
  elements.forEach(element => {
    element.classList.add('play');
  })
}, 600);

elements.forEach(element => {
  element.addEventListener('mouseover', () => {
    element.classList.remove('play');
  });
});

/*
setTimeout(function() {
  document.getElementById('popup').style.display = 'block';
}, 5000);
*/
/*
setTimeout(function() {
  window.location.href = "src/menu.html";
}, 18000);
*/
document.addEventListener('DOMContentLoaded', function() {
  var container = document.querySelector('.container');
  
  container.style.opacity = '0';

  container.style.transition = 'opacity 1s ease-in';

  setTimeout(function() {
      container.style.opacity = '1';
  }, 100);
});

document.getElementById('homeText').addEventListener('click', function() {
  document.getElementById('moving-text').style.animationPlayState = 'paused';
});


var myDiv = document.getElementById('moving-text');

myDiv.style.display = 'none';

setTimeout(function() {
    myDiv.style.display = 'block';
}, 8000);

// attempted fade, but failed

let options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

let callback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
    } else {
      entry.target.style.opacity = '0';
    }
  });
};

let observer = new IntersectionObserver(callback, options);

let targets = document.querySelectorAll('.fade');
targets.forEach(target => {
  observer.observe(target);
});

window.addEventListener('scroll', function() {
  let scrollPosition = window.pageYOffset;
  let windowHeight = window.innerHeight;

  document.querySelectorAll('.fade').forEach(el => {
    let elementPosition = el.getBoundingClientRect().top;
    let opacity = 1 - elementPosition / windowHeight;

    if (opacity > 0) el.style.opacity = opacity;
  });
});