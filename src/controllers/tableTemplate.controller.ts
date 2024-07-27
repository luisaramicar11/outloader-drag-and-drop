import { DataTable } from "../models/file.model";

/*function to generate table template for given data*/
export async function tableTemplateController(
  data: DataTable,
  page: number,
  limit: number
): Promise<string> {
  /*start and end indexes of the array information (data) being rendered*/
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const rows = data.slice(startIndex, endIndex);

  /*header row with column names*/
  const headerRow = data.length > 0 ? Object.keys(data[0]) : [];

  /*table rows with data information*/
  return `
    <table class="table table-striped">
       <thead>
            <tr>
                ${headerRow
                  .map((row) => `<th scope="col">${row}</th>`)
                  .join("")}
            </tr>
        </thead>
        <tbody>          
                ${rows.map((row) => `
                    <tr>
                        ${headerRow.map((key) => `<td>${row[key]}</td>`).join("")}
                    </tr>`).join("")}
        </tbody>
    </table>
    `;
}
