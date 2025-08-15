import React from 'react'

const page = () => {
      // In a Next.js component or API route
      async function fetchData() {
        const response = await fetch('http://localhost:8000/api/hello'); // Replace with your FastAPI URL
        const data = await response.json();
        console.log(data);
    }
  return (
    <div >
    </div>
  )
}

export default page
