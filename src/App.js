import React from 'react'
import JobCard from '../src/components/JobCard'
import Filter from './components/Filter'

const App = () => {
  return (
    <div>
    <h1 className='text-center text-2xl my-6'>Search Jobs</h1>
    <Filter />
    <JobCard />
    </div>
  )
}

export default App

