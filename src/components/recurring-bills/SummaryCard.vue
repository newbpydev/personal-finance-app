<script lang="ts" setup>
</script>

<template>
    <article class="summary-card">
        <h1 class="title">Summary</h1>

        <ul class="list">
            <li class="list-item paid">
                <div class="group">
                    <span class="text">Paid Bills</span>
                    <p class="value">
                        <span class="count">2</span>
                        ($320.99)
                    </p>
                </div>
            </li>
            <li class="list-item total">
                <div class="group">
                    <span class="text">Total Upcoming</span>
                    <p class="value">
                        <span class="count">6</span>
                        ($1,230.00)
                    </p>
                </div>
            </li>
            <li class="list-item due">
                <div class="group">
                    <span class="text">Due Soon</span>
                    <p class="value">
                        <span class="count">2</span>
                        ($40.00)
                    </p>
                </div>
            </li>
        </ul>
    </article>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/utils" as u;
@use "@/assets/styles/variables" as v;

.summary-card {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background: var(--c-white);
    border-radius: var(--spacing-3);
    padding: 2rem;
    margin-bottom: 2.4rem;

    @media (min-width: 37.5rem) {
        margin-bottom: 0;
    }

    @media (min-width: v.$laptop-lg-width) {
        height: min-content;

        //align-self: flex-start;
    }

    & .title {
        @include u.text-preset-3();
    }

    & .list {
        display: flex;
        flex-direction: column;

        &-item {
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            & .group {
                display: flex;
                justify-content: space-between;
            }

            & .text {
                @include u.text-preset-5();
            }

            & .value {
                @include u.text-preset-5-bold();
            }

            &.paid .text,
            &.total .text {
                color: var(--c-grey-500);

            }

            &.due {
                color: var(--c-theme-red);
            }

            &:last-of-type:after {
                display: none;
            }

            &::after {
                content: "";
                height: .1rem;
                width: 100%;
                background: rgba(105, 104, 104, 0.15);
                margin: var(--spacing-4) 0;
            }
        }
    }
}

</style>
