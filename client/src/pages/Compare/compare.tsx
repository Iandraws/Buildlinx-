import {
	Button,
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectComponentsToCompare } from '../../Redux/baukastenSlice';
import { Component } from '../../types/interfaces';

const Compare = () => {
	const navigate = useNavigate();
	const components = useSelector(selectComponentsToCompare);

	return (
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				marginTop: '50px',
			}}
		>
			<Button variant='contained' onClick={() => navigate(-1)}>
				Back
			</Button>
			<h2>Compare</h2>

			{components.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell align='right'>Beschreibung</TableCell>
								<TableCell align='right'>kapazitaet</TableCell>
								<TableCell align='right'>Type</TableCell>
								<TableCell align='right'>Leistung</TableCell>
								<TableCell align='right'>kosten</TableCell>
								<TableCell align='right'>Datum</TableCell>
								<TableCell align='right'>Classe</TableCell>
								{/* Add more headers as needed */}
							</TableRow>
						</TableHead>
						<TableBody>
							{components.map((component: Component, index: number) => (
								<TableRow
									key={index}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component='th' scope='row'>
										{component.Name}
									</TableCell>
									<TableCell align='right'>{component.Beschreibung}</TableCell>
									<TableCell align='right'>{component.kapazitaet}</TableCell>
									<TableCell align='right'>{component.Type}</TableCell>
									<TableCell align='right'>{component.Leistung}</TableCell>
									<TableCell align='right'>{component.kosten}</TableCell>
									<TableCell align='right'>{component.Datum}</TableCell>
									<TableCell align='right'>{component.Classe}</TableCell>
									{/* Add more cells as needed */}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</Container>
	);
};

export default Compare;
