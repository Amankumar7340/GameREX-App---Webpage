// Platform Selector
const platformBtns = document.querySelectorAll('.platform-btn');
const androidDownload = document.getElementById('android-download');
const iosDownload = document.getElementById('ios-download');

platformBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        platformBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        if (btn.dataset.platform === 'android') {
            androidDownload.style.display = 'block';
            iosDownload.style.display = 'none';
        } else {
            androidDownload.style.display = 'none';
            iosDownload.style.display = 'block';
        }
    });
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Image Carousel Functionality
const carouselImages = document.querySelectorAll('.carousel-image');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function showImage(index) {
    carouselImages.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    carouselImages[index].classList.add('active');
    dots[index].classList.add('active');
    currentIndex = index;
}

function nextImage() {
    let newIndex = currentIndex + 1;
    if (newIndex >= carouselImages.length) {
        newIndex = 0;
    }
    showImage(newIndex);
}

function prevImage() {
    let newIndex = currentIndex - 1;
    if (newIndex < 0) {
        newIndex = carouselImages.length - 1;
    }
    showImage(newIndex);
}

// Event Listeners
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        showImage(parseInt(dot.dataset.index));
    });
});

// Auto-advance carousel (optional)
// setInterval(nextImage, 5000);

// Form Submission
const form = document.getElementById('form');
const result = document.getElementById('result');
const popup = document.getElementById('popup');
const circleLoader = document.querySelector('.circle-loader');
const checkmark = document.querySelector('.checkmark');
const popupResult = document.getElementById('popup-result');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.innerHTML = "Please wait...";
    popup.style.display = 'block';
    circleLoader.style.display = 'block';
    checkmark.style.display = 'none';
    popupResult.textContent = '';

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
    .then(async (response) => {
        let json = await response.json();
        if (response.status === 200) {
            result.innerHTML = "Form submitted successfully!";
            popupResult.textContent = "Form submitted successfully!";
            circleLoader.style.display = 'none';
            checkmark.style.display = 'block';
        } else {
            result.innerHTML = json.message || "An error occurred. Please try again.";
            popupResult.textContent = json.message || "An error occurred. Please try again.";
            popup.style.display = 'none';
        }
    })
    .catch((error) => {
        console.error(error);
        result.innerHTML = "Something went wrong! Please check your connection.";
        popupResult.textContent = "Something went wrong! Please check your connection.";
        popup.style.display = 'none';
    })
    .finally(() => {
        form.reset();
        setTimeout(() => {
            popup.style.display = "none";
            result.style.display = "none";
        }, 3000);
    });
});