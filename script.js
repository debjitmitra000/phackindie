window.onload = function() {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
};

document.addEventListener('DOMContentLoaded', () => {
    const topLayer = document.querySelector('.top-layer');
    const totalScrollWidth = topLayer.scrollWidth - window.innerWidth;

    const audioButton = document.getElementById('audioButton');
    const audio1 = document.getElementById('audio1');
    const audio2 = document.getElementById('audio2');
    const audio3 = document.getElementById('audio3');
    const audio4 = document.getElementById('audio4');

    document.body.style.height = `${totalScrollWidth + window.innerHeight}px`;

    gsap.registerPlugin(ScrollTrigger);

    // Create horizontal scrolling effect
    const createHorizontalScroll = (element) => {
        gsap.to(element, {
            x: () => `-${totalScrollWidth}px`,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: 'top top',
                end: () => `+=${totalScrollWidth}`,
                scrub: true,
                pin: true,
                anticipatePin: 1
            }
        });
    };

    createHorizontalScroll(topLayer);

    // Ghost animations
    const ghostAppear = gsap.fromTo(
        '.ghost2',
        { y: '-150%', opacity: 0.5 },
        {
            y: '0%',
            opacity: 1,
            duration: 1.5,
            ease: 'power1.out',
            scrollTrigger: {
                trigger: '.ghost2',
                start: () => `left+=${window.innerWidth * 1.8}`,
                end: () => `+=200`,
                scrub: true
            }
        }
    );

    const ghostMove = gsap.to('.ghost2', {
        x: '2200',
        opacity: 1,
        duration: 2,
        ease: 'power1.inOut',
        scrollTrigger: {
            trigger: '.ghost2',
            start: () => `left+=${window.innerWidth * 2.4}`,
            end: () => `+=1500`,
            scrub: true
        }
    });

    const ghostDisappear = gsap.to('.ghost2', {
        opacity: 0,
        duration: 1,
        ease: 'power1.out',
        scrollTrigger: {
            trigger: '.ghost2',
            start: () => `left+=${window.innerWidth * 3.2}`,
            end: () => `+=300`,
            scrub: true,
            onLeave: () => {
                const ghostElement = document.querySelector('.ghost2');
                
                // Change the ghost image to the GIF after it disappears
                ghostElement.innerHTML = `<img src="cloth.gif" alt="Ghost 2" height="400px">`;
    
                // Make the GIF visible
                gsap.to(ghostElement, {
                    opacity: 1,
                    duration: 0, // No fade-in effect; just make it visible
                    ease: 'power1.out'
                });
    
                
                // Fade out the PNG after 2 seconds if needed
                setTimeout(() => {
                    gsap.to(ghostElement, {
                        opacity: 1,
                        duration: 1,
                        ease: 'power1.out'
                    });
                }, 4000); // Start fade-out after the PNG is displayed for 2 seconds
            },
            onEnterBack: () => {
                const ghostElement = document.querySelector('.ghost2');
                
                // When scrolling back, change back to the original ghost
                ghostElement.innerHTML = `<img src="stree.png" alt="Ghost 2" height="400px">`;
                
                // Fade back in the ghost
                gsap.to(ghostElement, {
                    opacity: 1,
                    duration: 1,
                    ease: 'power1.out'
                });
            }
        }
    });

    

    const manjulikaDiagonalMove = gsap.fromTo(
        '.ghost3',
        { y: '100%', x: '-40%', opacity: 1 }, // Starts from below and slightly to the left
        {
            y: '0%', x: '40%', // Moves up and to the right
            opacity: 1, // Stays visible throughout
            duration: 5,
            ease: 'power1.out',
            scrollTrigger: {
                trigger: '.ghost3',
                start: () => `left+=${window.innerWidth * 3.4}`, // Adjust starting point based on viewport width
                end: () => `+=400`, // Adjust end point for smooth transition
                scrub: true, // Ensures the animation follows the scroll
            }
        }
    );
    
    
    const kingSimpleMove = gsap.fromTo(
        '.king',
        { x: '100%', opacity: 1 }, // Starts from off-screen to the right
        {
            x: '0%', // Moves to the center of the screen
            opacity: 1, // Stays visible throughout
            duration: 8,
            ease: 'power1.out',
            scrollTrigger: {
                trigger: '.king',
                start: () => `left+=${window.innerWidth * 4.5}`, // Adjust starting point based on viewport width
                end: () => `+=400`, // Adjust end point for smooth transition
                scrub: true, // Ensures the animation follows the scroll
                onUpdate: (self) => {
                    // Check if the animation is near the end (e.g., 90% progress)
                    if (self.progress > 0.9) {
                        const dancerElement = document.querySelector('.dancer img');
                        dancerElement.src = 'dancer.gif';
                    }
                }
            }
        }
    );
    
    // Animation for kanchana coming from the top
gsap.fromTo(
    '#kanchana',
    { y: '-100%', opacity: 0 },
    {
        y: '0%',
        opacity: 1,
        duration: 1.5,
        ease: 'power1.out',
        scrollTrigger: {
            trigger: '#kanchana',
            start: () => `left+=${window.innerWidth * 6.5}`, // Adjust start position
            end: () => `+=300`, // Adjust for smoother transition
            scrub: true,
            once: false, // Ensures it can be triggered again on re-entry
            onEnter: () => gsap.fromTo('#kanchana', { y: '-100%', opacity: 0 }, { y: '0%', opacity: 1 }),
            onLeaveBack: () => gsap.set('#kanchana', { y: '-100%', opacity: 0 }), // Reset position when scrolling back
            onUpdate: (self) => {
                // Trigger animations for chacha and kid once kanchana's animation is near complete
                if (self.progress >= 0.95) {
                    chachaAnimation.play();
                    kidAnimation.play();
                }
            }
        }
    }
);

// Animation for chacha coming from behind kanchana to the left
const chachaAnimation = gsap.fromTo(
    '#chacha',
    { x: '70%', opacity: 0 },
    {
        x: '-30%',
        opacity: 1,
        duration: 5,
        ease: 'power1.out',
        scrollTrigger: {
            trigger: '#kanchana',
            start: () => `left+=${window.innerWidth * 7}`, // Adjust start position
            end: () => `+=300`, // Adjust for smoother transition
            scrub: true,
            once: false, // Ensures it can be triggered again on re-entry
        },
        paused: true // Initially paused, to be played when kanchana finishes
    }
);

// Animation for kid coming from behind kanchana to the right
const kidAnimation = gsap.fromTo(
    '#kid',
    { x: '-70%', opacity: 0 },
    {
        x: '30%',
        opacity: 1,
        duration: 5,
        ease: 'power1.out',
        scrollTrigger: {
            trigger: '#kanchana',
            start: () => `left+=${window.innerWidth * 7}`, // Adjust start position
            end: () => `+=300`, // Adjust for smoother transition
            scrub: true,
            once: false, // Ensures it can be triggered again on re-entry
        },
        paused: true // Initially paused, to be played when kanchana finishes
    }
);

    
    const handleAudioPlayback = (triggerElement, audioElement, startPx, endPx) => {
        ScrollTrigger.create({
            trigger: triggerElement,
            start: `left+=${startPx}`, // Start playback at specific pixel value
            end: `left+=${endPx}`, // End playback at specific pixel value
            onEnter: () => {
                audioElement.currentTime = 0; // Reset audio to the beginning
                audioElement.play().catch(error => {
                    console.error('Audio play failed:', error);
                });
            },
            onLeave: () => audioElement.pause(), // Pause audio when leaving the end of the range
            onEnterBack: () => audioElement.play(), // Resume playing when scrolling back into the range
            onLeaveBack: () => audioElement.pause(), // Pause when leaving the range backwards
        });
    };

    // Attach audio playback to each section using start and end pixel values
    handleAudioPlayback('.ghost1', audio1, -100, 2900); // Adjust the start and end pixels as needed
    handleAudioPlayback('.ghost2', audio2, 3220, 6448);
    handleAudioPlayback('.ghost3', audio3, 5000, 8800);
    handleAudioPlayback('.ghost4', audio4, 9673, 12896);

});
