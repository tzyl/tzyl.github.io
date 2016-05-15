$(document).ready(function() {
    function a(a) {
        l = k.offset().top + k.outerHeight() - window.innerHeight;
        var b = Math.min(a / l, 1);
        o.each(function(a) {
            var c = p[a],
                d = c.offsetX * (1 - b),
                e = c.offsetY * (1 - b),
                f = c.rotation * (1 - b);
            $(this).css({
                transform: "translate3d(" + d + "px, " + e + "px, 0) rotate3D(0, 0, 1," + f + "deg)"
            })
        })
    }

    function b(a) {
        var b = a + window.innerHeight / 2;
        $(".three-dee").css({
            "perspective-origin": "50% " + b + "px",
            "-webkit-perspective-origin": "50% " + b + "px"
        })
    }

    function c() {
        var c = $(window).scrollTop(),
            d = Math.min(c, Math.max(m, l));
        d !== n && (a(c), b(c), n = d)
    }

    function d() {
        c(), q(d)
    }

    var i = $(".instruction-banner"),
        //j = $(".navbar-default"),
        k = $(".tickets .target");
    if (0 !== k.length) {
        var l = k.offset().top + k.outerHeight() - window.innerHeight,
            m = i.offset().top + i.outerHeight() //- j.outerHeight(),
            n = null,
            o = $(".tickets .ticket"),
            p = [],
            q = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        "undefined" != typeof q ? q(d) : $(window).on("scroll", c);
        var r = .8 * window.innerHeight,
            s = .2 * window.innerHeight,
            t = .3 * window.innerWidth,
            u = .1 * window.innerWidth,
            v = k.offset().left + (k.outerWidth() >> 1);
        o.each(function(a) {
            var b = $(this),
                c = b.offset().left + (b.outerWidth() >> 1),
                d = c > v ? 1 : -1;
            p[a] = {
                offsetX: (Math.random() * u + t) * d,
                offsetY: Math.random() * s - r,
                rotation: 300 * Math.random() - 150
            }
        })
    }

    $('#shuffle-button').click(function(e) {
        e.preventDefault();
        var containers = $('.tickets .target .visible-lg'); // Containers

        containers.each(function() {
            var container = $(this);
            var nodes = container.children('.col-sm-3.col-md-2'); // All tickets
            for (var i = 1; i < nodes.length; i++) {
                // Move random child to the end
                container.append(nodes.eq(Math.floor(Math.random() * nodes.length)));
            }
        })
    });

    $('#order-button').click(function(e) {
        e.preventDefault();
    })
})
