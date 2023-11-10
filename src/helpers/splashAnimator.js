function splashAnimator(styles) {
    const pageLoader = document.querySelector(`.${styles['page-loader']}`);
    const logoSpan = document.querySelectorAll(`.${styles['logo']}`);

    setTimeout(() => {
        logoSpan.forEach((span, index) => {
            setTimeout(() => {
                span.classList.add(styles['active']);
            }, (index + 1) * 500);
        });

        setTimeout(() => {
            logoSpan.forEach((span, index) => {
                setTimeout(() => {
                    span.classList.remove(styles['active']);
                    span.classList.add(styles['fade']);
                }, (index + 1) * 100);
            });
        }, 2800);

        setTimeout(() => {
            pageLoader.style.display = "none";
        }, 3800);
    }, 50);
}

export default splashAnimator;