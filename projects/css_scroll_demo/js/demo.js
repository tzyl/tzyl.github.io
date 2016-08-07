$(document).ready(function() {
    function initializePositions() {
        // Set starting postions for tickets to be off screen.
        tickets.each(function(idx) {
            var ticket = $(this);
            // Horizontal mid point of the target container holding the tickets.
            var targetMidPoint = target.offset().left + (target.outerWidth() / 2);
            // Horizontal mid point of the individual ticket. Use parent as it will always give the initial position without the CSS transform.
            var ticketMidPoint = ticket.parent().offset().left + (ticket.parent().outerWidth() / 2);
            // direction is 1 if ticket is further right or -1 if further left.
            var direction = ticketMidPoint > targetMidPoint ? 1 : -1;

            positions[idx] = {
                offsetX: (Math.random() * nudgeX + startX) * direction,
                offsetY: Math.random() * nudgeY - startY,
                rotation: 300 * Math.random() - 150
            };
        });
    }

    function updatePositions(currentScroll) {
        spaceAboveScreen = target.offset().top + target.outerHeight() - window.innerHeight;
        // Calculate how far down we have progressed or if we have finished.
        var scrollProgress = Math.min(currentScroll / spaceAboveScreen, 1);
        // Update positions.
        tickets.each(function(idx) {
            var ticketPosition = positions[idx];
            var newX = ticketPosition.offsetX * (1 - scrollProgress);
            var newY = ticketPosition.offsetY * (1 - scrollProgress);
            var newRotation = ticketPosition.rotation * (1 - scrollProgress);

            $(this).css({
                transform: "translate3d(" + newX + "px, " + newY + "px, 0) rotate3D(0, 0, 1," + newRotation + "deg)"
            });
        })
    }

    // 3D EFFECT
    // function update3d(a) {
    //     var b = a + window.innerHeight / 2;
    //     $(".three-dee").css({
    //         "perspective-origin": "50% " + b + "px",
    //         "-webkit-perspective-origin": "50% " + b + "px"
    //     })
    // }

    function checkScroll() {
        var currentScroll = $(window).scrollTop();
        // Cap the scroll in case we have scrolled past the target.
        var currentScrollCapped = Math.min(currentScroll, Math.max(spaceAboveTarget, spaceAboveScreen));
        // currentScrollCapped !== oldScrollCapped && (updatePositions(currentScroll), update3d(currentScroll), oldScrollCapped = currentScrollCapped)
        if (currentScrollCapped !== oldScrollCapped) {
            updatePositions(currentScroll);
            oldScrollCapped = currentScrollCapped;
        }
    }

    function checkRequestLoop() {
        checkScroll();
        requestFrame(checkRequestLoop);
    }

    var containerAbove = $(".instruction-banner");
    var target = $(".tickets .target");
        //var navbar = $(".navbar-default");

    if (target.length !== 0) {
        var spaceAboveScreen = target.offset().top + target.outerHeight() - window.innerHeight;
        var spaceAboveTarget = containerAbove.offset().top + containerAbove.outerHeight(); //- navbar.outerHeight();
        var oldScrollCapped = null;
        var tickets = $(".tickets .ticket");
        var positions = [];
        var requestFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

        if (typeof requestFrame != "undefined") {
            // Start animation frame check loop.
            requestFrame(checkRequestLoop);
        } else {
            // Fallback to scroll listener.
            $(window).on("scroll", checkScroll);
        }

        var startY = .8 * window.innerHeight;
        var nudgeY = .2 * window.innerHeight;
        var startX = .3 * window.innerWidth;
        var nudgeX = .1 * window.innerWidth;

        initializePositions();
    }

    $('#shuffle-button').click(function(e) {
        e.preventDefault();
        var containers = $('.tickets .target .visible-lg'); // Containers

        containers.each(function() {
            var container = $(this);
            var children = container.children();
            while (children.length) {
                container.append(children.splice(Math.floor(Math.random() * children.length), 1)[0]);
            }
            // var nodes = container.children('.col-sm-3.col-md-2'); // All tickets
            // for (var i = 0; i < nodes.length; i++) {
            //     // Move random child to the end
            //     container.append(nodes.eq(Math.floor(Math.random() * nodes.length)));
            // }
        });

        // Recalculate new starting positions for the shuffled tickets.
        tickets = $(".tickets .ticket");
        initializePositions();
        oldScrollCapped = null;
    });

    $('#order-button').click(function(e) {
        e.preventDefault();
    });
});
