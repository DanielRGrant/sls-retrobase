import { Link } from 'react-router-dom';

export const renderProteinData = (proteinRecords) => {
    const proteinScript = proteinRecords
        && Object.keys(proteinRecords).length === 0
        && typeof (proteinRecords) === "object"
        ?
        <span>No Proteins Predicted</span>
        :
        proteinRecords.map((protrec, j) => {
            var protnames
            if (protrec.protein.includes("#")) {
                var protspl = protrec.split("#");
                protnames = protspl.map((protein, i) => {
                    return (
                        <>
                            <Link to={"/knownprotein/" + protein}>
                                {protein}
                            </Link>
                            {
                                i !== protspl.length - 1
                                    ? ", "
                                    : null
                            }
                        </>
                    )
                });

            } else {
                protnames = <Link to={"/knownprotein/" + protrec.protein}>{protrec.protein}</Link>
            }

            return (
                <>
                    <Link to={"/predictedprotein/"}>{protrec.prot_id}</Link> ({protnames})
                    {j !== proteinRecords.length - 1
                        ? ", "
                        : null
                    }
                </>
            )
        })
    return proteinScript
}