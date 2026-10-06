document.addEventListener("DOMContentLoaded", function () {

    // ===============================
    // Person Details
    // ===============================

    const personName = "Kusuma";


    // ===============================
    // Elements
    // ===============================

    const personNameElement =
        document.getElementById("personName");

    const welcomeScreen =
        document.getElementById("welcomeScreen");

    const questionScreen =
        document.getElementById("questionScreen");

    const birthdayScreen =
        document.getElementById("birthdayScreen");

    const openBtn =
        document.getElementById("openBtn");

    const yesBtn =
        document.getElementById("yesBtn");

    const noBtn =
        document.getElementById("noBtn");

    const balloonsContainer =
        document.getElementById("balloons");

    const canvas =
        document.getElementById("confetti");

    const ctx =
        canvas.getContext("2d");


    // ===============================
    // Check Project
    // ===============================

    console.log("Birthday project loaded");

    console.log("Open button:", openBtn);

    console.log("YES button:", yesBtn);

    console.log("NO button:", noBtn);

    console.log("Question screen:", questionScreen);

    console.log("Birthday screen:", birthdayScreen);


    // ===============================
    // Set Person Name
    // ===============================

    personNameElement.innerHTML =
        `Hey ${personName} 👋`;


    // ===============================
    // Change Screen
    // ===============================

    function showScreen(screen) {

        document
            .querySelectorAll(".screen")
            .forEach(function (item) {

                item.classList.remove("active");

            });

        screen.classList.add("active");

    }


    // ===============================
    // Open Gift Button
    // ===============================

    openBtn.addEventListener("click", function () {

        console.log("Open Your Gift clicked");

        showScreen(questionScreen);

    });


    // ===============================
    // Moving NO Button
    // ===============================

    function moveNoButton() {

        const padding = 20;

        const btnWidth =
            noBtn.offsetWidth;

        const btnHeight =
            noBtn.offsetHeight;


        const maxX =
            Math.max(
                0,
                window.innerWidth -
                btnWidth -
                padding
            );


        const maxY =
            Math.max(
                0,
                window.innerHeight -
                btnHeight -
                padding
            );


        const randomX =
            Math.floor(
                Math.random() *
                maxX
            );


        const randomY =
            Math.floor(
                Math.random() *
                maxY
            );


        noBtn.style.left =
            randomX + "px";

        noBtn.style.top =
            randomY + "px";


        console.log("NO button moved");

    }


    // ===============================
    // NO Button - Desktop
    // ===============================

    noBtn.addEventListener(
        "mouseenter",
        function () {

            moveNoButton();

        }
    );


    // ===============================
    // NO Button - Mobile
    // ===============================

    noBtn.addEventListener(
        "touchstart",
        function (event) {

            event.preventDefault();

            moveNoButton();

        }
    );


    // ===============================
    // NO Button - Backup
    // ===============================

    noBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            moveNoButton();

        }
    );


    // ===============================
    // YES Button
    // ===============================

    yesBtn.addEventListener("click", function () {

        console.log("YES clicked");

        // Show birthday screen
        showScreen(birthdayScreen);

        // Start confetti
        createConfetti();

        // Create balloons
        createBalloons();

    });


    // ===============================
    // Create Multiple Balloons
    // ===============================

    function createBalloons() {

        for (let i = 0; i < 20; i++) {

            setTimeout(function () {

                createBalloon();

            }, i * 150);

        }

    }


    // ===============================
    // Create Single Balloon
    // ===============================

    function createBalloon() {

        const balloon =
            document.createElement("div");


        balloon.className =
            "balloon";


        const balloonTypes = [

            "🎈",
            "🎈",
            "🎈",
            "🎀",
            "🎈"

        ];


        balloon.innerHTML =
            balloonTypes[
                Math.floor(
                    Math.random() *
                    balloonTypes.length
                )
            ];


        // Random horizontal position

        balloon.style.left =
            Math.random() * 100 + "%";


        // Random size

        balloon.style.fontSize =
            (
                30 +
                Math.random() * 35
            ) + "px";


        // Random animation speed

        balloon.style.animationDuration =
            (
                6 +
                Math.random() * 5
            ) + "s";


        // Add balloon to page

        balloonsContainer.appendChild(
            balloon
        );


        // Remove balloon later

        setTimeout(function () {

            balloon.remove();

        }, 12000);

    }


    // ===============================
    // Continuous Balloons
    // ===============================

    setInterval(function () {

        createBalloon();

    }, 1000);


    // ===============================
    // Confetti Canvas Size
    // ===============================

    function resizeCanvas() {

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

    }


    resizeCanvas();


    window.addEventListener(
        "resize",
        resizeCanvas
    );


    // ===============================
    // Create Confetti
    // ===============================

    function createConfetti() {

        const particles = [];


        // Create particles

        for (let i = 0; i < 220; i++) {

            particles.push({

                x:
                    Math.random() *
                    canvas.width,


                y:
                    -20,


                size:
                    5 +
                    Math.random() * 8,


                speed:
                    2 +
                    Math.random() * 5,


                rotation:
                    Math.random() * 360,


                rotationSpeed:
                    Math.random() * 8,


                color:
                    `hsl(
                        ${Math.random() * 360},
                        100%,
                        60%
                    )`

            });

        }


        // Animate confetti

        function animate() {

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );


            particles.forEach(
                function (p) {

                    ctx.save();


                    ctx.translate(
                        p.x,
                        p.y
                    );


                    ctx.rotate(
                        p.rotation *
                        Math.PI / 180
                    );


                    ctx.fillStyle =
                        p.color;


                    ctx.fillRect(

                        -p.size / 2,

                        -p.size / 2,

                        p.size,

                        p.size

                    );


                    ctx.restore();


                    // Move down

                    p.y += p.speed;


                    // Rotate

                    p.rotation +=
                        p.rotationSpeed;

                }
            );


            // Continue animation

            if (
                particles.some(
                    function (p) {

                        return (
                            p.y <
                            canvas.height + 30
                        );

                    }
                )
            ) {

                requestAnimationFrame(
                    animate
                );

            } else {

                // Clear canvas when finished

                ctx.clearRect(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );

            }

        }


        animate();

    }


});