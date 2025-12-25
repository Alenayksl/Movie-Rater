import { useEffect, useState } from 'react'
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
import { on } from 'events'

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


const filters = [
  {
    id: 'genre',
    name: 'Genre',
    options: [
      { value: '28', label: 'Action', checked: false },
      { value: '12', label: 'Adventure', checked: false },
      { value: '16', label: 'Animation', checked: false },
      { value: '35', label: 'Comedy', checked: false },
      { value: '80', label: 'Crime', checked: false },
      { value: '99', label: 'Documentary', checked: false },
      { value: '18', label: 'Drama', checked: false },
      { value: '10751', label: 'Family', checked: false },
      { value: '14', label: 'Fantasy', checked: false },
      { value: '36', label: 'History', checked: false },
      { value: '27', label: 'Horror', checked: false },
      { value: '10402', label: 'Music', checked: false },
      { value: '9648', label: 'Mystery', checked: false },
      { value: '10749', label: 'Romance', checked: false },
      { value: '878', label: 'Science Fiction', checked: false },
      { value: '10770', label: 'TV Movie', checked: false },
      { value: '53', label: 'Thriller', checked: false },
      { value: '10752', label: 'War', checked: false },
      { value: '37', label: 'Western', checked: false },
    ],
  },
  {
    id: 'platform',
    name: 'Streaming Platform',
    options: [
      { value: '8', label: 'Netflix', checked: false },
      { value: '337', label: 'Disney+', checked: false },
      { value: '119', label: 'Amazon Prime Video', checked: false },
      { value: '350', label: 'Apple TV+', checked: false },
      { value: '1899', label: 'Max', checked: false },
      { value: '531', label: 'Paramount+', checked: false },
    ],
  },
  {
    id: 'country',
    name: 'Country',
    options: [
      { value: 'US', label: 'United States', checked: false },
      { value: 'TR', label: 'Turkey', checked: false },
      { value: 'GB', label: 'United Kingdom', checked: false },
      { value: 'CA', label: 'Canada', checked: false },
      { value: 'FR', label: 'France', checked: false },
      { value: 'DE', label: 'Germany', checked: false },
      { value: 'IT', label: 'Italy', checked: false },
      { value: 'ES', label: 'Spain', checked: false },
      { value: 'JP', label: 'Japan', checked: false },
      { value: 'KR', label: 'South Korea', checked: false },
    ]
  },
  {
    id: 'language',
    name: 'Language',
    options: [
      { value: 'en', label: 'English', checked: false },
      { value: 'tr', label: 'Turkish', checked: false },
      { value: 'es', label: 'Spanish', checked: false },
      { value: 'fr', label: 'French', checked: false },
      { value: 'de', label: 'German', checked: false },
      { value: 'it', label: 'Italian', checked: false },
      { value: 'ja', label: 'Japanese', checked: false },
      { value: 'ko', label: 'Korean', checked: false },
    ]
  },
  {
    id: 'Year',
    name: 'Year',
    options: [
      { value: '2024', label: '2024', checked: false },
      { value: '2023', label: '2023', checked: false },
      { value: '2022', label: '2022', checked: false },
      { value: '2021', label: '2021', checked: false },
      { value: '2020', label: '2020', checked: false },
    ]
  }
]

interface MoviesFilterProps {
  title: string;
  children: React.ReactNode;
  selectedGenres: number[];
  selectedPlatforms: number[];
  selectedCountry: string | null;
  selectedLanguage: string | null;
  selectedYear: number | null;
  sortBy: string;
  onGenreChange: (genreId: number, checked: boolean) => void;
  onPlatformChange: (platformId: number, checked: boolean) => void;
  onCountryChange: (countryCode: string | null) => void;
  onLanguageChange: (languageCode: string | null) => void;
  onYearChange: (year: number | null) => void;
  onSortChange: (sortBy: string) => void;
}

