document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('trickyButton');
    const container = document.querySelector('.container');
    let isMoving = false;

    function moveButtonAway(e) {
        if (isMoving) return;

        // Get the button's current position and dimensions
        const rect = button.getBoundingClientRect();
        const buttonX = rect.left + rect.width / 2;
        const buttonY = rect.top + rect.height / 2;

        // Get the mouse or touch coordinates
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;

        // Calculate distance and direction
        const dist = Math.hypot(buttonX - clientX, buttonY - clientY);

        if (dist < 200) {  // Trigger when the mouse/finger is within 200px
            const angle = Math.atan2(clientY - buttonY, clientX - buttonX);
            const moveDistance = 200; // Distance the button should move away
            let offsetX = buttonX + Math.cos(angle) * moveDistance;
            let offsetY = buttonY + Math.sin(angle) * moveDistance;

            // Get container dimensions
            const containerRect = container.getBoundingClientRect();
            const maxX = containerRect.right - rect.width;
            const maxY = containerRect.bottom - rect.height;

            // Constrain movement within the container
            if (offsetX < containerRect.left) offsetX = containerRect.left;
            if (offsetX > maxX) offsetX = maxX;
            if (offsetY < containerRect.top) offsetY = containerRect.top;
            if (offsetY > maxY) offsetY = maxY;

            // Apply movement
            button.style.position = 'absolute';
            button.style.transform = `translate(${offsetX - buttonX}px, ${offsetY - buttonY}px)`;
            button.style.transition = "transform 0.5s ease-out";

            isMoving = true;

            // Reset button position after the move
            setTimeout(() => {
                button.style.transition = "none";
                button.style.transform = "none";
                button.style.left = `${offsetX}px`;
                button.style.top = `${offsetY}px`;
                isMoving = false;
            }, 500);
        }
    }

    // Event listeners for desktop and mobile
    container.addEventListener('mousemove', moveButtonAway);
    container.addEventListener('touchstart', moveButtonAway);

    // Center the button initially
    window.addEventListener('resize', () => {
        button.style.left = `calc(50% - ${button.offsetWidth / 2}px)`;
        button.style.top = `calc(50% - ${button.offsetHeight / 2}px)`;
    });

    window.dispatchEvent(new Event('resize'));
});
