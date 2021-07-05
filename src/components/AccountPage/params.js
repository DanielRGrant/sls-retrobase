import { customClasses, linkIfOtherColEq } from "../TableClientSideProcess/CustomColumnFunctions"

export const colParams = {
    columnHeaders: [
        "file_name",
        "file_id",
        "progress",
        "num_peptides",
        "submitted"
    ],
    columnsHaveLinks: {},
    columnsToFilter: ["file_id"],
    customFilterColumns: [],
    columnHeadersFinal: [
        "File Name",
        "File ID",
        "Status",
        "Peptides Matched",
        "Date/time submitted"
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
                "failed": "red",
                "deleting": "red",
                "delete_failed": "red"
            }
            return customClasses(args, params)
        }
    }
}