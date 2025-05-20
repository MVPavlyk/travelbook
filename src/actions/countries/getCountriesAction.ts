'use server';

import { TCountry } from '@/lib/types/county';

export async function getCountriesAction(): Promise<TCountry[] | null> {
  try {
    const API_KEY = process.env.CSC_API_KEY;

    if (!API_KEY) {
      console.error('Missing CSC_API_KEY in environment variables');
      return null;
    }

    const response = await fetch(
      'https://api.countrystatecity.in/v1/countries',
      {
        method: 'GET',
        headers: {
          'X-CSCAPI-KEY': API_KEY,
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      console.error(`Failed to fetch countries: ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching countries:', error);
    return null;
  }
}
