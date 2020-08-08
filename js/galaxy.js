document.addEventListener('DOMContentLoaded', function() {
    var app = new PIXI.Application(800, 600, { backgroundColor: 0x000000 });
    document.body.appendChild(app.view);

    var starTexture = PIXI.Texture.from('https://cdn.jsdelivr.net/gh/mihirukiss/onlooker@1.1/img/star.png');

    var starAmount = 1000;
    var cameraZ = 0;
    var fov = 20;
    var baseSpeed = 0.025;
    var speed = 0;
    var warpSpeed = 0;
    var starStretch = 5;
    var starBaseSize = 0.05;

    var stars = [];
    for (var i = 0; i < starAmount; i++) {
        var star = {
            sprite: new PIXI.Sprite(starTexture),
            z: 0,
            x: 0,
            y: 0
        };
        star.sprite.anchor.x = 0.5;
        star.sprite.anchor.y = 0.7;
        randomizeStar(star, true);
        app.stage.addChild(star.sprite);
        stars.push(star);
    }

    function randomizeStar(star, initial) {
        star.z = initial ? Math.random() * 2000 : cameraZ + Math.random() * 1000 + 2000;

        var deg = Math.random() * Math.PI * 2;
        var distance = Math.random() * 50 + 1;
        star.x = Math.cos(deg) * distance;
        star.y = Math.sin(deg) * distance;
    }

    setInterval(function() {
        warpSpeed = warpSpeed > 0 ? 0 : 1;
    }, 5000);

    app.ticker.add(function(delta) {
        speed += (warpSpeed - speed) / 20;
        cameraZ += delta * 10 * (speed + baseSpeed);
        for (var i = 0; i < starAmount; i++) {
            var star = stars[i];
            if (star.z < cameraZ) randomizeStar(star);

            var z = star.z - cameraZ;
            star.sprite.x = star.x * (fov / z) * app.renderer.screen.width + app.renderer.screen.width / 2;
            star.sprite.y = star.y * (fov / z) * app.renderer.screen.width + app.renderer.screen.height / 2;

            var dxCenter = star.sprite.x - app.renderer.screen.width / 2;
            var dyCenter = star.sprite.y - app.renderer.screen.height / 2;
            var distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter + dyCenter);
            var distanceScale = Math.max(0, (2000 - z) / 2000);
            star.sprite.scale.x = distanceScale * starBaseSize;
            star.sprite.scale.y = distanceScale * starBaseSize + distanceScale * speed * starStretch * distanceCenter / app.renderer.screen.width;
            star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
        }
    });

    
    window.onresize = () =>
    {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    }
    window.onresize();
});