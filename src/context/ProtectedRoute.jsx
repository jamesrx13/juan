
import { Navigate } from 'react-router-dom';
import { isAuth } from '../statics/core/utils';

function ProtectedRoute({ children }) {
    const authResult = isAuth();

    if (!authResult) return <Navigate to="/login" />;

    return <>{children}</>;
}

export default ProtectedRoute;
