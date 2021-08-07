import PT from 'prop-types';
import cn from 'classnames';

import './Button.scss';

export const Button = ({type = 'button', className, children, ...other}) => (
    <button type={type} className={cn('button', className)} {...other}>
        {children}
    </button>
);

Button.propTypes = {
    /**
     * @type one of types like 'button' || 'submit'
     * @variat one of types like 'primary' || 'secondary' for styling component
     * @className is string which contain base class name and additional class names for styling component
     * @children is required node which contain tags or text
     */
    type: PT.oneOf(['button', 'submit']),
    className: PT.string,
    children: PT.node.isRequired
};
