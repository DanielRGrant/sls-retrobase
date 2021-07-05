import { MultiValStringColLink } from './CustomColumnFunctions'

const dnaColParams = {
    columnHeaders: [
        "dna_id",
        "class",
        "family",
        "protein",
        "coords"
    ],
    columnsHaveLinks: {
        "dna_id": {
            "basePath": "/dna/",
            "linkPathUseSelf": true
        },
        "class": {
            "basePath": "/class/",
            "linkPathUseSelf": true
        }
    },
    columnsToFilter: [],
    excludeColumnHeader: [],
    columnHeadersFinal: [
        "DNA Record ID",
        "Class",
        "Family",
        "Protein Record ID (Predicted Proteins)",
        "Genomic Coordinates"
    ],
    customColumns: {}
}

const proteinColParams = {
    columnHeaders: [
        "prot_id",
        "class",
        "family",
        "protein",
        "dna_id",
        "coords"
    ],
    columnHeadersFinal: [
        "Protein Record ID",
        "Class",
        "Family",
        "Predicted Protein(s)",
        "DNA Record ID",
        "DNA Record Genomic Coordinates"
    ],
    columnsHaveLinks: {
        "prot_id": {
            "basePath": "/predictedprotein/",
            "linkPathUseSelf": true
        },
        "dna_id": {
            "basePath": "/dna/",
            "linkPathUseSelf": true
        },
        "family": {
            "basePath": "/family/",
            "linkPathUseSelf": true
        },
        "class": {
            "basePath": "/class/",
            "linkPathUseSelf": true
        },
    },
    customColumns: {
        "protein": (args) => {
            const string_divider = "#";
            const baseurl = "/knownprotein/";
            return MultiValStringColLink(args, string_divider, baseurl)
        }
    }
}

export { dnaColParams, proteinColParams };