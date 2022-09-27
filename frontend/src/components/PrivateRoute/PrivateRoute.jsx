import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
	const user = useSelector((state) => state.user.token);

	const [isAuth, setIsAuth] = React.useState(false);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		if (user) {
			setIsAuth(true);
		} else {
			setIsAuth(false);
		}
		setLoading(false);
	}, [user]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return isAuth ? children : <Navigate to="'/login'" />;
};

export default PrivateRoute;
