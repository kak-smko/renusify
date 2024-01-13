export default {
    data() {
        return {
            name: null,
        };
    },
    methods: {
        lastId(list) {
            let r = 0;
            list.map((item) => {
                if (typeof item.id === "number" && item.id > r) {
                    r = item.id;
                }
                let d = this.lastId(item[this.childrenProp]);
                if (d > r) {
                    r = d;
                }
            });
            return r;
        },
        add() {
            let items = this.modelValue;
            items.push({
                title: this.name,
                [this.keyProp]: this.lastId(items) + 1,
                [this.childrenProp]: [],
            });
            this.$emit("update:model-value", items);
            this.name = null;
        },
        del(item) {
            const removePath = this.getSplicePath(
                this.getPathById(item[this.keyProp]),
                {
                    numToRemove: 1,
                    childrenProp: this.childrenProp,
                }
            );
            let items = this.modelValue;
            items = this.update(items, removePath);
            this.$emit("update:model-value", items);
        },
    },
};
