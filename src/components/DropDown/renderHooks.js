import { Link } from 'react-router-dom';

export const renderOptions = (options) => {
    const optionsScript = options.map(option => {
        return (
            <li>
                {
                    option.route
                        ? <Link to={
                            option.route
                        }>{option.title}</Link>
                        : <span onClick={option.function}>{option.title}</span>
                }
            </li>
        )
    })
    return optionsScript
}