export async function downloadCsvController(csvContent: string, fileName: string){
    const blob = new Blob([csvContent], {type: 'text/csv; charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}