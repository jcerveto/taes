<template>
    <div>
        <header>
            <img src="imagen.logo"
                 width="130" height="130" />
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
        </div>
        <div class="comment-box">
        <h2>Comentarios</h2>
        <!-- Lista de comentarios -->
        <ul>
            <li v-for="(comment, index) in comments" :key="index">
                {{ comment.text }}
            </li>
        </ul>

        <!-- Formulario para agregar un comentario -->
        <form @submit.prevent="addComment">
            <textarea v-model="newComment" placeholder="Escribe tu comentario"></textarea>
            <button type="submit">Agregar Comentario</button>
        </form>
        </div>
        <footer>
            <h3>Contacto</h3>
            <p>644344244</p>
            <p>cgmg3@alu.ua.es</p>
            <router-link to="/">Go to Home</router-link>
        </footer>
        
   
</template>


<script>
    export default {
        data() {
            return {
                comments: [], // Array para almacenar los comentarios
                newComment: '' // Nuevo comentario que se está escribiendo
            };
        },
        mounted() {
            this.loadComments(); // Cargar comentarios al cargar el componente
        },
        methods: {
            loadComments() {
                // Simulamos la carga de comentarios desde un archivo JSON local
                fetch('/comments.json')
                    .then(response => response.json())
                    .then(data => {
                        this.comments = data.comments;
                    })
                    .catch(error => {
                        console.error('Error al cargar comentarios:', error);
                    });
            },
            addComment() {
                if (this.newComment.trim() !== '') { // Asegúrate de que el comentario no esté vacío
                    this.comments.push({ text: this.newComment }); // Agrega el nuevo comentario al array
                    this.saveComments(); // Guarda los comentarios después de agregar uno nuevo
                    this.newComment = ''; // Limpia el campo de texto después de agregar el comentario
                }
            },
            saveComments() {
                // Simulamos la escritura de comentarios en un archivo JSON local
                const data = {
                    comments: this.comments
                };
                fetch('/save-comments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .catch(error => {
                        console.error('Error al guardar comentarios:', error);
                    });
            }
        }
    };
</script>

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
    .comment-box {
        
        padding: 20px;
        margin: 20px 0;
    }

    textarea {
        width: 100%;
        margin-bottom: 10px;
    }

    footer {
        background-color: #fff;
        color: #333;
        text-align: center;
        padding: 10px;
    }
</style>  