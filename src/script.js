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

document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.text-pop-in');
    elements.forEach((el, index) => {
      // Give each text element its moment by setting a staggered delay
      el.style.animationDelay = `${index * 0.2}s`;
      el.style.animationDuration = '0.9s';
      el.classList.add('animated');
    });
  });
  
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

document.querySelector('.about-top-right').addEventListener('mouseenter', function() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 20) + 60;
  const lightness = Math.floor(Math.random() * 20) + 70;
  this.style.color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
});

document.querySelector('.about-top-right').addEventListener('mouseleave', function() {
  this.style.color = '';
});

document.querySelector('.resume-top-right').addEventListener('mouseenter', function() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 20) + 60;
  const lightness = Math.floor(Math.random() * 20) + 70;
  this.style.color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
});

document.querySelector('.resume-top-right').addEventListener('mouseleave', function() {
  this.style.color = '';
});