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
  