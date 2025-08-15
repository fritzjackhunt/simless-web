document.addEventListener("scroll", function () {
    const container = document.querySelector(".timeline-container");
    const line = document.querySelector(".timeline-line");
    const dots = document.querySelectorAll(".timeline-dot");

    if (!container || !line || dots.length === 0) return;

    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Position of first and last dots (relative to container)
    const firstDot = dots[0];
    const lastDot = dots[dots.length - 1];

    const containerTop = rect.top + window.scrollY;
    const firstDotTop = firstDot.offsetTop;
    const lastDotTop = lastDot.offsetTop;

    // Total line height from first to last dot
    const totalLineHeight = lastDotTop - firstDotTop;

    // Scroll progress relative to container
    const scrollProgress = Math.min(
        1,
        Math.max(
            0,
            (windowHeight - (rect.top + firstDotTop)) / (totalLineHeight + windowHeight)
        )
    );

    // Current line height based on scroll
    const currentHeight = scrollProgress * totalLineHeight;
    line.style.top = `${firstDotTop}px`;
    line.style.height = `${currentHeight}px`;

    // Activate dots when line reaches them
    dots.forEach(dot => {
        if (dot.offsetTop <= firstDotTop + currentHeight) {
            dot.style.opacity = 1; // active
        } else {
            dot.style.opacity = 0.3; // inactive
        }
    });
});
