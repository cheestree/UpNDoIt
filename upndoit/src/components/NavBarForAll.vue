<script>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <nav>
        <ul id="navbar">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
        </ul>
    </nav>
</template>
<style>
    #navbar {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #333333;
    }

    #navbar * {
        float: left;
        display: block;
        color: white;
        text-align: center;
        padding: 12px;
        text-decoration: none;
    }

    #navbar *:hover {
        background-color: #111111;
    }
</style>