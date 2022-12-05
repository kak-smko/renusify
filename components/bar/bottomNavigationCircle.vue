<template>
    <nav :class="`${$r.prefix}bottom-navigation-circle`">
        <router-link
                :to="item.to"
                class="navigation-item"
                v-for="(item, i) in items"
                :key="i"
        >
            <div class="navigation-item-icon">
                <r-icon v-html="item.icon"></r-icon>
            </div>
            <div class="navigation-item-text">{{ item.name }}</div>
        </router-link>
    </nav>
</template>

<script>
    export default {
        name: "rBottomNavigationCircle",
        props: {
            items: Object
        },
        data() {
            return {};
        }
    };
</script>

<style lang="scss">
    @import "~renusify/style/include";

    .#{$prefix}bottom-navigation-circle {
        position: fixed;
        bottom: 0;
        display: flex;
        left: 0;
        justify-content: center;
        width: 100%;
        height: 56px;
        z-index: map_get($z-index, "default");

        @include light() {
            background-color: var(--color-cards-light);
            color: var(--color-text-primary-light);
        }
        @include dark() {
            background-color: var(--color-cards-dark);
            color: var(--color-text-primary-dark);
        }

        .navigation-item {
            width: 100%;
            max-width: 100%;
            text-align: center;
            position: relative;

            &-text {
                position: absolute;
                bottom: 10px;
                left: 0;
                right: 0;
            }

            &-icon {
                transition: 0.3s all ease-in-out;
                position: absolute;
                bottom: 12px;
                left: 0;
                right: 0;
                width: 50px;
                height: 50px;
                margin-left: auto;
                margin-right: auto;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

        .router-link-exact-active {
            .navigation-item-icon {
                transition: 0.3s all ease-in-out;
                bottom: 31px;
                background-color: currentColor;
                border-radius: 50%;
                padding: 15px;
                width: 50px;
                height: 50px;
                border: 3px solid white;

                .#{$prefix}icon {
                    color: white;
                }
            }
        }
    }
</style>
