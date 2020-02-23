<template>
    <div>
        <app-header></app-header>
        <app-main />
        <app-navbar />
    </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import AppMain from '@/components/AppMain'
import AppNavbar from '@/components/AppNavbar'
export default {
    components: {
        AppHeader,
        AppMain,
        AppNavbar
    }
}
</script>

<style scoped>
.header {
    position: absolute;
    line-height: 50px;
    top: 0px;
    left: 0px;
    right: 0px;
    background-color: #2d3a4b;
}
.navbar {
    position: absolute;
    width: 230px;
    background-color: #545c64;
    top: 50px;
    left: 0px;
    bottom: 0px;
    overflow-y: auto;
}
.main {
    position: absolute;
    top: 50px;
    left: 230px;
    right: 0px;
    bottom: 0px;
    padding: 10px;
    overflow-y: auto;
}
</style>