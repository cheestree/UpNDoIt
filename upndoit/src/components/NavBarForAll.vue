<script>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <nav>
        <ul id="navbar">
            <RouterLink to="/about">About</RouterLink>
            <RouterLink to="/home">
            <span class="material-symbols-outlined">developer_board</span>
            Home
            </RouterLink>
            <RouterLink to="/login">Login</RouterLink>
            <RouterLink to="/register">Register</RouterLink>
        </ul>
    </nav>
</template>
<style>
    #navbar {
        display: flex;
        width: 100%;
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: var(--nvbr);
        justify-content: space-around;
    }

    #navbar a {
        display: flex;
        color: white;
        text-align: center;
        padding: 12px;
        text-decoration: none;
    }

    #navbar *:hover {
        background-color: var(--nvbr-hover);
    }

    .material-symbols-outlined {
        font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48
    }
</style>