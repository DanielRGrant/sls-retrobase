export const colParams = {
    columnHeaders: [
        "peptide_id",
        "seq_observed",
        "protein",
        "prot_id",
        "dna_id",
        "class",
        "family"
    ],
    columnsHaveLinks: {
        "protein": {
            "basePath": "protein",
            "linkPathUseSelf": true
        },
        "prot_id": {
            "basePath": "prot_id",
            "linkPathUseSelf": true
        },
        "dna_id": {
            "basePath": "dna_id",
            "linkPathUseSelf": true
        },
        "class": {
            "basePath": "class",
            "linkPathUseSelf": true
        },
        "family": {
            "basePath": "family",
            "linkPathUseSelf": true
        }
    },
    columnsToFilter: [
        "protein",
        "prot_id",
        "dna_id",
        "class",
        "family",
        "peptide_id"
    ],
    columnHeadersFinal: [
        "Peptide ID",
        "Sequence Observed",
        "Protein",
        "Matched Sequence",
        "DNA ID",
        "Class",
        "Family"
    ],
    customFilterColumns: [],
    customColumns: {}
}