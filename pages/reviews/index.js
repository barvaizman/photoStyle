import Head from 'next/head'
import { client } from '../../lib/sanity/client'

export default function Reviews({ reviews }) {
  return (
    <>
      <Head>
        <title>חוות דעת - PhotoStyle</title>
        <meta name="description" content="חוות דעת של לקוחות מרוצים מאירועים קודמים עם PhotoStyle" />
      </Head>
      <main className="p-4 space-y-6">
        <h1 className="text-2xl md:text-4xl font-bold text-center">מה הלקוחות שלנו אומרים</h1>
        <div className="space-y-4 max-w-2xl mx-auto">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white rounded shadow p-4">
              <p className="text-gray-800 mb-2">"{review.comment}"</p>
              <p className="text-sm text-gray-500 text-left">- {review.name}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const query = '*[_type == "review"]{_id, name, comment}'
  const reviews = await client.fetch(query)
  return {
    props: {
      reviews
    },
    revalidate: 60
  }
}