export default function Filter({
  title,
  children,
  selectedGenres,
  selectedPlatforms,
  selectedCountry,
  selectedLanguage,
  selectedYear,
  sortBy,
  onGenreChange,
  onPlatformChange,
  onCountryChange,
  onLanguageChange,
  onYearChange,
  onSortChange,
}: MoviesFilterProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  
  return (
    <div className="bg-gray-950 text-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-gray-900 pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-white">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-gray-900 p-2 text-gray-400 hover:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-700">

                {filters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-t border-gray-700 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-gray-900 px-2 py-3 text-gray-400 hover:text-white">
                        <span className="font-medium text-white">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                          <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  type="checkbox"
                                  checked={
                                    section.id === 'genre'
                                      ? selectedGenres.includes(parseInt(option.value))
                                      : section.id === 'platform'
                                      ? selectedPlatforms.includes(parseInt(option.value))
                                      : section.id === 'country'
                                      ? selectedCountry === option.value
                                      : section.id === 'language'
                                      ? selectedLanguage === option.value
                                      : section.id === 'Year'
                                      ? selectedYear === parseInt(option.value)
                                      : false
                                  }
                                  onChange={(e) => {
                                    const checked = e.target.checked;
                                    if (section.id === 'genre') {
                                      onGenreChange(parseInt(option.value), checked);
                                    } else if (section.id === 'platform') {
                                      onPlatformChange(parseInt(option.value), checked);
                                    } else if (section.id === 'country') {
                                      onCountryChange(checked ? option.value : null);
                                    } else if (section.id === 'language') {
                                      onLanguageChange(checked ? option.value : null);
                                    } else if (section.id === 'Year') {
                                      onYearChange(checked ? parseInt(option.value) : null);
                                    }
                                  }}
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-600 bg-gray-800 checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-600 disabled:bg-gray-700 disabled:checked:bg-gray-700 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-400"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="min-w-0 flex-1 text-gray-300"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-700 pt-24 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-white">{title}</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-300 hover:text-white">
                  Sort
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-300"
                  />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-gray-800 shadow-2xl ring-1 ring-gray-700 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.value}>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            onSortChange(option.value);
                          }}
                          className={`block px-4 py-2 text-sm data-focus:bg-gray-700 data-focus:outline-hidden ${
                            sortBy === option.value ? 'text-indigo-400 bg-gray-700' : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-300 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                {filters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-b border-gray-700 py-6">
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-transparent py-3 text-sm text-gray-400 hover:text-white">
                        <span className="font-medium text-white">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                          <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  type="checkbox"
                                  checked={
                                    section.id === 'genre'
                                      ? selectedGenres.includes(parseInt(option.value))
                                      : section.id === 'platform'
                                      ? selectedPlatforms.includes(parseInt(option.value))
                                      : section.id === 'country'
                                      ? selectedCountry === option.value
                                      : section.id === 'language'
                                      ? selectedLanguage === option.value
                                      : section.id === 'Year'
                                      ? selectedYear === parseInt(option.value)
                                      : false
                                  }
                                  onChange={(e) => {
                                    const checked = e.target.checked;
                                    if (section.id === 'genre') {
                                      onGenreChange(parseInt(option.value), checked);
                                    } else if (section.id === 'platform') {
                                      onPlatformChange(parseInt(option.value), checked);
                                    } else if (section.id === 'country') {
                                      onCountryChange(checked ? option.value : null);
                                    } else if (section.id === 'language') {
                                      onLanguageChange(checked ? option.value : null);
                                    } else if (section.id === 'Year') {
                                      onYearChange(checked ? parseInt(option.value) : null);
                                    }
                                  }}
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-600 bg-gray-800 checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-600 disabled:bg-gray-700 disabled:checked:bg-gray-700 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-400"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label htmlFor={`filter-${section.id}-${optionIdx}`} className="text-sm text-gray-300">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">{children}</div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}