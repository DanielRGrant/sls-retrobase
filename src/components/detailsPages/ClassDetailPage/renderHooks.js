import { Link } from 'react-router-dom';

export const processResponse = ({ proteins, families, description}) => {
    const proteinsScript = proteins.split("#").map(protein => {
        return <li><Link to={"/knownprotein/" + protein}>{protein}</Link></li>
    });

    const familiesScript = families.split("#").map(family => {
        return <li><Link to={"/family/" + family}>{family}</Link></li>
    });

    return {
        proteinsScript,
        familiesScript
    }
}