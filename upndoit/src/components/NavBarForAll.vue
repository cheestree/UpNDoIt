<template>
    <nav>
        <ul id="navbar">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
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

    #navbar li {
        float: left;
    }

    #navbar li a {
        display: block;
        color: white;
        text-align: center;
        padding: 16px;
        text-decoration: none;
    }

    #navbar li a:hover {
        background-color: #111111;
    }
</style>