
<script setup>

import Papa from 'papaparse';
import { ref, onMounted, defineProps, toRefs } from 'vue';

const props = defineProps(['csvPath', 'title']);
const { csvPath, title } = toRefs(props);


let csvHeaders = ref([]);
const csvData = ref([]);
const error = ref(null);


function parseFile(file) {
    Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
            csvHeaders.value = results.meta.fields;
            csvData.value = results.data;
        },
    });
}


async function fetchData() {
    try {
        // Replace with the actual URL or path to your CSV file
        const response = await fetch(csvPath.value);
        const csv = await response.text();

        // Parse the CSV data
        parseFile(csv);

        error.value = null;
    } catch (error) {
        console.error('An error occurred:', error.message);
        error.value = `An error occurred when loading: ${title}`;
    }
}



// Fetch data when the component is mounted
onMounted(fetchData);

</script>

<template>
    <div class="container">
        <h2>{{ title }}</h2>
        <div v-if="error" class="error-message">{{ error }}</div>
        <table class="responsive-table">
            <thead>
                <tr>
                    <th v-for="(colName, index) in csvHeaders" :key="index">{{ colName }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in csvData" :key="index">
                    <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
                </tr>
            </tbody>
        </table>

        <button @click="fetchData">Reload table again</button>
    </div>
</template>
  


<style scoped>
.container {
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 10px;
    padding-right: 10px;
}

h2 {
    font-size: 26px;
    margin: 20px 0;
    text-align: center;

    small {
        font-size: 0.5em;
    }
}

.responsive-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.responsive-table th {
    background-color: #95A5A6;
    font-weight: bold;
    font-size: 2rem;
}
.responsive-table td {
    padding: 10px;
    border: 1px solid #ddd;
}

.responsive-table .table-row {
  margin-bottom: 10px;
}

@media all and (max-width: 767px) {
    .table-header {
        display: none;
    }

    .table-row {
        
    }

    li {
        display: block;
    }

    .col {

        flex-basis: 100%;

    }

    .col {
        display: flex;
        padding: 10px 0;

        &:before {
            color: #6C7A89;
            padding-right: 10px;
            content: attr(data-label);
            flex-basis: 50%;
            text-align: right;
        }
    }
}
</style>
