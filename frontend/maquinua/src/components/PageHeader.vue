<template>
    <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/filter">Filter</router-link>
        <router-link to="/products">View products</router-link>
        <router-link to="/machines">View machines</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/user">User</router-link>
        <button id="toggleDarkMode">Dark Mode</button>
    </nav>
</template>


<style scoped>

nav {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background-color: #f1f1f1;
    padding: 50px;

}

nav a {
    text-decoration: none;
    padding: 10px;
    color: black;   
}

nav a:hover {
    background-color: #ddd;
}

</style>