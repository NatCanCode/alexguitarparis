// cursor //
(function () {
    const cursor = document.querySelector('.cursor');
    const circle = document.querySelector('.circle');
    const links = document.querySelectorAll('.link');
    const editPosCursor = (e) => {
        const {clientX: x, clientY: y} = e;
        cursor.style.left = x + 'px';
        cursor.style.top = y + 'px';
        circle.style.left = x + 'px';
        circle.style.top = y + 'px';
    }
    const animateit = function(e) {
        const span = this.querySelector('span');
        const {offsetX: x, offsetY: y} = e,
            {offsetWidth: width, offsetHeight: height} = this,
            move = 25,
            xMove = x / width * (move * 2) - move,
            yMove = y / height * (move * 2) - move;
        
        span.style.transform = `translate(${xMove}px, ${yMove}px)`;
        circle.classList.add('hover');
        if (e.type === 'mouseleave') {
            circle.classList.remove('hover');
            span.style.transform = '';
        }
    }
    window.addEventListener('mousemove', editPosCursor);
    links.forEach(link => link.addEventListener('mousemove', animateit));
    links.forEach(link => link.addEventListener('mouseleave', animateit));
})();

// scroll reveal //
const sr = ScrollReveal({
    duration: 1000,
    reset: true,
    mobile: true
})
sr.reveal('.scrollreveal', {
	// interval: 16, ???
})
sr.reveal('.scroll1', {
    delay: 500
})
sr.reveal('.scroll2', {
    delay: 1000
}, 200) // delai en cascade en millisecondes


// Contact Form API: > prevent default behaviour of having a Formspree window opened. We want to go back to our own website! > https://www.youtube.com/watch?v=vc9rgFHr098 //
var form = document.getElementById("my-form");
    
async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("status");
    var data = new FormData(event.target);
    fetch(event.target.action, {
        method: form.method,
        body: data, 
        headers: {
            'Accept': 'application/json'
        } 
    }).then(response => {
        if (response.ok) {
            status.classList.add('success');
            status.innerHTML = "Thanks!";
            form.reset()
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
                status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
                status.classList.add('error');
                status.innerHTML = "Oops! There was a problem"
            }
          })
        }
    }).catch(error => {
        status.classList.add('error');
        status.innerHTML = "Oops! There was a problem"
    });
}
form.addEventListener("submit", handleSubmit)

