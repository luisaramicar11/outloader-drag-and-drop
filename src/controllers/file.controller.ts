import { IDataRow,  DataTable, ColumnName} from "../models/file.model"

export class FileController {
    public fileContent: string;
    constructor(fileContent: string) {
        this.fileContent = fileContent;
    }
    public processFile(): void {
        const lines: string[] = this.fileContent.split(/[\r\n]+/).filter(line => line.trim()!=="");
        if(lines.length > 0){
            const columnNames: ColumnName = lines[0].split(",");
            const data: DataTable = lines.slice(1).map(line=>{
                const value: string[] = line.split(',');
                const row: IDataRow = {};
                columnNames.forEach((colName, index)=>{
                    row[colName] = value[index] || "";
                })
                return row;
            })
        }
    }
}

   