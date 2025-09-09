import { MovingBorderButton } from '@/app/components/ui/moving-border'

interface Props {
  message: string
}
export default function AnnounceComponent({ message }: Props) {

  return (
      <MovingBorderButton duration={5000} containerClassName={"h-[40px]"}>
          <h1 className="text-black dark:text-white md:text-base text-sm">{message}</h1>
      </MovingBorderButton>
  )
}