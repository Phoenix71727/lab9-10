import React, { useState } from 'react';
import TrainCard from './TrainCard';
import { trainsData } from '../data/trains';
import './TrainList.css';

const TrainList = () => {
	const [query, setQuery] = useState('');

	const filteredTrains = trainsData.filter((train) => {
		const q = query.trim().toLowerCase();
		if (!q) return true;

		return (
			train.trainNumber.toLowerCase().includes(q) ||
			train.departureCity.toLowerCase().includes(q) ||
			train.arrivalCity.toLowerCase().includes(q)
		);
	});

	return (
		<div className="train-list-container">
			<div className="search-bar">
				<input
					className="search-input"
					type="text"
					value={query}
					onChange={(event) => setQuery(event.target.value)}
					placeholder="Пошук за номером або містом"
				/>
			</div>

			{filteredTrains.length === 0 ? (
				<p className="no-results">Нічого не знайдено.</p>
			) : (
				filteredTrains.map((train) => (
					<TrainCard key={train.id} train={train} />
				))
			)}
		</div>
	);
};

export default TrainList;
