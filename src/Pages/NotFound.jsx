import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <>
    <div className="flex pt-20 md:pt-1 md:items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold font-sans text-gray-600">404</h1>
        <p className="mt-4 text-xl text-gray-500">Oops! Page not found.</p>
        <Link to="/" className="mt-6 inline-block rounded-full px-4 py-2 text-white bg-gradient-to-tr from-blue-900 to-blue-600 hover:bg-gradient-to-tr hover:from-blue-600 hover:to-blue-900 ">
          Go to Homepage
        </Link>
      </div>
    </div>
    </>
  )
}

export default NotFound