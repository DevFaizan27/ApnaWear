import React from 'react'

const Unautherisezed = () => {
  return (
    <div class="bg-gray-900 text-white min-h-screen flex items-center justify-center">

    <div class="max-w-lg p-8 bg-gray-800 rounded-lg shadow-lg text-center">
        <h1 class="text-3xl font-semibold mb-4">Unauthorized Access</h1>
        <p class="text-gray-400 mb-4">You do not have permission to access this page.</p>
        <button class="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-full text-white transition-colors duration-300">
            <a href="/" class="text-white">Go to Home</a>
        </button>
    </div>

</div>
  )
}

export default Unautherisezed