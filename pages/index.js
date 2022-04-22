import { useState } from 'react';
import CountriesTable from '../components/CountriesTable/CountriesTable';
import Layout from '../components/Layout/Layout';
import SearchInput from '../components/SearchInput/SearchInput';
import styles from '../styles/Home.module.css';

export default function Home({ countries }) {
	const [keyword, setKeyword] = useState('');

	const filteredCountries = countries.filter((country) => {
		if (country.name.toLowerCase().includes(keyword)) return country;
		if (country.region.toLowerCase().includes(keyword))
			return country;
		if (country.subregion.toLowerCase().includes(keyword))
			return country;
	});

	const onInputChange = (e) => {
		e.preventDefault();
		setKeyword(e.target.value.toLowerCase());
	};

	return (
		<Layout>
			<div className={styles.inputContainer}>
				<div className={styles.counts}>
					Found {countries.length} countries
				</div>

				<div className={styles.input}>
					<SearchInput
						placeholder='Filter by Name, Region or SubRegion'
						onChange={onInputChange}
					/>
				</div>
			</div>

			<CountriesTable countries={filteredCountries} />
		</Layout>
	);
}

export const getServerSideProps = async () => {
	const res = await fetch('https://restcountries.com/v2/all');
	const countries = await res.json();
	if (!countries.length) {
		console.log('Not Working');
	}
	return {
		props: {
			countries,
		},
	};
};
