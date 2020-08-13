import { NextPage, GetServerSideProps } from 'next'

type Event = {
  name: string
  date: string
  description: string
}

interface HomeProps {
  events: Event[]
}

const Home: NextPage<HomeProps> = ({ events }) => {
  return (
    <>
      <h1>Events from server</h1>
      {JSON.stringify(events)}
    </>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (_ctx) => {
  const data = await fetch('http://localhost:3000/api/events')
  const events: Event[] = await data.json()
  return { props: { events } }
}

export default Home
