<template>
  <r-container>
    <r-divider class="mt-10"></r-divider>
    <r-row>
      <r-col class="text-start">
        <r-btn v-if="pre_btn" :to="pre_btn.to" class="color-info-text" text>
          <r-icon v-html="$r.icons.arrow_left"></r-icon>

          {{ pre_btn.name }}
        </r-btn>
      </r-col>
      <r-col class="text-end">
        <r-btn v-if="next_btn" :to="next_btn.to" class="color-info-text" text>
          {{ next_btn.name }}
          <r-icon v-html="$r.icons.arrow_right"></r-icon>
        </r-btn>
      </r-col>
    </r-row>
  </r-container>
</template>

<script>
export default {
  name: "buttomNextPage",
  computed: {
    menu() {
      let res = [];
      if (this.$r.store.menu) {
        this.$r.store.menu.forEach((menu) => {
          if (menu.to) {
            res.push({name: menu.name, to: menu.to});
          }
          if (menu.childs) {
            menu.childs.forEach((m) => {
              if (m.to) {
                res.push({name: m.name, to: m.to});
              }
              if (m.childs) {
                m.childs.forEach((mm) => {
                  if (mm.to) {
                    res.push({name: mm.name, to: mm.to});
                  }
                });
              }
            });
          }
        });
      }

      return res;
    },
    current() {
      for (let i = 0; i < this.menu.length; i++) {
        if (this.menu[i].to.params.path === this.$route.params.path) {
          return i;
        }
      }
      return -10;
    },
    next_btn() {
      return this.menu[this.current + 1];
    },
    pre_btn() {
      return this.menu[this.current - 1];
    },
  },
};
</script>

