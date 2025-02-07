const liveStreams = [
    {
        image: "streams/prompt.jpeg",
        title: "COT-DSPY: Prompt Optimization",
        date: "March 01, 2025",
        time: "18:30 PM IST",
        location: "Online",
        status: "Registration Open",
        link: "https://lu.ma/zkk8r0kp"
    },
    {
        image: "streams/education.jpeg",
        title: "AI in education: crewAI-101",
        date: "Feb 23, 2025",
        time: "18:30 PM IST",
        location: "Online",
        status: "Registration Open",
        link: "https://lu.ma/zkk8r0kp"
    },
    {
        image: "streams/police.jpeg",
        title: "Training program on AI for Police",
        date: "Jan 26, 2025",
        time: "10:00 AM IST",
        location: "Cybercrime Investigation Training and Research, CID Karnataka.",
        status: "Closed",
        link: "#"
    },
    {
        image: "streams/office.jpeg",
        title: "Corporate workshop on AI - Vitesco technologies",
        date: "Jan 28, 2025",
        time: "3:00 PM IST",
        location: "Vitesco Technologies, Bangalore",
        status: "Closed",
        link: "#"
    }
];

// Sample data for videos
const videos = [
    {
        title: "Multimodal Agents",
        link: "https://www.youtube.com/watch?v=eZSpBLYG-Mk"
    },
    {
        title: "WTF is ReAct Agent?",
        link: "https://www.youtube.com/watch?v=bHn4dLJYIqE"
    },
    {
        title: "DeepSeek R1 and Qdrant Binary quantization",
        link: "https://www.youtube.com/watch?v=NK1wp3YVY4Q"
    },
    {
        title: "Agentic RAG",
        link: "https://www.youtube.com/watch?v=CDC3GOuJyZ0"
    },
    {
        title: "Langchain Crash Course",
        link: "https://www.youtube.com/watch?v=TWmV95-dUgQ"
    },
    {
        title: "Function calling",
        link: "https://www.youtube.com/watch?v=vAHfamRYuC4"
    },
    {
        title: "RAG using Open Source LLMs",
        link: "https://www.youtube.com/watch?v=dUkiQ_WI92c"
    }
];

// Partner data with logo paths
const partners = [
    { name: "Qdrant", logo: "logos/qdrant.png" },
    { name: "Agno", logo: "logos/agno.png" },
    { name: "AI Planet", logo: "logos/aiplanet.svg" }
];

// Helper function to extract YouTube video ID
function getYouTubeVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// Populate live stream cards
function createStreamCards() {
    const streamsGrid = document.getElementById('streams-grid');
    liveStreams.forEach(stream => {
        const card = document.createElement('div');
        card.className = 'stream-card';
        card.innerHTML = `
            <img src="${stream.image}" alt="${stream.title}" class="stream-image">
            <div class="stream-content">
                <h3 class="stream-title">${stream.title}</h3>
                <div class="stream-details">
                    <span>Date:</span>
                    <span>${stream.date}</span>
                    <span>Time:</span>
                    <span>${stream.time}</span>
                    <span>Location:</span>
                    <span>${stream.location}</span>
                </div>
                <span class="stream-status">
                    <a href=${stream.link} target="_blank">${stream.status}</a>
                    </span>
            </div>
        `;
        streamsGrid.appendChild(card);
    });
}

// Create video cards with infinite scroll
function createVideoCards() {
    const videoScroll = document.getElementById('video-scroll');
    const doubledVideos = [...videos, ...videos]; // Double for smooth infinite scroll
    
    doubledVideos.forEach(video => {
        const videoId = getYouTubeVideoId(video.link);
        const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '/api/placeholder/300/169';
        
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `
            <a href="${video.link}" target="_blank" rel="noopener noreferrer" class="video-link">
                <img src="${thumbnailUrl}" alt="${video.title}" class="video-thumbnail">
                <div class="video-content">
                    <h3 class="video-title">${video.title}</h3>
                </div>
            </a>
        `;
        videoScroll.appendChild(card);
    });
}

