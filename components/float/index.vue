<template>
    <div :class="classes">
        <div class="float-container" :class="{'in-zoom':inZoom}" ref="float">
            <slot :resume="resume" :pause="pause" :move="moveTo" :transform="transform" :zoom="zoomAbs"
                  :ease="ease"></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'r-float',
        props: {
            bordered: Boolean,
            disableZoom: Boolean,
            disableMove: Boolean,
            trnsfrmOrigin: Object,
            zoom: {type: Number, default: 1},
            maxZoom: {
                type: Number,
                default: 10
            },
            minZoom: {
                type: Number,
                default: .1
            }
        },
      emits:['move','zoom'],
        data() {
            return {
                started: Date.now(),
                transform: {
                    x: 0,
                    y: 0,
                    scale: this.zoom
                },
                inZoom: false,
                paused: false,
                storedCTMResult: {x: 0, y: 0},
                isDirty: false,
                lastTouchEndTime: 0,
                lastSingleFingerOffset: null,
                touchInProgress: false,
                multiTouch: false,
                mouseX: 0,
                mouseY: 0,
                pinchZoomLength: 0,
                frameAnimation: null
            }
        },
        mounted() {
            this.builder()
        },
        computed: {
            classes() {
                let a = {
                    'float-bordered': this.bordered
                }
                a[`${this.$r.prefix}float`]=true
                return a
            },
            domElement() {
                return this.$refs.float
            },
            owner() {
                return this.domElement.parentElement;
            },
            transformOrigin() {
                if (!this.trnsfrmOrigin || !this.isNumber(this.trnsfrmOrigin.x) || !this.isNumber(this.trnsfrmOrigin.y)) return;

                return this.trnsfrmOrigin;
            },
            getTransformOriginOffset() {
                let ownerRect = this.owner.getBoundingClientRect();
                return {
                    x: ownerRect.width * this.transformOrigin.x,
                    y: ownerRect.height * this.transformOrigin.y
                };
            },
            midPoint() {
                let ownerRect = this.owner.getBoundingClientRect();
                return {
                    x: ownerRect.width / 2,
                    y: ownerRect.height / 2
                };
            },
            getBBox() {
                return {
                    left: 0,
                    top: 0,
                    width: this.domElement.clientWidth,
                    height: this.domElement.clientHeight
                };
            }
        },
        methods: {
            builder() {
                this.domElement.scrollTop = 0;
                this.owner.setAttribute('tabindex', 0);
                this.listenForEvents();
                this.zoomAbs(this.transform.x, this.transform.y, this.transform.scale);
            },
            applyTransform() {
                this.isDirty = false;
                this.domElement.style.transformOrigin = '0 0 0';
                this.domElement.style.transform = 'matrix(' +
                    this.transform.scale + ', 0, 0, ' +
                    this.transform.scale + ', ' +
                    this.transform.x + ', ' + this.transform.y + ')';
                this.frameAnimation = 0;
            },
            pause() {
                this.releaseEvents();
                this.paused = true;
            },
            resume() {
                if (this.paused) {
                    this.listenForEvents();
                    this.paused = false;
                }
            },
            listenForEvents() {
                this.owner.addEventListener('mousedown', this.onMouseDown, {passive: false});
                this.owner.addEventListener('dblclick', this.onDoubleClick, {passive: false});
                this.owner.addEventListener('touchstart', this.onTouch, {passive: false});
                this.owner.addEventListener('keydown', this.onKeyDown, {passive: false});
                this.owner.addEventListener('wheel', this.onMouseWheel, {passive: false});
                this.makeDirty();
            },
            transformToScreen(x, y) {
                this.storedCTMResult.x = x;
                this.storedCTMResult.y = y;
                return this.storedCTMResult;
            },
            moveTo(dx, dy) {
                if (this.disableMove) return;
                this.transform.x += dx;
                this.transform.y += dy;
                this.$emit('move', [dx, dy])
                this.makeDirty();
            },
            makeDirty() {
                this.isDirty = true;
                this.frameAnimation = window.requestAnimationFrame(this.frame);
            },
            ease() {
                this.inZoom = true
                setTimeout(() => {
                    this.inZoom = false
                }, 500)
            },
            zoomByRatio(clientX, clientY, ratio, ease = false) {
                if (this.disableZoom) return;
                if (ease) this.ease();
                if (this.isNaN(clientX) || this.isNaN(clientY) || this.isNaN(ratio)) {
                    throw new Error('zoom requires valid numbers');
                }

                let newScale = this.transform.scale * ratio;

                if (newScale < this.minZoom) {
                    if (this.transform.scale === this.minZoom) return;

                    ratio = this.minZoom / this.transform.scale;
                }
                if (newScale > this.maxZoom) {
                    if (this.transform.scale === this.maxZoom) return;

                    ratio = this.maxZoom / this.transform.scale;
                }

                let size = this.transformToScreen(clientX, clientY);

                this.transform.x = size.x - ratio * (size.x - this.transform.x);
                this.transform.y = size.y - ratio * (size.y - this.transform.y);

                this.transform.scale *= ratio;

                this.$emit('zoom', [clientX, clientY, ratio]);

                this.makeDirty();
            },
            zoomAbs(clientX, clientY, zoomLevel) {
                let ratio = zoomLevel / this.transform.scale;
                this.zoomByRatio(clientX, clientY, ratio);
            },
            frame() {
                if (this.isDirty) this.applyTransform();
            },
            onKeyDown(e) {
                let x = 0,
                    y = 0,
                    z = 0;
                if (e.keyCode === 38) {
                    y = -1; // up
                } else if (e.keyCode === 40) {
                    y = 1; // down
                } else if (e.keyCode === 37) {
                    x = -1; // left
                } else if (e.keyCode === 39) {
                    x = 1; // right
                } else if (e.keyCode === 189 || e.keyCode === 109) {
                    // DASH or SUBTRACT
                    z = 1; // `-` -  zoom out
                } else if (e.keyCode === 187 || e.keyCode === 107) {
                    // EQUAL SIGN or ADD
                    z = -1; // `=` - zoom in (equal sign on US layout is under `+`)
                }

                if (x || y) {
                    e.preventDefault();
                    e.stopPropagation();

                    let clientRect = this.owner.getBoundingClientRect();

                    let offset = Math.min(clientRect.width, clientRect.height);
                    let moveSpeedRatio = 0.05;
                    let dx = offset * moveSpeedRatio * x;
                    let dy = offset * moveSpeedRatio * y;

                    this.moveTo(dx, dy);
                }

                if (z) {
                    let scaleMultiplier = this.getScaleMultiplier(z * 100);
                    let offset = this.transformOrigin ? this.getTransformOriginOffset : this.midPoint;
                    this.zoomByRatio(offset.x, offset.y, scaleMultiplier);
                }
            },
            onTouch(e) {
                if (e.touches.length === 1) {
                    return this.handleSingleFingerTouch(e, e.touches[0]);
                } else if (e.touches.length === 2) {
                    // handleTouchMove() will care about pinch zoom.
                    this.pinchZoomLength = this.getPinchZoomLength(e.touches[0], e.touches[1]);
                    this.multiTouch = true;
                    this.startTouchListenerIfNeeded();
                }
            },
            handleSingleFingerTouch(e) {
                let touch = e.touches[0];
                let offset = this.getOffsetXY(touch);
                this.lastSingleFingerOffset = offset;
                let point = this.transformToScreen(offset.x, offset.y);
                this.mouseX = point.x;
                this.mouseY = point.y;

                this.startTouchListenerIfNeeded();
            },
            startTouchListenerIfNeeded() {
                if (this.touchInProgress) {
                    return;
                }

                this.touchInProgress = true;
                document.addEventListener('touchmove', this.handleTouchMove, {passive: false});
                document.addEventListener('touchend', this.handleTouchEnd);
                document.addEventListener('touchcancel', this.handleTouchEnd);
            },
            handleTouchMove(e) {
                e.stopPropagation();
                e.preventDefault();
                if (e.touches.length === 1) {
                    let touch = e.touches[0];

                    let offset = this.getOffsetXY(touch);
                    let point = this.transformToScreen(offset.x, offset.y);

                    let dx = point.x - this.mouseX;
                    let dy = point.y - this.mouseY;

                    this.mouseX = point.x;
                    this.mouseY = point.y;
                    this.moveTo(dx, dy);
                } else if (e.touches.length === 2) {
                    // it's a zoom, let's find direction
                    this.multiTouch = true;
                    let t1 = e.touches[0];
                    let t2 = e.touches[1];
                    let currentPinchLength = this.getPinchZoomLength(t1, t2);

                    let scaleMultiplier =
                        1 + (currentPinchLength / this.pinchZoomLength - 1);

                    let firstTouchPoint = this.getOffsetXY(t1);
                    let secondTouchPoint = this.getOffsetXY(t2);
                    this.mouseX = (firstTouchPoint.x + secondTouchPoint.x) / 2;
                    this.mouseY = (firstTouchPoint.y + secondTouchPoint.y) / 2;
                    if (this.transformOrigin) {
                        let offset = this.getTransformOriginOffset;
                        this.mouseX = offset.x;
                        this.mouseY = offset.y;
                    }

                    this.zoomByRatio(this.mouseX, this.mouseY, scaleMultiplier);

                    this.pinchZoomLength = currentPinchLength;
                }
            },
            handleTouchEnd(e) {
                if (e.touches.length > 0) {
                    let offset = this.getOffsetXY(e.touches[0]);
                    let point = this.transformToScreen(offset.x, offset.y);
                    this.mouseX = point.x;
                    this.mouseY = point.y;
                } else {
                    let now = new Date();
                    if (now - this.lastTouchEndTime < 300) {
                        if (this.transformOrigin) {
                            let offset = this.getTransformOriginOffset;
                            this.zoomByRatio(offset.x, offset.y, this.transform.scale);
                        } else {
                            // We want untransformed x/y here.
                            this.zoomByRatio(this.lastSingleFingerOffset.x, this.lastSingleFingerOffset.y, this.transform.scale);
                        }
                    }

                    this.lastTouchEndTime = now;
                    this.releaseTouches();
                }
            },
            getPinchZoomLength(finger1, finger2) {
                let dx = finger1.clientX - finger2.clientX;
                let dy = finger1.clientY - finger2.clientY;
                return Math.sqrt(dx * dx + dy * dy);
            },
            onDoubleClick(e) {
                e.preventDefault()
                e.stopPropagation()
                let offset = this.getOffsetXY(e);
                if (this.transformOrigin) {
                    offset = this.getTransformOriginOffset;
                }
                let scaleMultiplier = this.getScaleMultiplier(-1000);
                this.zoomByRatio(offset.x, offset.y, scaleMultiplier, true);
            },
            onMouseDown(e) {
                if (this.touchInProgress) {
                    e.stopPropagation();
                    return false;
                }
                let isLeftButton =
                    (e.button === 1 && window.event !== null) || e.button === 0;
                if (!isLeftButton) return;

                let offset = this.getOffsetXY(e);
                let point = this.transformToScreen(offset.x, offset.y);
                this.mouseX = point.x;
                this.mouseY = point.y;

                document.addEventListener('mousemove', this.onMouseMove);
                document.addEventListener('mouseup', this.onMouseUp);

                return false;
            },
            onMouseMove(e) {
                if (this.touchInProgress) return;

                let offset = this.getOffsetXY(e);
                let point = this.transformToScreen(offset.x, offset.y);
                let dx = point.x - this.mouseX;
                let dy = point.y - this.mouseY;

                this.mouseX = point.x;
                this.mouseY = point.y;
                this.moveTo(dx, dy);
            },
            onMouseUp() {
                this.releaseDocumentMouse();
            },
            onMouseWheel(e) {
                let delta = e.deltaY;
                if (e.deltaMode > 0) delta *= 100;

                let scaleMultiplier = this.getScaleMultiplier(delta);

                if (scaleMultiplier !== 1) {
                    let offset = this.transformOrigin
                        ? this.getTransformOriginOffset
                        : this.getOffsetXY(e);
                    this.zoomByRatio(offset.x, offset.y, scaleMultiplier);
                    e.preventDefault();
                }
            },
            getOffsetXY(e) {
                let offsetX, offsetY;
                let ownerRect = this.owner.getBoundingClientRect();
                offsetX = e.clientX - ownerRect.left;
                offsetY = e.clientY - ownerRect.top;

                return {x: offsetX, y: offsetY};
            },
            getScaleMultiplier(delta) {
                let sign = Math.sign(delta);
                let deltaAdjustedSpeed = Math.min(0.25, Math.abs(delta / 128));
                return 1 - sign * deltaAdjustedSpeed;
            },
            isNumber(x) {
                return Number.isFinite(x);
            },
            isNaN(value) {
                if (Number.isNaN) {
                    return Number.isNaN(value);
                }

                return value !== value;
            },
            releaseEvents() {
                this.owner.removeEventListener('wheel', this.onMouseWheel);
                this.owner.removeEventListener('mousedown', this.onMouseDown);
                this.owner.removeEventListener('keydown', this.onKeyDown);
                this.owner.removeEventListener('dblclick', this.onDoubleClick);
                this.owner.removeEventListener('touchstart', this.onTouch);

                if (this.frameAnimation) {
                    window.cancelAnimationFrame(this.frameAnimation);
                    this.frameAnimation = 0;
                }


                this.releaseDocumentMouse();
                this.releaseTouches();
            },
            releaseDocumentMouse() {
                document.removeEventListener('mousemove', this.onMouseMove);
                document.removeEventListener('mouseup', this.onMouseUp);
            },
            releaseTouches() {
                document.removeEventListener('touchmove', this.handleTouchMove);
                document.removeEventListener('touchend', this.handleTouchEnd);
                document.removeEventListener('touchcancel', this.handleTouchEnd);
                this.multiTouch = false;
                this.touchInProgress = false;
            },
        },
        beforeUnmount() {
            this.releaseEvents();
        }
    }
</script>
<style lang="scss">
    @import "../../style/_include.scss";

    .#{$prefix}float {
        width: 100%;
        max-width: 100%;
        max-height: 100vh;
        height: 100%;
        overflow: hidden;
        outline: none;
        border-radius: 4px;

        &.float-bordered {
            border: 1px solid #3a3e3a;
        }

        .float-container {
            width: 100%;
            height: 100%;

            &.in-zoom {
                transition: all 0.5s ease-in-out;
            }
        }
    }
</style>