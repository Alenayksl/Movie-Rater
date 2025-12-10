import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'

const sortOptions = [
{ name: 'Popularity: High to Low', value: 'popularity.desc' },
  { name: 'Popularity: Low to High', value: 'popularity.asc' },
  { name: 'Title: A to Z', value: 'title.asc' },
  { name: 'Title: Z to A', value: 'title.desc' },
  { name: 'Release Date: Newest First', value: 'primary_release_date.desc' },
  { name: 'Release Date: Oldest First', value: 'primary_release_date.asc' },
  { name: 'Rating: High to Low', value: 'vote_average.desc' },
  { name: 'Rating: Low to High', value: 'vote_average.asc' },
]

const genres = [
     { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
]

const platforms = [
    { id: 8, name: 'Netflix' },
  { id: 337, name: 'Disney+' },
  { id: 119, name: 'Amazon Prime Video' },
  { id: 350, name: 'Apple TV+' },
  { id: 1899, name: 'Max' },
  { id: 531, name: 'Paramount+' },
  { id: 2, name: 'Apple iTunes' },
  { id: 3, name: 'Google Play Movies' },
]

const countries = [
    { code: 'US', name: 'United States' },
  { code: 'TR', name: 'Turkey' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' },
]

const languages = [
     { code: 'en', name: 'English' },
  { code: 'tr', name: 'Turkish' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'pt', name: 'Portuguese' },
]

const years = [
    { value : '2024', name: '2024' },
    { value : '2023', name: '2023' },
    { value : '2022', name: '2022' },
    { value : '2021', name: '2021' },
    { value : '2020', name: '2020' },
]

//cok zor imdat uykum geliyor yardim edin lutfennn
export default function Filter() {
  return (
    <div>Filter Component</div>
  )
}