import PublicLayout from './layouts/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout';

export default function App(): JSX.Element {

	return (
		<div className='App'>
			<PublicLayout />
			{/* <PrivateLayout /> */}
		</div>
	);
}
