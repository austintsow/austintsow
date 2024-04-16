//accordion
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

//animate text when loaded
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.text-pop-in');
    elements.forEach((el, index) => {
      // Give each text element its moment by setting a staggered delay
      el.style.animationDelay = `${index * 0.2}s`;
      el.style.animationDuration = '0.9s';
      el.classList.add('animated');
    });
  });

//copy email 1
function copyEmail() {
  const emailElement = document.querySelector('.email-text');
  const email = emailElement.textContent || emailElement.innerText;
  navigator.clipboard.writeText(email).then(() => {
    emailElement.textContent = "email copied";
    setTimeout(() => {
      emailElement.textContent = email;
    }, 3000);
  }, (err) => {
    console.error('failed to copy: ', err);
  });
}

//copy email 2
function copyEmail2() {
  const emailElement = document.querySelector('.email-text2');
  const email = emailElement.textContent || emailElement.innerText;
  navigator.clipboard.writeText(email).then(() => {
    emailElement.textContent = "email copied";
    setTimeout(() => {
      emailElement.textContent = email;
    }, 3000);
  }, (err) => {
    console.error('failed to copy: ', err);
  });
}

//random color on hover
// document.querySelector('.about-top-right').addEventListener('mouseenter', function() {
//   const hue = Math.floor(Math.random() * 360);
//   const saturation = Math.floor(Math.random() * 20) + 60;
//   const lightness = Math.floor(Math.random() * 20) + 70;
//   this.style.color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
// });

// document.querySelector('.about-top-right').addEventListener('mouseleave', function() {
//   this.style.color = '';
// });

// document.querySelector('.resume-top-right').addEventListener('mouseenter', function() {
//   const hue = Math.floor(Math.random() * 360);
//   const saturation = Math.floor(Math.random() * 20) + 60;
//   const lightness = Math.floor(Math.random() * 20) + 70;
//   this.style.color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
// });

// document.querySelector('.resume-top-right').addEventListener('mouseleave', function() {
//   this.style.color = '';
// });

//date
function updateTime() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12;

  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  
  const timezoneAbbreviation = 'PST';

  let timeString = `${hours}:${minutes}:${seconds} ${ampm} ${timezoneAbbreviation}`;

  document.getElementById('time-element').textContent = timeString;
}

setInterval(updateTime, 1000);
updateTime();

// cursor
const cursor = document.getElementById('customCursor');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
const speed = 0.095; // smoothness of cursor (lower value is smoother)
let isCursorInitialized = false;

// initially hide the cursor
cursor.style.display = 'none';

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (!isCursorInitialized) {
    // directly jump to the initial mouse position and reveal the cursor
    cursorX = mouseX;
    cursorY = mouseY;
    cursor.style.transform = `translate3d(${cursorX - (cursor.clientWidth / 2)}px, ${cursorY - (cursor.clientHeight / 2)}px, 0)`;
    cursor.style.display = 'block';
    isCursorInitialized = true;
  }
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * speed;
  cursorY += (mouseY - cursorY) * speed;
  cursor.style.transform = `translate3d(${cursorX - (cursor.clientWidth / 2)}px, ${cursorY - (cursor.clientHeight / 2)}px, 0)`;
  requestAnimationFrame(animateCursor);
}

requestAnimationFrame(animateCursor);

cursor.style.background = '#E0E0E0';

document.getElementById('insideNameBox').style.color = '#FFFFFF';
document.getElementById('aboutTopRight').style.color = '#FFFFFF';
document.getElementById('resumeTopRight').style.color = '#FFFFFF';
