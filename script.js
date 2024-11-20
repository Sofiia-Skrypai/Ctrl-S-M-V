let lastScrollY = 0;
let initialButtonPosition = null;
let maxHeight = 18; // Максимальна висота кнопок у vh
let minHeight = 8; // Мінімальна висота кнопок у vh

window.addEventListener('scroll', () => {
    const buttonContainer = document.querySelector('.hero__buttons');

    if (initialButtonPosition === null) {
        initialButtonPosition = buttonContainer.getBoundingClientRect().top + window.scrollY;
    }

    const containerPosition = buttonContainer.getBoundingClientRect().top;

    // Додаємо/знімаємо фіксований клас
    if (containerPosition <= 0 && window.scrollY > lastScrollY) {
        buttonContainer.classList.add('hero__buttons--fixed');
    } 
    else if (window.scrollY <= initialButtonPosition && window.scrollY < lastScrollY) {
        buttonContainer.classList.remove('hero__buttons--fixed');
    }

    // Додаткове зменшення кнопок
    if (containerPosition <= 0) {
        const buttons = document.querySelectorAll('.hero__buttons .button');
        const shrinkStart = initialButtonPosition; // Початкова точка зменшення
        const shrinkEnd = shrinkStart + 70; // Точка, коли кнопки досягають мінімального розміру

        if (window.scrollY > shrinkStart && window.scrollY < shrinkEnd) {
            const scrollProgress = window.scrollY - shrinkStart;
            const newHeight = Math.max(
                minHeight,
                maxHeight - (scrollProgress / (shrinkEnd - shrinkStart)) * (maxHeight - minHeight)
            );

            buttons.forEach(button => {
                button.style.height = `${newHeight}vh`;
            });
        } else if (window.scrollY >= shrinkEnd) {
            // Встановлюємо мінімальний розмір, якщо прокрутка перевищує кінець
            buttons.forEach(button => {
                button.style.height = `${minHeight}vh`;
            });
            buttonContainer.classList.add('hero__buttons--shrink');
        } else if (window.scrollY <= shrinkStart) {
            // Встановлюємо максимальний розмір, якщо прокрутка повертається до початку
            buttons.forEach(button => {
                button.style.height = `${maxHeight}vh`;
            });
            buttonContainer.classList.remove('hero__buttons--shrink');
        }
    }

    lastScrollY = window.scrollY;
    
});
