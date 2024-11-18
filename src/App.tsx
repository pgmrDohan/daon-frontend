import { RouterProvider } from 'react-router-dom';

import { useRouter } from '@/hooks';
import { useEffect } from 'react';

const App = () => {
	const router = useRouter();

	useEffect(()=>{
		document.documentElement.setAttribute('data-theme', 'dark');
	},[]);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;