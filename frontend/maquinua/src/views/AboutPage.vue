<template>
    <div>
        <header>
            <img src="imagen.logo" 
                 width="190" height="190"  />
            <h1>MaquinUA</h1>
        </header>
        <section>
            <h2>Sobre nosotros</h2>
            <p>Esta pagina esta dedicada a la ubicación y busqueda de productos mediante un mapa iteractivo de maquinas expendedoras en la Universidad de Alicante </p>
        </section>
        <section>
            <h2>Nuestra mision</h2>
            <p>Nuestra mision es  facilitar el acceso a las distintos usuarios de la universidad de Alicante el acceso a todo tipo de maquinas expendedoras que cumpla con sus necesidades</p>
        </section>
        
        <footer>
            <h3>Contacto</h3>
            <p>644344244</p>
            <p>cgmg3@alu.ua.es</p>
            <router-link to="/">Go to Home</router-link>
        </footer>
    </div>
</template>

<style scoped> 
    .about {
        font-family: Arial, sans-serif;
    }

    header {
        background-color: #fff;
        color: #333;
        padding: 20px;
        text-align: center;
    }

    section {
        padding: 20px;
    }

    h1, h2 {
        color: #333;
    }

    footer {
        background-color: #58FAAC;
        color: #fff;
        text-align: center;
        padding: 10px;
    }
</style>  