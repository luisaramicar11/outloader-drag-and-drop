import {FileController} from "./controllers/file.controller"
import {tableTemplateController} from "./controllers/tableTemplate.controller"
import {filterDataController} from "./controllers/filter.controller"
import {convertToCsvController} from "./controllers/convertToCsv.controller"
import {downloadCsvController} from "./controllers/downloadCsv.controller"
import { DataTable, ColumnName} from "./models/file.model"

const csvForm = document.getElementById("csvForm") as HTMLFormElement;
const csvFile = document.getElementById("csvFile") as HTMLInputElement;
const displayArea = document.getElementById("displayArea") as HTMLDivElement;
const searchInput = document.getElementById("searchInput") as HTMLInputElement;
const downloadCSVButton = document.getElementById("downloadCSV") as HTMLInputElement; 
const paginationHtml = document.getElementById("paginationControlls") as HTMLElement;

const limit: number = 15;
let page: number = 1;
let data: DataTable = [];
let columnNames: ColumnName = [];

function pagination(totalRecords: number, page: number, limit: number): string {
    const totalPages: number = Math.ceil(totalRecords / limit);
    const maxButtons: number = 10;
    let paginationHtml: string = '<ul class="pagination">';

    /*start*/
    if (page > 1) {
        paginationHtml += `<li class="page-item"><a class="page-link" href="#" data-page="1")">Start</a></li>`;
    }

    /*previous*/
    if (page > 1) {
        paginationHtml += `<li class="page-item"><a class="page-link" href="#" data-page="${page - 1}">Previous</a></li>`;
    }
    
    /*numbers*/
    const startPage: number = Math.max(1, page - Math.floor(maxButtons / 2));
    const endPage: number = Math.min(totalPages, page + Math.floor(maxButtons / 2));
    for (let i = startPage; i <= endPage; i++) {
        paginationHtml += `<li class="page-item ${i === page? 'active' : ''}"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
    }
    
    /*next*/
    if (page < totalPages) {
        paginationHtml += `<li class="page-item"><a class="page-link" href="#" data-page="${page + 1}">Next</a></li>`;
    }
    
    /*end*/
    if (page < totalPages) {
        paginationHtml += `<li class="page-item"><a class="page-link" href="#" data-page="${totalPages}">End</a></li>`;
    }
    
    paginationHtml += '</ul>';
    return paginationHtml;
};

async function renderTableControlls(){
    const searchTerm: string = searchInput.value;
    console.log("soyla data",data)
    console.log("search term", searchTerm)
    const filteredData: DataTable = filterDataController(data, searchTerm);
    console.log("filteredData",filteredData)

    displayArea.innerHTML = '';
    const tableHtml: string = await tableTemplateController(filteredData, page, limit);
    displayArea.innerHTML += tableHtml;

    const paginationControlls: string = pagination(filteredData.length, page, limit);
    paginationHtml!.innerHTML = paginationControlls;

    document.querySelectorAll('.page-link').forEach(button => {
        button.addEventListener('click', () =>{
            page = parseInt(button.getAttribute('data-page')!);
            renderTableControlls();
        })
    })
    
};

document.addEventListener('DOMContentLoaded', () => {
    csvForm.addEventListener("submit", (event:Event) => {
        event.preventDefault();
        const file: File = csvFile.files![0];
        const fileReader: FileReader = new FileReader();
        const fileName: string = file.name;
        const fileExtension: string | undefined = fileName.split('.').pop()?.toLowerCase();
    
        if(fileExtension !== 'csv' && fileExtension !== 'txt'){
            alert("Please upload a valid CSV or TXT file.");
            return;
        }
    
        fileReader.onload = async (event: ProgressEvent) => {
            const csvContent: string = (event.target as FileReader).result as string;
            const fileController: FileController = new FileController(csvContent);
            fileController.processFile();
            data = fileController.getData();
            columnNames = fileController.getColumnNames();
            await renderTableControlls();
        };
        fileReader.readAsText(file);
    });
    
    downloadCSVButton.addEventListener('click', async (e:Event) =>{
        e.preventDefault();
        const filteredData = filterDataController(data, searchInput.value);
        const csvContent: string = await convertToCsvController(filteredData, columnNames);
        await downloadCsvController(csvContent, 'data.csv');
    });
    
    searchInput.addEventListener('input', async (e:Event) =>{
        console.log("soy input")
        await renderTableControlls();
    });
})




