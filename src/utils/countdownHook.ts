import { useState, useEffect } from 'react';

export const useCountdown = (initialTime: number) => {
	const [remaining, setRemaining] = useState("");

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date().getTime();
			const distance = initialTime - now;

			const days = Math.floor(distance / (1000 * 60 * 60 * 24));
			const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);
			
			setRemaining(`${days} : ${hours} : ${minutes} : ${seconds}`)
		}, 1000);

		return () => clearInterval(interval);
	}, [initialTime]);

	return remaining;
};