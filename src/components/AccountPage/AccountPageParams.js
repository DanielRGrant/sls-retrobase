import { customClasses, linkIfOtherColEq } from "../react-table-creator/CustomColumnFunctions"

export const colParams = {
    columnHeaders: [
        "file_name",
        "file_id",
        "progress",
        "num_peptides"
    ],
    columnsHaveLinks: {},
    columnsToFilter: [],
    columnHeadersFinal: [
        "File Name",
        "File ID",
        "Status",
        "Peptides Matched"
    ],
    customColumns: {
        "file_id": (args) => {
            const linkTo = "/fileresults/";
            const refCol = "progress";
            return linkIfOtherColEq(args, linkTo, refCol)
        },
        "progress": (args) => {
            const params = {
                "complete": "green",
                "active": "purple",
                "failed": "red"
            }
            return customClasses(args, params)
        }
    }
}