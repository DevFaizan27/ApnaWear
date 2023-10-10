import React from 'react'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
  <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <rect width="100%" height="100%" fill="#FF5733" />
  <text x="50%" y="50%" font-size="36" text-anchor="middle" fill="#FFFFFF">404 - Page Not Found</text>
</svg>

    <h1 className="text-2xl md:text-4xl font-semibold mb-4">
      404 - Page Not Found
    </h1>
    <p className="text-lg md:text-xl text-center">
      Oops! The Could Not Fetch The Items
    </p>
  </div>
  )
}

export default NotFound