// Update partner logos function
function createPartnerGrids() {
    const partnersGrid = document.getElementById('partners-grid');
    partners.forEach(partner => {
        const logo = document.createElement('img');
        logo.src = partner.logo;
        logo.alt = partner.name;
        logo.title = partner.name;
        logo.className = 'partner-logo';
        partnersGrid.appendChild(logo);
    });

    // Add click handler for sponsor button
    const sponsorButton = document.querySelector('.sponsor-button');
    if (sponsorButton) {
        sponsorButton.addEventListener('click', () => {
            window.location.href = 'mailto:sponsor@aiwithtarun.ai';
        });
    }
}

// Initialize all dynamic content and set up event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const hamburger = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const overlay = document.getElementById('overlay');

    function toggleMenu(show) {
        mobileMenu.classList.toggle('active', show);
        overlay.classList.toggle('active', show);
        document.body.style.overflow = show ? 'hidden' : '';
    }

    hamburger.addEventListener('click', () => toggleMenu(true));
    closeMenu.addEventListener('click', () => toggleMenu(false));
    overlay.addEventListener('click', () => toggleMenu(false));

    // Hero button click handlers
    document.querySelectorAll('.hero-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const platform = e.target.textContent.toLowerCase();
            console.log(`Navigating to ${platform}`);
        });
    });
    
    // Mobile menu link click handlers
    document.querySelectorAll('.mobile-links a').forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // Newsletter form submission handlers
    document.querySelectorAll('.newsletter-form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = e.target.querySelector('input[type="email"]').value;
            console.log('Newsletter subscription for:', email);
            e.target.reset();
        });
    });

    // Initialize content
    createStreamCards();
    createVideoCards();
    createPartnerGrids();

    // Scroll button functionality
    const scrollButton = document.getElementById('scroll-button');
    if (scrollButton) {
        scrollButton.addEventListener('click', () => {
            const liveStreamsSection = document.getElementById('why-join');
            liveStreamsSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});

// Gallery Carousel functionality
function initCarousel() {
    const slidesContainer = document.querySelector('.carousel-slides');
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.slide-indicator');
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Update slide position
    function updateSlidePosition() {
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('bg-white', index === currentSlide);
            indicator.classList.toggle('bg-white/50', index !== currentSlide);
        });
    }

    // Next slide function
    window.nextSlide = function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlidePosition();
    };

    // Previous slide function
    window.prevSlide = function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlidePosition();
    };

    // Add click handlers to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            updateSlidePosition();
        });
    });

    // Auto advance slides
    setInterval(nextSlide, 5000);

    // Initialize first slide
    updateSlidePosition();
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
});
const testimonialsTrack = document.querySelector('.testimonials-track');
let startX;
let scrollLeft;
let isDown = false;

if (testimonialsTrack) {
    // Mouse Events
    testimonialsTrack.addEventListener('mouseenter', () => {
        testimonialsTrack.style.animationPlayState = 'paused';
    });
    
    testimonialsTrack.addEventListener('mouseleave', () => {
        if (!isDown) {
            testimonialsTrack.style.animationPlayState = 'running';
        }
    });

    // Touch Events
    testimonialsTrack.addEventListener('touchstart', (e) => {
        isDown = true;
        testimonialsTrack.style.animationPlayState = 'paused';
        startX = e.touches[0].pageX - testimonialsTrack.offsetLeft;
        scrollLeft = testimonialsTrack.scrollLeft;
    });

    testimonialsTrack.addEventListener('touchend', () => {
        isDown = false;
        testimonialsTrack.style.animationPlayState = 'running';
    });

    testimonialsTrack.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - testimonialsTrack.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier
        testimonialsTrack.scrollLeft = scrollLeft - walk;
    });

    // Mouse Drag Events
    testimonialsTrack.addEventListener('mousedown', (e) => {
        isDown = true;
        testimonialsTrack.style.animationPlayState = 'paused';
        startX = e.pageX - testimonialsTrack.offsetLeft;
        scrollLeft = testimonialsTrack.scrollLeft;
    });

    testimonialsTrack.addEventListener('mouseleave', () => {
        isDown = false;
        testimonialsTrack.style.animationPlayState = 'running';
    });

    testimonialsTrack.addEventListener('mouseup', () => {
        isDown = false;
        testimonialsTrack.style.animationPlayState = 'running';
    });

    testimonialsTrack.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - testimonialsTrack.offsetLeft;
        const walk = (x - startX) * 2;
        testimonialsTrack.scrollLeft = scrollLeft - walk;
    });
}