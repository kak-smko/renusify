export default {
    methods: {
        listAddChildren(list, childrenProp) {
            return list.map((item) => {
                return {
                    ...item,
                    [childrenProp]: item[childrenProp]
                        ? this.listAddChildren(item[childrenProp], childrenProp)
                        : [],
                };
            });
        },
        mouseenter(e) {
            this.onMouseEnter(e[0], e[1]);
        },
        touchmove(e) {
            this.onMouseMove(e);
        },
        dragstart(e) {
            this.onDragStart(e[0], e[1]);
        },
        startTrackMouse() {
            document.addEventListener("mousemove", this.onMouseMove);
            document.addEventListener("mouseup", this.onDragEnd);
            document.addEventListener("touchend", this.onDragEnd);
            document.addEventListener("touchcancel", this.onDragEnd);
            document.addEventListener("keydown", this.onKeyDown);
        },

        stopTrackMouse() {
            document.removeEventListener("mousemove", this.onMouseMove);
            document.removeEventListener("mouseup", this.onDragEnd);
            document.removeEventListener("touchend", this.onDragEnd);
            document.removeEventListener("touchcancel", this.onDragEnd);
            document.removeEventListener("keydown", this.onKeyDown);
        },

        onDragStart(event, item) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }

            this.startTrackMouse();

            this.dragItem = item;
            this.itemsOld = this.modelValue;

            this.$nextTick(() => {
                this.onMouseMove(event);
            });
        },

        onDragEnd(event, isCancel) {
            event && event.preventDefault();

            this.stopTrackMouse();

            isCancel ? this.dragRevert() : this.dragApply();
        },

        onKeyDown(event) {
            if (event.which === 27) {
                // ESC
                this.onDragEnd(null, true);
            }
        },

        getXandYFromEvent(event) {
            let {clientX, clientY} = event;

            const {targetTouches} = event;

            if (targetTouches) {
                const touch = targetTouches[0];
                clientX = touch.clientX;
                clientY = touch.clientY;
                const event = new Event("mouseenter");
                const element = document.elementFromPoint(clientX, clientY);
                const touchElement =
                    element && element.closest(".nestable-item-content");
                if (touchElement) touchElement.dispatchEvent(event);
            }

            return {clientX, clientY};
        },

        onMouseMove(event) {
            event && event.preventDefault();

            const {clientX} = this.getXandYFromEvent(event);

            if (this.mouse.last.x === 0) {
                this.mouse.last.x = clientX;
            }

            const diffX = this.$r.rtl
                ? this.mouse.last.x - clientX
                : clientX - this.mouse.last.x;
            if (
                (diffX >= 0 && this.mouse.shift.x >= 0) ||
                (diffX <= 0 && this.mouse.shift.x <= 0)
            ) {
                this.mouse.shift.x += diffX;
            } else {
                this.mouse.shift.x = 0;
            }
            this.mouse.last.x = clientX;

            if (Math.abs(this.mouse.shift.x) > this.threshold) {
                if (this.mouse.shift.x > 0) {
                    this.tryIncreaseDepth(this.dragItem);
                } else {
                    this.tryDecreaseDepth(this.dragItem);
                }

                this.mouse.shift.x = 0;
            }
        },

        moveItem({dragItem, pathFrom, pathTo}) {
            const realPathTo = this.getRealNextPath(pathFrom, pathTo);

            const removePath = this.getSplicePath(pathFrom, {
                numToRemove: 1,
                childrenProp: this.childrenProp,
            });

            const insertPath = this.getSplicePath(realPathTo, {
                numToRemove: 0,
                itemsToInsert: [dragItem],
                childrenProp: this.childrenProp,
            });

            let items = this.modelValue;
            items = this.update(items, removePath);
            items = this.update(items, insertPath);

            this.pathTo = realPathTo;
            this.$emit("update:model-value", items);
        },
        isEquals(x, y) {
            return x === y;
        },
        copy(o) {
            return JSON.parse(JSON.stringify(o));
        },
        update(object, $spec) {
            if (!object) {
                return;
            }
            const that = this;
            const commands = {
                $splice(value, nextObject, spec, originalObject) {
                    value.forEach((args) => {
                        if (nextObject === originalObject && args.length) {
                            nextObject = that.copy(originalObject);
                        }
                        Array.prototype.splice.apply(nextObject, args);
                    });
                    return nextObject;
                },
            };
            const spec = typeof $spec === "function" ? {$apply: $spec} : $spec;
            let nextObject = object;
            Object.keys(spec).forEach((key) => {
                if (commands[key]) {
                    const objectWasNextObject = object === nextObject;
                    nextObject = commands[key](spec[key], nextObject, spec, object);
                    if (objectWasNextObject && this.isEquals(nextObject, object)) {
                        nextObject = object;
                    }
                } else {
                    const nextValueForKey = this.update(object[key], spec[key]);
                    const nextObjectValue = nextObject[key];
                    if (
                        !this.isEquals(nextValueForKey, nextObjectValue) ||
                        (typeof nextValueForKey === "undefined" && !object[key])
                    ) {
                        if (nextObject === object) {
                            nextObject = this.copy(object);
                        }
                        nextObject[key] = nextValueForKey;
                    }
                }
            });
            return nextObject;
        },
        tryIncreaseDepth(dragItem) {
            let pathFrom;
            try {
                pathFrom = this.getPathById(dragItem[this.keyProp]);
            } catch (e) {
                this.dragRevert();
                return;
            }
            const itemIndex = pathFrom[pathFrom.length - 1];
            const newDepth = pathFrom.length + this.getItemDepth(dragItem);
            if (itemIndex > 0 && newDepth <= this.maxDepth) {
                const prevSibling = this.getItemByPath(
                    pathFrom.slice(0, -1).concat(itemIndex - 1)
                );

                if (
                    prevSibling[this.childrenProp] &&
                    (!prevSibling[this.childrenProp].length || true)
                ) {
                    const pathTo = pathFrom
                        .slice(0, -1)
                        .concat(itemIndex - 1)
                        .concat(prevSibling[this.childrenProp].length);

                    this.moveItem({dragItem, pathFrom, pathTo});
                }
            }
        },

        tryDecreaseDepth(dragItem) {
            let pathFrom;
            try {
                pathFrom = this.getPathById(dragItem[this.keyProp]);
            } catch (e) {
                this.dragRevert();
                return;
            }
            const itemIndex = pathFrom[pathFrom.length - 1];

            if (pathFrom.length > 1) {
                const parent = this.getItemByPath(pathFrom.slice(0, -1));

                if (itemIndex + 1 === parent[this.childrenProp].length) {
                    const pathTo = pathFrom.slice(0, -1);
                    pathTo[pathTo.length - 1] += 1;

                    this.moveItem({dragItem, pathFrom, pathTo});
                }
            }
        },

        onMouseEnter(event, item) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }

            if (!this.dragItem) return;

            if (item !== null && this.dragItem[this.keyProp] === item[this.keyProp])
                return;
            let pathFrom;
            try {
                pathFrom = this.getPathById(this.dragItem[this.keyProp]);
            } catch (e) {
                this.dragRevert();
                return;
            }

            if (pathFrom.length === 0) return;

            let pathTo = null;
            if (item === null) {
                pathTo = pathFrom.length > 0 ? [] : [0];
            } else {
                pathTo = this.getPathById(item[this.keyProp]);
            }

            const newDepth =
                this.getRealNextPath(pathFrom, pathTo).length +
                (this.getItemDepth(this.dragItem) - 1);
            if (newDepth > this.maxDepth) {
                return;
            }

            this.moveItem({dragItem: this.dragItem, pathFrom, pathTo});
        },

        dragApply() {
            this.$emit("change", this.dragItem, {
                items: this.modelValue,
                pathTo: this.pathTo,
            });

            this.pathTo = null;
            this.itemsOld = null;
            this.dragItem = null;
        },

        dragRevert() {
            if (this.itemsOld) {
                this.$emit("update:model-value", this.itemsOld);
            }
            this.pathTo = null;
            this.itemsOld = null;
            this.dragItem = null;
        },
        getPathById(id, items = this.modelValue) {
            let path = [];
            items.every((item, i) => {
                if (item[this.keyProp] === id) {
                    path.push(i);
                } else if (item[this.childrenProp]) {
                    const childrenPath = this.getPathById(id, item[this.childrenProp]);

                    if (childrenPath.length) {
                        path = path.concat(i).concat(childrenPath);
                    }
                }

                return path.length === 0;
            });

            return path;
        },

        getItemByPath(path, items = this.modelValue) {
            let item = null;

            path.forEach((index) => {
                const list =
                    item && item[this.childrenProp] ? item[this.childrenProp] : items;
                item = list[index];
            });

            return item;
        },

        getItemDepth(item) {
            let level = 1;

            if (item[this.childrenProp] && item[this.childrenProp].length > 0) {
                const childrenDepths = item[this.childrenProp].map(this.getItemDepth);
                level += Math.max(...childrenDepths);
            }

            return level;
        },

        getSplicePath(path, options = {}) {
            const splicePath = {};
            const numToRemove = options.numToRemove || 0;
            const itemsToInsert = options.itemsToInsert || [];
            const lastIndex = path.length - 1;
            let currentPath = splicePath;

            path.forEach((index, i) => {
                if (i === lastIndex) {
                    currentPath.$splice = [[index, numToRemove, ...itemsToInsert]];
                } else {
                    const nextPath = {};
                    currentPath[index] = {[options.childrenProp]: nextPath};
                    currentPath = nextPath;
                }
            });

            return splicePath;
        },

        getRealNextPath(prevPath, nextPath) {
            const ppLastIndex = prevPath.length - 1;
            const npLastIndex = nextPath.length - 1;

            if (prevPath.length < nextPath.length) {
                let wasShifted = false;

                return nextPath.map((nextIndex, i) => {
                    if (wasShifted) {
                        return i === npLastIndex ? nextIndex + 1 : nextIndex;
                    }

                    if (typeof prevPath[i] !== "number") {
                        return nextIndex;
                    }

                    if (nextPath[i] > prevPath[i] && i === ppLastIndex) {
                        wasShifted = true;
                        return nextIndex - 1;
                    }

                    return nextIndex;
                });
            } else if (prevPath.length === nextPath.length) {
                if (nextPath[npLastIndex] > prevPath[npLastIndex]) {
                    const target = this.getItemByPath(nextPath);

                    if (target[this.childrenProp] && target[this.childrenProp].length) {
                        return nextPath
                            .slice(0, -1)
                            .concat(nextPath[npLastIndex] - 1)
                            .concat(0);
                    }
                }
            }

            return nextPath;
        },
    },
};
