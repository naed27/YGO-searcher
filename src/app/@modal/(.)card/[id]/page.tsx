import CardView from "@/components/pages/card/CardView"

interface Props {
  params: {
    id: string
  }
}

const page = ({params: {id}}: Props) => {
  return (
    <CardView inModal={true} cardId={id}/>
  )
}

export default page