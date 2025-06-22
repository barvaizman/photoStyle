import { useEffect, useState } from 'react'
import { client } from '../lib/sanity/client'

export default function SanityTest() {
  const [status, setStatus] = useState('loading')
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const testConnection = async () => {
      try {
        setStatus('loading')
        
        // בדיקת חיבור בסיסית
        const result = await client.fetch(`*[_type == "eventPackage"][0...1]{
          _id,
          title
        }`)
        
        console.log('Sanity connection test result:', result)
        
        if (result && result.length > 0) {
          setStatus('success')
          setData(result)
        } else {
          setStatus('no-data')
          setData([])
        }
      } catch (err) {
        console.error('Sanity connection error:', err)
        setStatus('error')
        setError(err.message)
      }
    }

    testConnection()
  }, [])

  if (status === 'loading') {
    return (
      <div className="fixed top-4 right-4 bg-blue-500 text-white p-2 rounded z-50">
        בדיקת חיבור ל-Sanity...
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="fixed top-4 right-4 bg-red-500 text-white p-2 rounded z-50">
        שגיאה בחיבור ל-Sanity: {error}
      </div>
    )
  }

  if (status === 'no-data') {
    return (
      <div className="fixed top-4 right-4 bg-yellow-500 text-white p-2 rounded z-50">
        חיבור ל-Sanity תקין - אין נתונים
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="fixed top-4 right-4 bg-green-500 text-white p-2 rounded z-50">
        חיבור ל-Sanity תקין! נמצאו {data.length} פריטים
      </div>
    )
  }

  return null
} 